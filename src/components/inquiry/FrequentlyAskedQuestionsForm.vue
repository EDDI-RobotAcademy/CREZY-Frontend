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
        <v-card class="answer-dialog">
            <v-card-title class="answer-dialog-title">{{ selectedQuestion.title }}</v-card-title>
            <v-card-text class="answer-dialog-answer" v-html="answer"></v-card-text>
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
                    answer: "MUSE란 '음악으로 표현하는 감정'을 의미하는 Music Sentence를 줄인 말입니다. \n\nMUSE는 사용자가 현재의 감정을 입력하면 해당 감정에 어울리는 노래를 추천해주는 사이트입니다. \n\n지금 현재의 감정을 입력해 보세요! <a style='color:white;' href='/'>MUSE</a>"
                },
                {
                    title: "부적절한 플레이리스트/계정/노래를 신고하고 싶어요",
                    answer: "부적절한 콘텐츠를 신고하려면 다음 단계를 따르세요:\n\n" +
                        "<li>플레이리스트/계정 신고" +
                        "<ol style='padding-left: 20px;'>" +
                        "<li>신고하고자 하는 플레이리스트로 이동합니다.</li>" +
                        "<li>우측 상단에 있는 '신고' 아이콘을 클릭하세요.</li>" +
                        "<li>신고 대상을 선택하고, 신고 유형을 선택한 후 제출해 주세요.</li>" +
                        "</ol>\n" +
                        "<li>노래 신고\n" +
                        "<ol style='padding-left: 20px;'>" +
                        "<li>플레이리스트 내의 해당 노래를 찾습니다.</li>" +
                        "<li>노래 라인 오른쪽 부분에 있는 깃발 모양 아이콘을 클릭하세요.</li>" +
                        "<li>신고 유형을 선택한 후 제출해 주세요.</li>" +
                        "</ol>"
                },
                {
                    title: "좋아요한 플레이리스트를 보고싶어요",
                    answer: "좋아요한 플레이리스트를 보려면 마이페이지로 이동하세요. \n\n마이 페이지에서 'My Playlist'와 'My Favorite Playlist' 중 후자인 'My Favorite Playlist'에서 사용자가 찜한 플레이리스트 목록을 보실 수 있습니다. \n\n참고로 'My Playlist'는 해당 사용자가 등록한 플레이리스트 목록입니다"
                },
                {
                    title: "플레이리스트를 수정하거나 삭제하고 싶어요",
                    answer: "플레이리스트를 수정 또는 삭제하려면 다음 단계를 따라주세요: \n" +
                        "<ol style='padding: 20px;'>" +
                        "<li>마이페이지로 이동하세요.</li>" +
                        "<li>'My Playlist' 섹션에서 수정 또는 삭제하고자 하는 플레이리스트를 클릭하여 해당 플레이리스트의 상세페이지로 이동합니다.</li>" +
                        "<li>우측 상단의 메뉴 아이콘을 클릭합니다.</li>" +
                        "<li>수정 또는 삭제 옵션을 선택하고, 원하는 작업을 수행하세요.</li>" +
                        "</ol>"
                },
                {
                    title: "플레이리스트에 추가한 노래를 삭제하고 싶어요",
                    answer: "플레이리스트에 추가한 노래를 삭제하려면 다음 단계를 따라주세요:\n" +
                        "<ol style='padding: 20px;'>" +
                        "<li>마이페이지로 이동하세요.</li>" +
                        "<li>'My Playlist'에서 삭제하고자 하는 플레이리스트를 선택합니다.</li>" +
                        "<li>삭제하고자 하는 노래 라인에 마우스 커서를 올리시면 오른쪽에 체크 박스가 나타납니다.</li>" +
                        "<li>체크 박스를 클릭하여 삭제할 노래를 선택하세요.</li>" +
                        "<li>선택한 노래에 대한 삭제 버튼이 표시되면 삭제 버튼을 클릭하세요.</li>" +
                        "</ol>"
                },
                {
                    title: "탈퇴는 어떻게 하나요?",
                    answer: "MUSE에서 탈퇴하려면 다음 단계를 따라주세요:\n" +
                        "<ol style='padding: 20px;'>" +
                        "<li>마이페이지로 이동하세요.</li>" +
                        "<li>프로필 이미지를 클릭하거나 우측 상단의 메뉴 아이콘을 클릭하여 '회원 수정' 옵션을 클릭합니다.</li>" +
                        "<li>회원 정보 페이지로 이동하면 우측 하단에 '회원 탈퇴' 버튼이 작은 글씨로 나타납니다.</li>" +
                        "<li>'회원 탈퇴' 버튼을 클릭하고 나타나는 지침에 따라 탈퇴를 완료하세요.</li>" +
                        "</ol>" +
                        "MUSE를 이용해주셔서 감사합니다. 좋은 서비스를 제공하기 위해 항상 노력하겠습니다."
                }
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

    computed: {
        answer() {
            return this.selectedQuestion.answer.replace(/\n/g, "<br>");
        }
    }
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
    border-radius: 5px;
    height: 500px;
}

.answer-dialog-title {
    font-size: 20px;
    color: white;
    border-bottom: 1px white solid;
    padding: 20px;
    text-align: center;
    font-weight: bold;
}

.answer-dialog-answer {
    margin-top: 10px;
    height: 150px;
    color: white;
}

.answer-dialog-actions {
    justify-content: center;
}

.close-button {
    background-color: white;
    margin-bottom: 10PX;
}
</style>