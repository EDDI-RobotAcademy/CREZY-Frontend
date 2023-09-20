<template>
    <div style="margin-top: 15px">
        <v-card class="particular-playlist-card">
            <div style="padding: 10px;">
                <span class="particular-playlist-btn">{{ mapToKoreanInquiryType(inquiry.inquiryCategoryType) }}</span>
                <span style=" margin-left: 10px; font-size: 20px;">{{ inquiry.inquiryTitle }}</span>
                <div style="margin-left: 5px; margin-top:10px; color: rgb(163, 161, 161); font-size: 13px;">
                    <span>{{ inquiry.nickname }}</span>
                    <span style="margin-left:15px;">{{ inquiry.createInquiryDate }}</span>
                </div>
            </div>
            <div style="padding: 10px; margin-top:10px;">
                <span style="white-space: pre-line;">{{ inquiry.inquiryContent }}</span>
            </div>
            <div class="inquiry-image-container">
                <div class="inquiry-image-list">
                    <v-img class="inquiry-preview-container" v-for="(inquiryImageName, idx) in inquiry.inquiryImageNames"
                        :key="idx" :src="getInquiryImages(inquiryImageName)" style="width: 100px; height: 100px;"
                        @click="showImageModal(inquiryImageName)"></v-img>
                </div>
            </div>
        </v-card>

        <v-card class="particular-playlist-card">
            <div style="padding: 10px; font-size: 15px;">
                <div style="margin-bottom: 15px;">{{ inquiry.nickname }}님의 문의에 답변해주세요</div>
                <v-textarea v-model="inquiryAnswer" bg-color="grey-lighten-3" variant="solo-filled" label="답변 작성">
                </v-textarea>
                <v-btn @click="onSubmitInquiryAnswer" color="white" style="font-weight:500;">전송</v-btn>
            </div>
        </v-card>

        <v-card v-if="inquiry.inquiryAnswer && inquiry.inquiryAnswer.inquiryAnswer != null"
            class="particular-playlist-card">
            <div style="padding: 10px;">
                <span class="particular-playlist-btn-2">답변</span>
                <div style="white-space: pre-line; margin-top: 10px;">
                    {{ inquiry.inquiryAnswer.inquiryAnswer }}</div>
            </div>
        </v-card>

        <v-dialog v-model="imageModal" max-width="50%">
            <v-card>
                <v-img style="cursor: pointer;" :src="modalImage" fluid max-width="100%" max-height="100%"
                    @click="closeImageModal"></v-img>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            awsBucketName: process.env.VUE_APP_AWS_BUCKET_NAME,
            awsBucketRegion: process.env.VUE_APP_AWS_BUCKET_REGION,
            awsIdentityPoolId: process.env.VUE_APP_AWS_IDENTITY_POOLID,

            imageModal: false,
            modalImage: '',
            inquiryAnswer: '',
        }
    },
    props: {
        inquiry: {
            type: Object,
            required: true,
        },
    },
    methods: {
        getInquiryImages(inquiryImageName) {

            return `https://${this.awsBucketName}.s3.${this.awsBucketRegion}.amazonaws.com/${inquiryImageName}`
        },
        showImageModal(imageName) {
            this.imageModal = true;
            this.modalImage = this.getInquiryImages(imageName);
        },
        closeImageModal() {
            this.modalImage = '';
            this.imageModal = false;
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
        async onSubmitInquiryAnswer() {
            await this.$emit('submitInquiryAnswer', this.inquiryAnswer)
            this.inquiryAnswer = ''
        }
    },
}
</script>
<style>
.particular-playlist-card {
    background-color: #292E37;
    border-radius: 5px;
    color: white;
    margin: 15px;
    padding: 15px;
}

.particular-playlist-btn {
    border-radius: 5px;
    background-color: #5F6871;
    text-align: center;
    padding: 10px;
}

.particular-playlist-btn-2 {
    border-radius: 5px;
    background-color: #5F6871;
    text-align: center;
    padding: 5px;
}

.inquiry-image-container {
    overflow: hidden;
    padding: 10px;
}

.inquiry-image-list {
    position: relative;
    display: flex;
    flex-direction: row;
    float: left;
}

.inquiry-preview-container {
    margin-right: 20px;
    border: 1px solid white;
    cursor: pointer;
}

.inquiry-preview-container img {
    width: 100%;
    height: 100%;
    object-fit: fill;
}
</style>