<template>
    <div class="customer-service-card">
        <div class="customer-service-title">
            무엇을 도와드릴까요?
        </div>
        <!-- <div class="customer-service-search-box">
            <input type="text" v-model="searchKeyword" placeholder="Search" v-on:keyup.enter="search(searchKeyword)">
            <v-icon style="color: black; margin-top: 3px; margin-left:160px;" alt="돋보기"
                @click="search(searchKeyword)">mdi-magnify</v-icon>
        </div> -->
        <div class="customer-service-header">
            <ul class="customer-service-navi">
                <div :class="{ 'active-navi': isFreuntlyAskedQuestions }" class="customer-service-navi-button">
                    <button @click="showFreuntlyAskedQuestions">자주 묻는 질문</button>
                </div>
                <div :class="{ 'active-navi': isOneOnOneInquiry }" class="customer-service-navi-button">
                    <button @click="showInquiryForm">1:1 문의</button>
                </div>
                <div :class="{ 'active-navi': isCheckMyAnswer }" class="customer-service-navi-button">
                    <button @click="showMyQuestion">나의 문의 내역</button>
                </div>
            </ul>
        </div>
        <FrequentlyAskedQuestionsForm v-if="isFreuntlyAskedQuestions" />
        <InquiryRegisterForm v-if="isOneOnOneInquiry" @inquirySubmit="onInquirySubmit" />
        <InquiryListForm v-if="isCheckMyAnswer" />
    </div>
</template>

<script>
import FrequentlyAskedQuestionsForm from "@/components/inquiry/FrequentlyAskedQuestionsForm.vue";
import InquiryRegisterForm from "@/components/inquiry/InquiryRegisterForm.vue";
import InquiryListForm from "@/components/inquiry/InquiryListForm.vue";

export default {
    components: {
        FrequentlyAskedQuestionsForm,
        InquiryRegisterForm,
        InquiryListForm,
    },

    data() {
        return {
            isFreuntlyAskedQuestions: true,
            isOneOnOneInquiry: false,
            isCheckMyAnswer: false,
        }
    },

    methods: {
        showFreuntlyAskedQuestions() {
            this.isFreuntlyAskedQuestions = true;
            this.isOneOnOneInquiry = false;
            this.isCheckMyAnswer = false;
        },

        showInquiryForm() {
            this.isFreuntlyAskedQuestions = false;
            this.isOneOnOneInquiry = true;
            this.isCheckMyAnswer = false;
        },

        showMyQuestion() {
            this.isFreuntlyAskedQuestions = false;
            this.isOneOnOneInquiry = false;
            this.isCheckMyAnswer = true;
        },
    },
}
</script>

<style scoped>
.customer-service-card {
    margin-top: 6rem;
    padding: 18px;
    width: 900px;
    background-color: rgba(0, 0, 0, 0.4) !important;
    text-align: center;
    color: white;
}

.customer-service-title {
    font-size: 25px;
    font-weight: bold;
    margin-top: 30px;
}

/* .customer-service-search-box {
    max-width: 400px;
    height: 35px;
    border-radius: 17px;
    background-color: #f4f5f5;
    margin: 30px auto 0;
    display: flex;
    align-items: center;
    padding: 0 15px;
}

.customer-service-search-box input[type="text"] {
    width: 100%;
    border: none;
    background: transparent;
    outline: none;
    height: 100%;
    font-size: 16px;
    margin-right: -150px;
} */

.customer-service-header {
    margin: 0 auto;
    padding: 0 20px;
    margin-top: 25px;
}

.customer-service-navi {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 48px;
    margin-bottom: 0;
    font-size: 18px;
    text-align: center;
}

.customer-service-navi-button {
    width: 200px;
    margin: 0 auto;
}

.customer-service-navi-button {
    width: 200px;
    margin: 0 auto;
    color: white;
    text-decoration: none;
    border-bottom: 2px solid transparent;
}

.active-navi {
    color: #ccff00;
    border-bottom-color: #ccff00;
}

.customer-service-navi-button button {
    background: none;
    border: none;
    cursor: pointer;
}
</style>