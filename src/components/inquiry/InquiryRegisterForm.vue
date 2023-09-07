<template>
    <v-form @inquirySubmit.prevent="onInquirySubmit" ref="form">
        <div class="inquiry-reigister-table">
            <div class="inquiry-register-select">
                <v-select variant="outlined" v-model="inquirySelect" :items="['재생목록', '계정', '노래', 'UI', '서비스']"
                    label="문의유형"></v-select>
            </div>
            <div class="inquiry-register-title">
                <v-text-field variant="outlined" type="text" v-model="inquiryTitle" label="제목을 입력하세요" />
            </div>
            <div class="inquiry-register-content">
                <v-textarea rows="10" variant="outlined" type="text" v-model="inquiryContent" label="내용을 입력하세요" />
            </div>
            <div class="inquiry-register-image">
                <label class="upload-image" for="file-selector">
                    <v-icon>mdi-camera</v-icon>
                    <span>사진 첨부</span>
                    <input type="file" id="file-selector" ref="file" style="display: none" @change="handleFileUpload" />
                </label>
                <div class="preview-image-container">
                    <div v-for="(image, index) in imagePreviews" :key="index" class="preview-container">
                        <img :src="image" class="preview-image" />
                        <div class="preview-close-button" @click="deleteImage(index)">x</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="inquiry-register-button">
            <v-btn @click="onInquirySubmit" rounded style="color: black;">등록</v-btn>
        </div>
    </v-form>
</template>
<script>
export default {
    data() {
        return {
            inquirySelect: '',
            inquiryTitle: '',
            inquiryContent: '',

            imagePreviews: [],
            files: [],
            maxImageCount: 3,

            awsBucketName: process.env.VUE_APP_AWS_BUCKET_NAME,
            awsBucketRegion: process.env.VUE_APP_AWS_BUCKET_REGION,
            awsIdentityPoolId: process.env.VUE_APP_AWS_IDENTITY_POOLID,
            s3: null,
        }
    },

    methods: {
        handleFileUpload() {
            const files = this.$refs.file.files;

            if (files) {
                const remainingSlots = this.maxImageCount - this.imagePreviews.length;

                for (let i = 0; i < Math.min(remainingSlots, files.length); i++) {
                    const file = files[i];
                    const reader = new FileReader();

                    reader.onload = (e) => {
                        this.imagePreviews.push(e.target.result);
                    };

                    reader.readAsDataURL(file);
                }
                this.files = this.files.concat(Array.from(files).slice(0, remainingSlots));
            }
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

            for (let idx = 0; idx < this.files.length; idx++) {
                const file = this.files[idx];

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

        deleteImage(index) {
            this.imagePreviews.splice(index, 1);
            this.files.splice(index, 1);
        },
    },
}
</script>
<style scoped>
.inquiry-reigister-table {
    margin-top: 40px;
    margin-left: 100px;
    width: 650px;
    height: 600px;
    background-color: rgba(201, 201, 201, 0.25);
    border: 1px white solid;
    border-radius: 10px;
    padding: 20 20 20px;
}

.inquiry-register-select {
    width: 600px;
    margin-left: 25px;
    margin-top: 30px;
}

.inquiry-register-content {
    width: 600px;
    margin-left: 25px;
}

.inquiry-register-title {
    width: 600px;
    margin-left: 25px;
}

.inquiry-register-image {
    float: left;
    margin-left: 25px;
}

.upload-image {
    cursor: pointer;
    color: white;
    border: 1px solid white;
    background-color: rgba(201, 201, 201, 0.25);
    padding: 10px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
}

.preview-image-container {
    width: 100px;
    height: 100%;
    overflow: hidden;
    gap: 10px;
    margin-left: 80px;
    margin-top: -100px;
    gap: 10px;
}

.preview-image {
    width: 100px;
    height: 100%;
}

.preview-container {
    border: 1px solid white;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
}

.preview-close-button {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
    background-color: white;
    border-radius: 50%;
    padding: 2px;
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>

