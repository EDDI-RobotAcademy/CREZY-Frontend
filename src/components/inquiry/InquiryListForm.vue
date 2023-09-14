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
                <template v-for="inquiry in inquiries" :key="inquiry.inquiryId + 'row'">
                    <tr>
                        <td>{{ mapToKoreanInquiryType(inquiry.inquiryCategoryType.inquiryCategory) }}</td>
                        <td @click="showInquiryReadForm(inquiry.inquiryId)" style="font-weight: bold; cursor: pointer;">{{
                            inquiry.inquiryTitle }}</td>
                        <td>{{ inquiry.createInquiryDate }}</td>
                        <td :style="inquiryStatus === '답변예정' ? 'color: gray;' : 'color: white;'">{{ inquiryStatus }}</td>
                    </tr>
                    <tr v-if="selectedInquiryId === inquiry.inquiryId" :key="inquiry.inquiriesId + 'form'">
                        <td colspan="4">
                            <InquiryReadForm :inquiry="inquiry" :selectedInquiry="selectedInquiry"
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
            inquiryStatus: '답변예정',
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
        }
    },
    computed: {
        ...mapState(inquiryModule, ["selectedInquiry"]),
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
    /* background-color: rgba(218, 213, 213, 0.212); */
    margin-top: 20px;
}

.my-custom-table th,
.my-custom-table td {
    height: 60px;
    border-bottom: 1px solid rgba(218, 213, 213, 0.212);
    font-size: 15px;
    /* color: r12, 212, 212);gb(2 */
}
</style>
  