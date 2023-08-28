<template>
    <div>
        <v-form @submit.prevent="onSubmit" ref="form">
            <v-text-field id="playlist-title" type="text" v-model="playlistName" placeholder="제목을 입력하세요"
                class="input-field"></v-text-field>
            <div class="popup">
                <div v-if="!file" class="image-box">
                    <div>
                        <!-- 이미지 하나만 등록할 수 있도록 해두었어요 -->
                        <label class="custom-file-upload" for="file-selector">사진 등록</label>
                        <input type="file" id="file-selector" ref="file" style="display: none" @change="handleFileUpload" />
                    </div>
                </div>
                <div v-else>
                    <div>
                        <div class="image-container">
                            <img :src="imagePreview" class="preview-image" />
                            <div class="file-close-button" @click="deleteImage">x</div>
                        </div>
                    </div>
                </div>
            </div>
            <v-btn @click="onSubmit" rounded class="add-button">생성</v-btn>
        </v-form>
    </div>
</template>

<script>
import AWS from 'aws-sdk'
// import env from '@/env'

export default {
    data() {
        return {
            playlistName: '',
            imageUrls: [],

            imagePreview: null,
            file: null,
            s3fileList: [],

            // aws 설정 후 추가
            awsBucketName: '',
            awsBucketRegion: '',
            awsIdentityPoolId: '',
            s3: null,
        }
    },

    methods: {
        handleFileUpload() {
            const file = this.$refs.file.files[0];

            if (file) {
                this.file = file;
                const reader = new FileReader();

                reader.onload = (e) => {
                    this.imagePreview = e.target.result;
                };

                reader.readAsDataURL(file);
            }
        },

        async onSubmit() {
            if (!this.playlistName) {
                alert('제목을 입력해주세요!');
                return;
            }

            await this.uploadAwsS3()

            // const { playlistName } = this;

            // this.$emit("submit", { playlistName });
            // 추후 수정 필요
            await this.$router.push({ name: 'PlaylistManagePage' });
        },

        awsS3Config() {
            AWS.config.update({
                region: this.awsBucketRegion,
                credentials: new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: this.awsIdentityPoolId
                })
            });

            this.s3 = new AWS.S3({
                apiVersion: '2006-03-01',
                params: {
                    Bucket: this.awsBucketName
                }
            });
        },

        uploadAwsS3() {
            this.awsS3Config()

            if (!Array.isArray(this.file)) {
                this.file = [this.file];
            }

            for (let idx = 0; idx < this.file.length; idx++) {
                const file = this.file[idx];

                this.s3.upload({
                    Key: file.name,
                    Body: file,
                    ACL: 'public-read'
                }, (err, data) => {
                    if (err) {
                        console.log(err)
                        return alert('업로드 중 문제 발생 (사진 파일에 문제가 있음)', err.message)
                    }
                })
            }
        },

        deleteImage() {
            this.imagePreview = null;
            this.file = null;
            this.s3fileList = [];
            this.imageUrls = [];
        },
    },
}
</script>
<style>
.popup {
    position: relative;
}

.input-field {
    color: white;
    height: 75px;
    margin-top: 10px;
}

.file-close-button {
    position: absolute;
    top: 0;
    right: 0;
    padding: 4px 8px;
    cursor: pointer;
    z-index: 1;
    display: flex;
    border-top-left-radius: 0;
    border-bottom-right-radius: 5px;
}

.image-container {
    position: relative;
    display: inline-block;
}

.preview-image {
    max-width: 200px;
    max-height: 200px;
    margin-bottom: 10px;
}

.custom-file-upload {
    display: inline-block;
    padding: 9px 13px;
    cursor: pointer;
    font-weight: bold;
    background-color: white;
    font-size: 15px;
}

.image-box {
    margin-top: 20px;
}

.add-button {
    position: absolute;
    margin-top: 20px;
    margin-left: 210px;
}
</style>