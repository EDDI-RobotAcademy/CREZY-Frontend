<template>
    <v-container>
        <table class="my-custom-table">
            <thead>
                <tr
                    style="border-top: 3px solid  rgba(241, 238, 238, 0.329); border-bottom: 2px solid rgba(241, 238, 238, 0.329);">
                    <th style="width: 20%; color: white; font-size: 17px;">
                        문의유형
                    </th>
                    <th style="width: 50%; color: white; font-size: 17px; ">
                        제목
                    </th>
                    <th style="width: 15%; color: white; font-size: 17px;">
                        등록일
                    </th>
                    <th style="width: 20%; color: white; font-size: 17px;">
                        답변상태
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="!inquiries || (Array.isArray(inquiries) && inquiries.length === 0)">
                    <td colspan="4">최근 6개월 간 문의하신 내역이 없습니다.</td>
                </tr>
                <template v-for="inquiry in sortedInquiries" :key="inquiry.inquiryId + 'row'">
                    <tr>
                        <td>{{ mapToKoreanInquiryType(inquiry.inquiryCategoryType.inquiryCategory) }}</td>
                        <td @click="showInquiryReadForm(inquiry.inquiryId)" style="font-weight: bold; cursor: pointer;">{{
                            inquiry.inquiryTitle }}</td>
                        <td>{{ inquiry.createInquiryDate }}</td>
                        <td :style="answerStyle(inquiry.existAnswer)">
                            {{ answerText(inquiry.existAnswer) }}
                        </td>
                    </tr>
                    <tr v-if="selectedInquiryId === inquiry.inquiryId" :key="inquiry.inquiriesId + 'form'">
                        <td colspan="4">
                            <InquiryReadForm @inquiryDeleted="handleInquiryDeleted" :selectedInquiry="selectedInquiry"
                                :inquiryId="selectedInquiryId" />
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </v-container>
</template>
  
<script>
import InquiryReadForm from "@/components/inquiry/InquiryReadForm.vue";
import { mapActions, mapState } from "vuex";

const inquiryModule = "inquiryModule";

export default {
    components: {
        InquiryReadForm,
    },
    props: {
        inquiries: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            isInquiryRead: false,
            selectedInquiryId: null,
        };
    },
    methods: {
        ...mapActions(inquiryModule, ["requestInquiryToSpring",]),
        mapToKoreanInquiryType(englishType) {
            const typeMap = {
                "ACCOUNT": "계정 문의",
                "SONG": "노래 문의",
                "SERVICE": "서비스 이용 문의",
                "PLAYLIST": "재생목록 문의",
            };
            return typeMap[englishType] || englishType;
        },
        async showInquiryReadForm(inquiryId) {
            this.isInquiryRead = true
            this.selectedInquiryId = inquiryId;
            await this.requestInquiryToSpring(this.selectedInquiryId);
        },
        handleInquiryDeleted(isDeleted) {
            if (isDeleted) {
                this.isInquiryRead = false;
                const indexToRemove = this.inquiries.findIndex(
                    (inquiry) => inquiry.inquiryId === this.selectedInquiryId
                );
                if (indexToRemove !== -1) {
                    this.inquiries.splice(indexToRemove, 1);
                }
                this.selectedInquiryId = null;
            }
        },
        answerText(isAnswered) {
            return isAnswered ? "답변 완료" : "답변 필요";
        },
        answerStyle(isAnswered) {
            return {
                color: isAnswered ? "white" : "gray",
                fontSize: "14px"
            };
        },
    },
    computed: {
        ...mapState(inquiryModule, ["selectedInquiry"]),
        updatedInquiries() {
            return this.$store.state.inquiries;
        },
        sortedInquiries() {
            return this.inquiries.slice().sort((a, b) => {
                const dateA = new Date(a.createInquiryDate);
                const dateB = new Date(b.createInquiryDate);
                return dateB - dateA;
            });
        },
    },
};
</script>

<style>
.my-custom-table {
    width: 100%;
    border-bottom: 1px solid rgba(218, 213, 213, 0.212);
    text-align: center;
    align-items: center;
    justify-content: center;
    border-collapse: collapse;
    margin-top: 20px;
}

.my-custom-table th,
.my-custom-table td {
    height: 60px;
    border-bottom: 1px solid rgba(218, 213, 213, 0.212);
    font-size: 15px;
}
</style>
  