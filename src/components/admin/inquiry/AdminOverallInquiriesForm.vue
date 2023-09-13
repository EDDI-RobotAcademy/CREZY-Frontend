<template>
  <div>
    <v-row style="margin: 15px">
      <v-col cols="8">
        <div style="display: flex; justify-content: center; align-items: center;">
          <v-card class="admin-inquiry-stat-card">
            <div class="admin-inquiry-title">New Today</div>
            <div class="admin-inquiry-stat">
              2
            </div>
            <div style="text-align: center; margin-top: 20px">
              <v-btn class="admin-inquiry-stat-action" style="background-color: #1E566C;">
                see new
              </v-btn>
            </div>
          </v-card>
          <v-card class="admin-inquiry-stat-card">
            <div class="admin-inquiry-title">Not Answered</div>
            <div class="admin-inquiry-stat">
              4
            </div>
            <div style="text-align: center; margin-top: 20px">
              <v-btn class="admin-inquiry-stat-action" style=" background-color: #367589;">
                <!-- background-color: #5795A7; -->
                see not answered
              </v-btn>
            </div>
          </v-card>
          <v-card class="admin-inquiry-stat-card">
            <div class="admin-inquiry-title">Total</div>
            <div class="admin-inquiry-stat">
              7
            </div>
            <div style="text-align: center; margin-top: 20px">
              <v-btn class="admin-inquiry-stat-action" style="background-color: #1F7DAD;">
                see all
              </v-btn>
            </div>
          </v-card>
        </div>
        <div style="margin-right: 16px">
          <v-card class="admin-inquiries-list-container">
            <div style="display: flex; justify-content: space-between; align-items: center;"> 
              <div class="admin-inquiry-title">
                Inquiries
              </div>
              <div class="admin-inquiry-title">
                Sort By
              </div>
            </div>
            <v-row>
              <v-col cols="6" v-for="inquiry in inquiries">
                <v-card class="urgent-inquiry-card" flat>
                  <div style="justify-content: space-between; display: flex; align-items: center; margin-top: auto">
                    <div class="urgent-inquiry-icon" :style="{backgroundColor: getIconBackground(inquiry.type)}">
                      <v-icon>{{ getIcon(inquiry.type) }}</v-icon>
                    </div>
                    <div>
                      <div style="font-size: 20px">
                        {{ inquiry.inquiryTitle }}
                      </div>
                      <div class="admin-inquiry-title" style="font-size: 12px;">
                        {{ inquiry.writer }}
                      </div>
                    </div>
                    <div align="end" style="right: 70px">
                      <div :style="answerStyle(inquiry.isAnswered)">
                        {{ answerText(inquiry.isAnswered) }}
                      </div>
                      <div class="admin-inquiry-title" style="font-size: 12px;">
                        {{ inquiry.inquiryDate }}
                      </div>
                    </div>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </div>

      </v-col>
      <v-col cols="4">
        <v-card class="urgent-inquires-container">
          <div class="admin-inquiry-title">
            Urgent Inquires
          </div>
          <v-card v-for="inquiry in urgentInquiries" class="urgent-inquiry-card" flat>
            <div style="justify-content: space-between; display: flex; align-items: center; margin-top: auto">
              <div class="urgent-inquiry-icon" :style="{backgroundColor: getIconBackground(inquiry.type)}">
                <v-icon>{{ getIcon(inquiry.type) }}</v-icon>
              </div>
              <div>
                <div style="font-size: 20px">
                  {{ inquiry.inquiryTitle }}
                </div>
                <div class="admin-inquiry-title" style="font-size: 12px;">
                  {{ inquiry.writer }}
                </div>
              </div>
              <div align="end" style="right: 70px">
                <div :style="answerStyle(inquiry.isAnswered)">
                  {{ answerText(inquiry.isAnswered) }}
                </div>
                <div class="admin-inquiry-title" style="font-size: 12px;">
                  {{ inquiry.inquiryDate }}
                </div>
              </div>
            </div>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      urgentInquiries: [
        { type: "계정 문의", inquiryTitle: "뭐가 안돼요 1", inquiryDate: "23-09-02", writer: "이름1", isAnswered: false },
        { type: "계정 문의", inquiryTitle: "뭐가 안돼요 3", inquiryDate: "23-09-03", writer: "이름1", isAnswered: false },
        { type: "노래 문의", inquiryTitle: "뭐가 안돼요 5", inquiryDate: "23-09-06", writer: "이름3", isAnswered: false },
        { type: "서비스 이용 문의", inquiryTitle: "뭐가 안돼요 6", inquiryDate: "23-09-07", writer: "이름4", isAnswered: false },
      ],
      inquiries: [
        { type: "노래 문의", inquiryTitle: "뭐가 안돼요 7", inquiryDate: "23-09-07", writer: "이름7", isAnswered: true },
        { type: "서비스 이용 문의", inquiryTitle: "뭐가 안돼요 6", inquiryDate: "23-09-07", writer: "이름6", isAnswered: false },
        { type: "노래 문의", inquiryTitle: "뭐가 안돼요 5", inquiryDate: "23-09-06", writer: "이름5", isAnswered: false },
        { type: "재생목록 문의", inquiryTitle: "뭐가 안돼요 4", inquiryDate: "23-09-05", writer: "이름4", isAnswered: true },
        { type: "계정 문의", inquiryTitle: "뭐가 안돼요 3", inquiryDate: "23-09-03", writer: "이름3", isAnswered: false },
        { type: "서비스 이용 문의", inquiryTitle: "뭐가 안돼요 2", inquiryDate: "23-09-02", writer: "이름2", isAnswered: true },
        { type: "계정 문의", inquiryTitle: "뭐가 안돼요 1", inquiryDate: "23-09-02", writer: "이름1", isAnswered: false },
 



      ]
    }
  },
  methods: {
    getIcon(type) {
      const icons = {
        "재생목록 문의": "mdi-music-box-multiple",
        "계정 문의": "mdi-sticker-emoji",
        "노래 문의": "mdi-music-circle-outline",
        "서비스 이용 문의": "mdi-face-agent"
      };
      return icons[type] || "";
    },
    getIconBackground(type) {
      const backgrounds = {
        "재생목록 문의": "#1E566C",
        "계정 문의": "#367589",
        "노래 문의": "#5795A7",
        "서비스 이용 문의": "#1F7DAD"
      };
      return backgrounds[type] || "";
    },
    answerText(isAnswered) {
      return isAnswered ? "답변 완료" : "답변 필요";
    },
    answerStyle(isAnswered) {
      return {
        color: isAnswered ? "green" : "red",
        fontSize: "14px"
      };
    }
  }
}
</script>

<style>
.admin-inquiry-stat-card {
  height: 250px; 
  width: 100%;
  margin: 8px; 
  padding: 8px;
  background-color: #292E37;
  color: white
}

.admin-inquiry-title {
  color: #8B888E;
}

.admin-inquiry-stat {
  text-align: center;
  font-size: 74px
}

.admin-inquiry-stat-action {
  width: 90%;
  height: 65px !important;
}

.admin-inquiries-list-container{
  height: 800px; 
  width: 100%; 
  margin: 8px;
  padding: 8px;
  background-color: #292E37;
}


.urgent-inquires-container {
  background-color: #292E37;
  height: 800px; 
  width: 100%;
  margin: 8px; 
  padding: 8px;
  color: white
}

.urgent-inquiry-card {
  margin: 15px; 
  height: 100px; 
  background-color: transparent; 
  border: solid 1px black; 
  color: white; 
  display: grid; 
  padding: 16px;
}

.urgent-inquiry-icon {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}
</style>