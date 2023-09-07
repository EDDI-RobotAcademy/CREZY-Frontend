
<template>
    <div>
        1:1 문의내역
        <!-- 페이지에서 v-if로 띄우기 -->
        <div>
            <div>
                최근 6개월 간 문의하신 내역이 없습니다.
            </div>
            <div>
                1:1 문의 게시글 리스트 띄우기
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            isInquiryRegister: false
        }
    },

    methods: {
        showInquiryRegisterForm() {
            this.isInquiryRegister = true
        }
    }

}
</script>
<style></style>