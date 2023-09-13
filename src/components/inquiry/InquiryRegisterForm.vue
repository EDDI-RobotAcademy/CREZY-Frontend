<template>
    <v-form @inquirySubmit.prevent="onInquirySubmit" ref="form">

        <div class="inquiry-reigister-table">
            <div class="inquiry-register-select">
                <v-text-field label="문의 유형을 선택하세요" variant="outlined" append-inner-icon="mdi-menu-down-outline"
                    @click="chooseInquiryCategory = !chooseInquiryCategory" readonly
                    @click:append-inner="chooseInquiryCategory = !chooseInquiryCategory"
                    v-model="inquiryType"></v-text-field>
                <v-menu v-model="chooseInquiryCategory">
                    <template v-slot:activator="{ on }">
                        <v-list class="inquiry-category-selection-field" v-if="chooseInquiryCategory">
                            <v-list-item class="inquiry-category-selection" v-for="inquiryCategory in inquiryCategories"
                                @click="selectCategory(inquiryCategory)">
                                <v-list-item-title style="font-size: 15px">{{ inquiryCategory
                                }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </template>
                </v-menu>
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
                    <input type="file" id="file-selector" ref="file" style="display: none" @change="handleFileUpload"
                        multiple />
                </label>
                <div class="preview-image-container">
                    <div class="image-list">
                        <div v-for="(image, index) in imagePreviews" :key="index" class="preview-container">
                            <div class="image-wrapper">
                                <img :src="image" class="preview-image" />
                                <div class="preview-close-button" @click="deleteImage(index)">x</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="image-rules">
            - 사진 용량은 사진 한 장당 최대 10MB 까지 등록이 가능합니다.<br>
            - 사진은 최대 3장까지 등록이 가능합니다.
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
            inquiryType: '',
            inquiryTitle: '',
            inquiryContent: '',
            inquiryImageNames: [],

            imagePreviews: [],
            files: [],
            maxImageCount: 3,

            awsBucketName: process.env.VUE_APP_AWS_BUCKET_NAME,
            awsBucketRegion: process.env.VUE_APP_AWS_BUCKET_REGION,
            awsIdentityPoolId: process.env.VUE_APP_AWS_IDENTITY_POOLID,
            s3: null,

            chooseInquiryCategory: false,
            inquiryCategories: ["재생목록 문의", "계정 문의", "노래 문의", "서비스 이용 문의"],
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
                        this.files.push(file.name);
                    };

                    reader.readAsDataURL(file);
                }
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

        uploadAwsS3(fileName) {
            this.awsS3Config();

            for (let i = 0; i < this.$refs.file.files.length; i++) {
                const file = this.$refs.file.files[i];

                if (file.name === fileName) {
                    this.s3.upload({
                        Key: fileName,
                        Body: file,
                        ACL: 'public-read'
                    }, (err, data) => {
                        if (err) {
                            console.log(err);
                            return alert('업로드 중 문제 발생 (사진 파일에 문제가 있음)', err.message);
                        }
                    });
                    break;
                }
            }
        },

        deleteImage(index) {
            this.imagePreviews.splice(index, 1);
            this.files.splice(index, 1);
            this.inquiryImageName = null;
        },

        async onInquirySubmit() {
            if (!this.inquiryType) {
                alert('문의 유형을 선택해주세요!');
                return;
            }
            if (!this.inquiryContent) {
                alert('내용을 입력해주세요!');
                return;
            }

            const { inquiryTitle, inquiryContent } = this;

            let mappedInquiryType = this.mapToEnglishInquiryType(this.inquiryType);

            this.$emit("inquirySubmit", { inquiryCategoryType: mappedInquiryType, inquiryTitle, inquiryContent, inquiryImageNames: this.files });

            if (this.files.length > 0) {
                for (const fileName of this.files) {
                    this.uploadAwsS3(fileName);
                }
            }
        },

        selectCategory(inquiryType) {
            this.inquiryType = inquiryType
        },

        mapToEnglishInquiryType(koreanType) {
            switch (koreanType) {
                case "계정 문의":
                    return "ACCOUNT";
                case "노래 문의":
                    return "SONG";
                case "서비스 이용 문의":
                    return "SERVICE";
                default:
                    return "PLAYLIST";
            }
        },
    },
}
</script>
<style scoped>
.inquiry-reigister-table {
    margin-top: 40px;
    margin-left: 100px;
    width: 650px;
    height: 650px;
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
    overflow: hidden;
    margin-left: 120px;
    margin-top: -100px;
}

.preview-image {
    width: 98px;
    height: 98px;
}

.image-list {
    display: flex;
    flex-direction: row;
}

.image-wrapper {
    position: relative;
}

.preview-container {
    border: 1px solid white;
    max-width: 100px;
    max-height: 100px;
    margin-right: 20px;
}

.preview-close-button {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
    padding: 2px;
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
}

.image-rules {
    margin-bottom: 100px;
    margin-top: -60px;
    margin-left: 250px;
    text-align: left;
    font-size: 12px;
}

.inquiry-register-button {
    margin-top: -40px;
    margin-bottom: 30px;
}

.inquiry-category-selection-field {
    bottom: 25px;
    align-items: center;
    max-height: 200px;
    overflow-y: hidden;
    border-radius: 3px !important;
    padding: 0;
}

.inquiry-category-selection {
    border-bottom: 1px solid;
}
</style>

