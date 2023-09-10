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
                    최근 6개월 간 문의하신 내역이 없습니다.
                </tr>
                <tr v-for="inquiry in sortedInquiries" :key="inquiry.inquiryId">
                    <td>{{ inquiry.inquiryType }}</td>
                    <td style="font-weight: bold;">{{ inquiry.inquiryTitle }}</td>
                    <td>{{ inquiry.inquiryDate }}</td>
                    <td :style="inquiry.inquiryStatus === '답변예정' ? 'color: gray;' : 'color: white;'">{{
                        inquiry.inquiryStatus }}</td>
                </tr>
            </tbody>
        </table>
    </v-container>
</template>
  
<script>

export default {
    // props: {
    //     inquiries: {
    //         type: Array,
    //         required: true,
    //     },
    // },
    data() {
        return {
            inquiries: [
                { inquiryType: '서비스 이용 문의', inquiryTitle: '탈퇴 버튼이 안보여요 ㅡㅡ', inquiryDate: '2023.09.01', inquiryStatus: '답변예정' },
                { inquiryType: '노래 문의', inquiryTitle: '플레이리스트에 노래 추가가 안돼요', inquiryDate: '2023.09.09', inquiryStatus: '답변완료' },
                { inquiryType: '서비스 이용 문의', inquiryTitle: '테스트 제목 1', inquiryDate: '2023.09.09', inquiryStatus: '답변예정' },
                { inquiryType: '서비스 이용 문의', inquiryTitle: '테스트 제목 1', inquiryDate: '2023.09.09', inquiryStatus: '답변예정' },
                { inquiryType: '서비스 이용 문의', inquiryTitle: '테스트 제목 1', inquiryDate: '2023.09.05', inquiryStatus: '답변예정' },
                { inquiryType: '서비스 이용 문의', inquiryTitle: '테스트 제목 1', inquiryDate: '2023.09.09', inquiryStatus: '답변예정' },
                { inquiryType: '서비스 이용 문의', inquiryTitle: '테스트 제목 1', inquiryDate: '2023.09.09', inquiryStatus: '답변완료' },
                { inquiryType: '서비스 이용 문의', inquiryTitle: '테스트 제목 1', inquiryDate: '2023.09.09', inquiryStatus: '답변예정' },
                { inquiryType: '서비스 이용 문의', inquiryTitle: '테스트 제목 1', inquiryDate: '2023.09.09', inquiryStatus: '답변예정' },
            ]
        };
    },

    computed: {
        sortedInquiries() {
            return this.inquiries.slice().sort((a, b) => {
                return new Date(b.inquiryDate) - new Date(a.inquiryDate);
            });
        }
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
  