<template>
    <div>
        <v-layout row wrap class="frequent-ask-question-box">
            <v-row>
                <v-col cols="4" xs12 sm6 md4 lg3 xl2 v-for="(question, index) in frequentlyAskedQuestions" :key="index">
                    <v-card class="frequent-ask-question-card" @click="showAnswerDialog(question)">
                        {{ question.title }}
                        <v-card-text class="frequent-ask-question-text">
                            {{ truncateText(question.answer, 30) }}
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-layout>
    </div>

    <!-- 자주 묻는 질문 팝업 -->
    <v-dialog v-model="showAnswer" max-width="500px">
        <v-card style="border-radius: 5px;" class="answer-dialog">
            <v-card-title class="answer-dialog-title">{{ selectedQuestion.title }}</v-card-title>
            <v-card-text class="answer-dialog-answer" style="color: white;">
                {{ selectedQuestion.answer }}
            </v-card-text>
            <v-card-actions class="answer-dialog-actions">
                <v-btn @click="closeAnswerDialog" class="close-button">확인</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    data() {
        return {
            frequentlyAskedQuestions: [
                {
                    title: "MUSE란 무엇인가요?",
                    answer: "모르셔도 됩니다",
                },
                {
                    title: "플레이리스트를 공유하고 싶어요",
                    answer: "잘 하시면 됩니다",
                },
                {
                    title: "좋아요한 플레이리스트를 보고싶어요",
                    answer: "마이페이지로 가시면 됩니다",
                },
                {
                    title: "플레이리스트를 수정하거나 삭제하고 싶어요",
                    answer: "잘 하시면 됩니다",
                },
                {
                    title: "노래 소리가 작거나 이상해요",
                    answer: "유감입니다",
                },
                {
                    title: "탈퇴는 어떻게 하나요?",
                    answer: "잘 하시면 됩니다"
                },
            ],

            showAnswer: false,
            selectedQuestion: { title: "", answer: "" }
        }
    },

    methods: {
        truncateText(text, maxLength) {
            if (!text) {
                return "";
            }
            if (text.length > maxLength) {
                return text.substring(0, maxLength) + '...';
            }
            return text;
        },

        showAnswerDialog(question) {
            this.selectedQuestion = question;
            this.showAnswer = true;
        },
        closeAnswerDialog() {
            this.showAnswer = false;
        }
    },

}
</script>

<style>
.frequent-ask-question-box {
    padding: 40px;
}

.frequent-ask-question-card {
    padding: 25px;
    color: black;
    background-color: rgba(201, 201, 201, 0.826);
    font-size: 16px;
    font-weight: bold;
    height: 150px;
    width: 250px;
    text-align: left;
}

.frequent-ask-question-text {
    color: rgb(85, 83, 83);
    font-size: 13px;
    margin-left: -15px;
}

.answer-dialog {
    background-color: rgba(0, 0, 0, 0.912) !important;
    padding: 10px;
}

.answer-dialog-title {
    font-size: 20px;
    color: white;
    border-bottom: 1px white solid;
    padding: 20px;
    text-align: center;
}

.answer-dialog-answer {
    margin-top: 10px;
    height: 150px;
}

.answer-dialog-actions {
    justify-content: center;
}

.close-button {
    background-color: white;
    margin-bottom: 10PX;
}
</style>