<template>
    <div class="inquiry-read-card">
        <div class="inquiry-read-title">
            문의 내용
        </div>
        <v-row>
            <div class="iquiry-read-container">
                <span style="position: relative; display: flex;">
                    {{ selectedInquiry.inquiryTitle }}
                </span>
                <br>
                <span style="position: relative; display: flex;">
                    {{ selectedInquiry.inquiryContent }}
                </span>
                <div class="inquiry-image-container">
                    <div class="inquiry-image-list">
                        <v-img class="inquiry-preview-container"
                            v-for="(inquiryImageName, idx) in selectedInquiry.inquiryImageNames" :key="idx"
                            :src="getInquiryImages(inquiryImageName)" style="width: 100px; height: 100px;"></v-img>
                    </div>
                </div>
                <div class="inquiry-modify-delete-button"
                    :style="selectedInquiry.inquiryImageNames.length > 0 ? 'margin-top:30px;' : 'margin-top:0px;'">
                    <button style="margin-right: 20px;">수정</button>
                    <span>│</span>
                    <button style="margin-left: 20px;">삭제</button>
                </div>
            </div>
        </v-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            awsBucketName: process.env.VUE_APP_AWS_BUCKET_NAME,
            awsBucketRegion: process.env.VUE_APP_AWS_BUCKET_REGION,
            awsIdentityPoolId: process.env.VUE_APP_AWS_IDENTITY_POOLID,
        }
    },
    props: {
        inquiry: {
            type: Object,
            required: true,
        },
        selectedInquiry: {
            type: Object,
            required: true,
        },
        selectedInquiryId: {
            type: String,
            required: true
        },
    },
    methods: {
        getInquiryImages(inquiryImageName) {

            return `https://${this.awsBucketName}.s3.${this.awsBucketRegion}.amazonaws.com/${inquiryImageName}`
        },

        mapToKoreanInquiryType(englishType) {
            const typeMap = {
                "ACCOUNT": "계정 문의",
                "SONG": "노래 문의",
                "SERVICE": "서비스 이용 문의",
                "PLAYLIST": "재생목록 문의",
            };
            return typeMap[englishType] || englishType;
        },
    },
}
</script>

<style>
.inquiry-read-card {
    padding: 20px;
    background-color: rgba(67, 64, 64, 0.701) !important;
}

.inquiry-read-title {
    padding: 20px;
    float: left;
    font-weight: bold;
}

.iquiry-read-container {
    margin-top: 50px;
    float: left;
    margin-left: -110px;
    padding: 30px;
}

.inquiry-image-container {
    margin-top: 30px;
    overflow: hidden;
}

.inquiry-image-list {
    position: relative;
    display: flex;
    flex-direction: row;
    float: left;
}

.inquiry-preview-container {
    margin-right: 20px;
}

.inquiry-modify-delete-button {
    color: rgb(152, 150, 150);
    font-size: 13px;
    display: flex;
}
</style>