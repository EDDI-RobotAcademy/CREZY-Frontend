<template>
    <div class="inquiry-modify-card">
        <v-form @submitInquiryModify.prevent="onSubmit" ref="form">
            <div class="inquiry-modify-card-title">
                문의 수정
            </div>
            <v-row>
                <div class="iquiry-modify-container">
                    <span v-if="!isChangeInquiryTitle" class="inquiry-origin-title" @click="editInquiryTitle">
                        제목:
                        <span>{{ selectedInquiry.inquiryTitle }}</span>
                    </span>
                    <span v-else class="inquiry-modify-title">
                        제목: <span><input ref="inquiryTitleInput" v-model="newInquiryTitle" type="text" /></span>
                    </span>
                    <br>
                    <div v-if="!isChangeInquiryContent" class="inquiry-origin-content" @click="editInquiryContent">
                        내용: <span>{{ selectedInquiry.inquiryContent }}</span>
                    </div>
                    <div v-else class="inquiry-modify-content">
                        내용: <v-textarea rows="10" cols="57" variant="outlined" type="text" ref="inquiryContentInput"
                            v-model="newInquiryContent"
                            style="margin-left: 10px; position: relative; display: flex; color: white; border-color: rgba(255, 255, 255, 0.642);" />
                    </div>
                    <div class="inquiry-image-modify-container">
                        <div class="inquiry-modify-image-list">
                            <v-img class="inquiry-modify-image"
                                v-for="(inquiryImageName, idx) in selectedInquiry.inquiryImageNames" :key="idx"
                                :src="getInquiryImages(inquiryImageName)" style="width: 100px; height: 100px;">
                                <div class="image-delete-button" @click="deleteImage(idx)">x</div>
                            </v-img>
                            <v-img class="inquiry-modify-image" v-if="newInquiryImageNames.length > 0"
                                v-for="(newImage, idx) in newInquiryImageNames" :key="idx" :src="newImage.previewURL"
                                style="width: 100px; height: 100px;">
                                <div class="image-delete-button" @click="deleteNewImage(idx)">x</div>
                            </v-img>
                        </div>
                        <label v-if="newInquiryImageNames && newInquiryImageNames.length +
                            selectedInquiry.inquiryImageNames && selectedInquiry.inquiryImageNames.length < 3"
                            class="inquiry-modify-upload-image" for="file-selector">
                            <v-icon>mdi-camera</v-icon>
                            <span>사진 첨부</span>
                            <input type="file" id="file-selector" ref="file" style="display: none"
                                @change="handleFileUpload" multiple />
                        </label>
                    </div>
                </div>
            </v-row>
        </v-form>
        <v-btn size="small" rounded @click="submitInquiryModify()"
            style="color: black; margin-top: 20px; margin-right:60px; margin-bottom: -30px;">저장</v-btn>
    </div>
