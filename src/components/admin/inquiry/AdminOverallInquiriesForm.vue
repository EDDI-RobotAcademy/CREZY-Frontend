<template>
  <div>
    <v-row style="margin: 15px">
      <v-col cols="8">
        <div class="admin-inquiry-stat-card-container">
          <v-card v-for="(card, index) in statusCards" class="admin-inquiry-stat-card">
            <div class="admin-inquiry-title">{{ card.cardName }}</div>
            <div class="admin-inquiry-stat">
              <span v-if="card.value === 'waiting'">{{ inquiryStatus.waitingAnswerInquiryCount }}</span>
              <span v-if="card.value === 'today'">{{ inquiryStatus.todayInquiryCount }}</span>
              <span v-if="card.value === 'total'">{{ inquiryStatus.totalInquiryCount }}</span>
            </div>
            <div style="text-align: center; margin-top: 20px">
              <v-btn class="admin-inquiry-stat-action" :style="{ backgroundColor: card.buttonColor }"
                @click="selectInquiryStatus(index)">
                {{ card.buttonName }}
              </v-btn>
            </div>
          </v-card>
        </div>
        <div style="margin-right: 16px">
          <v-card class="admin-inquiries-list-container">
            <div class="admin-inquiry-list-container">
              <div class="admin-inquiry-title">
                Inquiries
              </div>
              <div class="admin-inquiry-title">
                <v-text-field variant="plain" append-inner-icon="mdi-menu-down-outline"
                  @click:append-inner="chooseInquiryCategory = !chooseInquiryCategory" readonly
                  class="admin-inquiry-search-field" v-model="selectedCategory" v-on="on">
                </v-text-field>
                <v-menu v-model="choosePlaylistCategory">
                  <template v-slot:activator="{ on }">
                    <v-list class="admin-enquiry-category-select-field" v-if="chooseInquiryCategory">
                      <v-list-item class="admin-enquiry-category-selection" v-for="inquiryCategory in inquiryCategories"
                        @click="selectCategory(inquiryCategory)">
                        <v-list-item-title style="font-size: 13px">{{ inquiryCategory.name }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </template>
                </v-menu>
              </div>
            </div>
            <v-row>
              <v-col cols="6" v-for="inquiry in inquiryList">
                <v-card class="admin-inquiry-card" flat>
                  <div class="admin-inquiry-content">
                    <div class="admin-inquiry-icon"
                      :style="{ backgroundColor: getIconBackground(inquiry.inquiryCategoryType) }">
                      <v-icon>{{ getIcon(inquiry.inquiryCategoryType) }}</v-icon>
                    </div>
                    <div>
                      <div style="font-size: 20px">
                        {{ inquiry.inquiryTitle }}
                      </div>
                      <div class="admin-inquiry-title" style="font-size: 12px;">
                        {{ inquiry.nickname }}
                      </div>
                    </div>
                    <div align="end" style="right: 70px">
                      <div :style="answerStyle(inquiry.existAnswer)">
                        {{ answerText(inquiry.existAnswer) }}
                      </div>
                      <div class="admin-inquiry-title" style="font-size: 12px;">
                        {{ inquiry.createInquiryDate }}
                      </div>
                    </div>
                  </div>
                </v-card>
              </v-col>
            </v-row>
            <v-pagination style="color: white; bottom: 0;" v-model="currentPage" :length="inquiryListCount"
              @click="getPaginatedInquiries">
            </v-pagination>
          </v-card>
        </div>
      </v-col>
      <v-col cols="4">
        <v-card class="urgent-inquires-container">
          <div class="admin-inquiry-title">
            Urgent Inquires
          </div>
          <v-card v-for="inquiry in urgentInquiries" class="admin-inquiry-card" flat>
            <div class="admin-inquiry-content">
              <div class="admin-inquiry-icon"
                :style="{ backgroundColor: getIconBackground(inquiry.inquiryCategoryType) }">
                <v-icon>{{ getIcon(inquiry.inquiryCategoryType) }}</v-icon>
              </div>
              <div>
                <div style="font-size: 20px">
                  {{ inquiry.inquiryTitle }}
                </div>
                <div class="admin-inquiry-title" style="font-size: 12px;">
                  {{ inquiry.nickname }}
                </div>
              </div>
              <div align="end" style="right: 70px">
                <div :style="answerStyle(inquiry.existAnswer)">
                  {{ answerText(inquiry.existAnswer) }}
                </div>
                <div class="admin-inquiry-title" style="font-size: 12px;">
                  {{ inquiry.createInquiryDate }}
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
  props: {
    inquiryStatus: {
      type: Object,
      required: true,
    },
    inquiryList: {
      type: Array,
      required: true,
    },
    urgentInquiries: {
      type: Array,
      required: true,
    },
    inquiryListCount: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      chooseInquiryCategory: false,
      selectedCategory: '전체',
      currentCategory: 'TOTAL',
      currentStatus: 'total',
      selectedAccountId: this.$route.query.accountId,
      currentPage: 1,

      inquiryCategories: [
        { name: "전체", value: "TOTAL" },
        { name: "재생목록", value: "PLAYLIST" },
        { name: "노래", value: "SONG" },
        { name: "계정", value: "ACCOUNT" },
        { name: "서비스", value: "SERVICE" },
      ],

      statusCards: [
        { cardName: "New Today", buttonName: "see new", value: "today", buttonColor: "#1E566C" },
        { cardName: "Not Answered", buttonName: "see not answered", value: "waiting", buttonColor: "#367589" },
        { cardName: "Total", buttonName: "see all", value: "total", buttonColor: "#1F7DAD" }
      ],


    }
  },
  methods: {
    getIcon(type) {
      const icons = {
        "PLAYLIST": "mdi-music-box-multiple",
        "ACCOUNT": "mdi-sticker-emoji",
        "SONG": "mdi-music-circle-outline",
        "SERVICE": "mdi-face-agent"
      };
      return icons[type] || "";
    },
    getIconBackground(type) {
      const backgrounds = {
        "PLAYLIST": "#1E566C",
        "ACCOUNT": "#367589",
        "SONG": "#5795A7",
        "SERVICE": "#1F7DAD"
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
    },
    selectCategory(chosenCategory) {
      this.selectedCategory = chosenCategory.name
      this.currentCategory = chosenCategory.value
      this.chooseInquiryCategory = false
      this.getPaginatedInquiries()
    },
    selectInquiryStatus(index) {
      this.currentStatus = this.statusCards[index].value
      this.getPaginatedInquiries()
    },
    getPaginatedInquiries() {
      const statusType = this.currentStatus
      const categoryType = this.currentCategory
      const page = this.currentPage
      this.$emit("requestInquiries", { statusType, categoryType, page })
    },
    getAccountInquiries(selectedAccountId) {
      const accountId = selectedAccountId
      const page = this.currentPage
      this.$emit("getAccountInquiries", { accountId, page })
    }
  },
  mounted() {
    if (!localStorage.getItem("roleType") === "ADMIN" || localStorage.getItem("roleType") === null) {
      this.$router.push({ name: "home" });
    } else {
      if (this.selectedAccountId) {
        this.getAccountInquiries(this.selectedAccountId)
      } else {
        this.getPaginatedInquiries()
      }
    }

  }
}
</script>

