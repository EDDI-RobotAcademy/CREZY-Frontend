<template>
    <div class="inquiry-read-card">
        <div v-if="!isInquiryModify" style="padding:10px;">
            <div class="inquiry-read-title">
                문의 내용
            </div>
            <v-row>
                <div class="iquiry-read-container">
                    <span style="position: relative; display: flex;">
                        {{ selectedInquiry.inquiryTitle }}
                    </span>
                    <br>
                    <span style="position: relative; display: flex; text-align: left; white-space: pre-line;">
                        {{ selectedInquiry.inquiryContent }}
                    </span>
                    <div class="inquiry-image-container">
                        <div class="inquiry-image-list">
                            <v-img class="inquiry-preview-container"
                                v-for="(inquiryImageName, idx) in selectedInquiry.inquiryImageNames" :key="idx"
                                :src="getInquiryImages(inquiryImageName)" style="width: 100px; height: 100px;"></v-img>
                        </div>
                    </div>
                    <div class="inquiry-modify-delete-button" v-if="selectedInquiry.inquiryAnswer == null"
                        :style="selectedInquiry.inquiryImageNames && selectedInquiry.inquiryImageNames.length > 0 ? 'margin-top:30px;' : 'margin-top:0px;'">
                        <button @click="modifyInquiryButton" style="margin-right: 20px;">수정</button>
                        <span>│</span>
                        <button @click="deleteInquiryButton" style="margin-left: 20px;">삭제</button>
                    </div>
                    <div class="inquiry-modify-delete-button" v-else
                        :style="selectedInquiry.inquiryImageNames && selectedInquiry.inquiryImageNames.length > 0 ? 'margin-top:30px;' : 'margin-top:0px;'">
                        <button @click="deleteInquiryButton">삭제</button>
                    </div>
                </div>
            </v-row>

            <div v-if="selectedInquiry.inquiryAnswer && selectedInquiry.inquiryAnswer.inquiryAnswer
                && selectedInquiry.inquiryAnswer.createInquiryAnswerDate != null">
                <v-divider style="margin-top: 20px;"></v-divider>
                <div class="inquiry-read-title" style="margin-top:20px;">
                    문의 답변
                </div>
                <v-row style="margin-bottom: 10px;">
                    <div class="iquiry-answer-container">
                        <span
                            style="position: relative; display: flex; text-align: left; white-space: pre-line; margin-top: 20px;">
                            {{ selectedInquiry.inquiryAnswer.inquiryAnswer }} </span>
                        <span style="position: relative; display: flex; font-size: 12px; color: gray; margin-top: 30px; ">
                            {{ selectedInquiry.inquiryAnswer.createInquiryAnswerDate }} </span>
                    </div>
                </v-row>
            </div>
        </div>

        <div v-else>
            <InquiryModifyForm @submitInquiryModify="submitInquiryModify" :selectedInquiry="selectedInquiry" />
            <v-btn size="small" rounded @click="cancelInquiryModify()" style="color: black; bottom:40px; left:30px;">취소
            </v-btn>
        </div>
    </div>
</template>

<script>
import InquiryModifyForm from "@/components/inquiry/InquiryModifyForm.vue";
import { mapActions } from "vuex";

const inquiryModule = "inquiryModule";

export default {
    data() {
        return {
            awsBucketName: process.env.VUE_APP_AWS_BUCKET_NAME,
            awsBucketRegion: process.env.VUE_APP_AWS_BUCKET_REGION,
            awsIdentityPoolId: process.env.VUE_APP_AWS_IDENTITY_POOLID,

            isInquiryModify: false,
        }
    },
    components: {
        InquiryModifyForm,
    },
    props: {
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
        ...mapActions(inquiryModule, ["requestInquiryModifyToSpring", "requestInquiryDeleteToSpring"]),

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
        modifyInquiryButton() {
            this.isInquiryModify = true
        },
        async submitInquiryModify(payload) {
            await this.requestInquiryModifyToSpring(payload)
            this.isInquiryModify = false
        },
        cancelInquiryModify() {
            this.isInquiryModify = false
        },
        async deleteInquiryButton() {
            if (confirm("정말로 삭제하시겠습니까?")) {
                const isDeleted = await this.requestInquiryDeleteToSpring(this.selectedInquiry.inquiryId);
                if (isDeleted) {
                    this.$emit("inquiryDeleted", true);
                }
            }
        }
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

.iquiry-answer-container {
    margin-top: 90px;
    margin-left: -90px;
    padding: 20px;
    width: 745px;
    background-color: rgba(128, 128, 128, 0.295);
    border-radius: 10px;
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
    border: 1px solid white;
}

.inquiry-preview-container img {
    width: 100%;
    height: 100%;
    object-fit: fill;
}

.inquiry-modify-delete-button {
    color: rgb(152, 150, 150);
    font-size: 13px;
    display: flex;
}
</style>