</template>
<script>
export default {
    data() {
        return {
            awsBucketName: process.env.VUE_APP_AWS_BUCKET_NAME,
            awsBucketRegion: process.env.VUE_APP_AWS_BUCKET_REGION,
            awsIdentityPoolId: process.env.VUE_APP_AWS_IDENTITY_POOLID,

            isChangeInquiryTitle: false,
            isChangeInquiryContent: false,

            files: [],
            s3: null,

            newInquiryTitle: '',
            newInquiryContent: '',
            newInquiryImageNames: [],
            deletedFileNameList: [],
        }
    },
    props: {
        selectedInquiry: {
            type: Object,
            required: true,
        },
    },
    methods: {
        async submitInquiryModify() {
            const { newInquiryTitle, newInquiryContent } = this;

            const allImages = [
                ...(this.selectedInquiry.inquiryImageNames || []),
                ...(this.newInquiryImageNames.map(image => image.file.name) || []),
            ];

            const payload = {
                inquiryId: this.selectedInquiry.inquiryId,
                inquiryTitle: newInquiryTitle || this.selectedInquiry.inquiryTitle,
                inquiryContent: newInquiryContent || this.selectedInquiry.inquiryContent,
                inquiryImageNames: allImages,
            };

            // if (this.deletedFileNameList.length > 0) {
            //     await this.deleteImages()
            // }
            if (this.files.length > 0) {
                await this.uploadAwsS3()
            }

            this.$emit("submitInquiryModify", payload);

        },
        getInquiryImages(inquiryImageName) {

            return `https://${this.awsBucketName}.s3.${this.awsBucketRegion}.amazonaws.com/${inquiryImageName}`
        },
        editInquiryTitle() {
            this.isChangeInquiryTitle = true
            this.newInquiryTitle = this.selectedInquiry.inquiryTitle
            this.$nextTick(() => {
                this.$refs.inquiryTitleInput.focus();
            });
        },
        editInquiryContent() {
            this.isChangeInquiryContent = true
            this.newInquiryContent = this.selectedInquiry.inquiryContent
            this.$nextTick(() => {
                this.$refs.inquiryContentInput.focus();
            });
        },
        deleteImage(index) {
            this.deletedFileNameList.push(this.selectedInquiry.inquiryImageNames[index])
            this.selectedInquiry.inquiryImageNames.splice(index, 1)
            this.files.splice(index, 1);
        },
        deleteNewImage(idx) {
            this.newInquiryImageNames.splice(idx, 1);
            this.files.splice(idx, 1);
        },
        handleFileUpload(event) {
            const files = event.target.files;

            for (let i = 0; i < files.length; i++) {
                const file = files[i];

                if (file.type.startsWith('image/')) {
                    this.newInquiryImageNames.push({
                        file: file,
                        previewURL: URL.createObjectURL(file),
                    });
                    this.files.push(file);
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
        async uploadAwsS3() {
            this.awsS3Config();

            for (let i = 0; i < this.newInquiryImageNames.length; i++) {
                const file = this.newInquiryImageNames[i].file;
                const fileName = file.name;

                try {
                    await this.s3.upload({
                        Key: fileName,
                        Body: file,
                        ACL: 'public-read',
                    }).promise();
                } catch (err) {
                    console.error(err);
                    alert('업로드 중 문제 발생 (사진 파일에 문제가 있음): ' + err.message);
                }
            }
        },

        async deleteImages() {
            this.awsS3Config();

            for (let i = 0; i < this.deletedFileNameList.length; i++) {
                const fileName = this.deletedFileNameList[i];

                await this.s3.deleteObject({
                    Key: fileName
                }, (err, data) => {
                    if (err) {
                        return alert('문제 발생' + err.message)
                    }
                })
            }
        }

    },
}
</script>
<style>
.inquiry-modify-card {
    padding: 40px;
}

.inquiry-modify-card-title {
    float: left;
    font-weight: bold;
    margin-left: -10px;
    margin-top: 2px;
}

.iquiry-modify-container {
    margin-top: 20px;
    float: left;
    margin-left: -90px;
    padding: 30px;
}

.inquiry-image-modify-container {
    position: relative;
    display: flex;
    margin-top: 30px;
    overflow: hidden;
}

.inquiry-modify-image-list {
    position: relative;
    display: flex;
    flex-direction: row;
    float: left;
}

.inquiry-modify-image {
    margin-right: 20px;
    border: 1px solid white;
}

.inquiry-modify-image img {
    width: 100%;
    height: 100%;
    object-fit: fill;
}

.inquiry-modify-delete-button {
    color: rgb(152, 150, 150);
    font-size: 13px;
    display: flex;
}

.image-delete-button {
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
    color: black;
}

.inquiry-origin-title,
.inquiry-modify-title,
.inquiry-origin-content,
.inquiry-modify-content {
    position: relative;
    display: flex;
}

.inquiry-origin-title span {
    text-align: left;
    margin-left: 10px;
    border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 0.642);
    padding: 5px;
    width: 505px;
}

.inquiry-modify-title span {
    padding: 5px;
    border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 0.642);
    margin-left: 10px;
}

.inquiry-modify-title span input {
    color: white;
    width: 493px;
    outline: none;
}

.inquiry-origin-content span {
    text-align: left;
    margin-left: 10px;
    border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 0.642);
    padding: 5px;
    width: 505px;
    height: 270px;
    position: relative;
}

.inquiry-modify-upload-image {
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
</style>