<style>
.admin-inquiry-stat-card-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.admin-inquiry-stat-card {
  height: 250px;
  width: 100%;
  margin: 8px;
  padding: 8px;
  background-color: #292E37;
  color: white
}

.admin-inquiry-list-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.admin-inquiries-list-container {
  min-height: 535px;
  width: 100%;
  margin: 8px;
  padding: 8px;
  background-color: #292E37;
}

.admin-inquiry-search-field {
  width: 130px;
  font-size: 8px !important;
  background-color: transparent !important;
}

.admin-enquiry-category-select-field {
  background-color: #212630 !important;
  position: absolute;
  width: 140px;
  top: 65px;
  right: 8px;
  z-index: 99;
}

.admin-enquiry-category-selection {
  color: white;
  border-bottom: 1px dotted white;
}

.urgent-inquires-container {
  background-color: #292E37;
  min-height: 800px;
  width: 100%;
  margin: 8px;
  padding: 8px;
  color: white
}

.admin-inquiry-card {
  margin: 15px;
  height: 100px;
  background-color: transparent;
  border: solid 1px black;
  color: white;
  display: grid;
  padding: 16px;
}

.admin-inquiry-content {
  justify-content: space-between;
  display: flex;
  align-items: center;
  margin-top: auto
}

.admin-inquiry-icon {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}
</style>