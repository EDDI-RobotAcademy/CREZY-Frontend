<template>
  <div>
    <v-row style="margin: 15px;">
      <v-col cols="12">
        <v-row>
          <v-col cols="3" v-for="statusType in statusTypes">  
            <v-card class="overall-playlist-stat-card" @click="selectStatusType(statusType.value)">
              <div class="overall-playlist-stat-content">
                <div class="overall-playlist-stat=title">
                  {{ statusType.title }}
                </div>
                <div class="overall-playlist-stat-num">
                  {{ statusCount(statusType.value) }}
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-card class="admin-overall-playlist-list-card">

      <div style="justify-content: space-between; display: flex;">
        <div class="admin-overall-playlist-list-title" align="start">
          Reports
        </div>

        <div style="width: 300px; ">
          <v-text-field variant="outlined" append-inner-icon="mdi-menu-down-outline"
            @click:append-inner="chooseReportCategory = !chooseReportCategory" readonly
            class="admin-playlist-search-field" v-model="selectedCategory"></v-text-field>
          <v-menu v-model="chooseReportCategory">
            <template v-slot:activator="{ on }">
              <v-list class="report-category-select-field" v-if="chooseReportCategory">
                <v-list-item class="report-category-selection" v-for="reportCategory in reportCategories"
                  @click="selectCategory(reportCategory)">
                  <v-list-item-title style="font-size: 13px">{{ reportCategory.name }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </template>
          </v-menu>
        </div>
      </div>


      <v-divider></v-divider>

      <div>
        <table class="overall-playlist-table">
          <tr class="accounts-table-picker-container">
            <td colspan="6" align="end">
              <div>
                <v-icon style="color: #1f3ad6; font-size: 46px;">mdi-circle-small</v-icon> 승인
                <v-icon style="color: #ec0000; font-size: 46px">mdi-circle-small</v-icon> 반려
                <v-icon style="color: #fffffa; font-size: 46px">mdi-circle-small</v-icon> 보류
              </div>
            </td>
          </tr>

          <tr class="overall-playlist-table-header">
            <th style="width: 100px;"></th>
            <th align="start">index</th>
            <th align="start">신고 주제</th>
            <th align="end">신고자</th>
            <th align="end" style="padding-right: 25px;">
              register date
            </th>
          </tr>
          <template v-for="(report, index) in reportList">
            <tr class="overall-playlist-table-row" @click="forManage(report.reportId)">
              <td>
                <div class="overall-playlist-song-marker-container">
                  <div v-if="report.reportStatusType === 'APPROVE'" class="approve-report-marker"></div>
                  <div v-if="report.reportStatusType === 'RETURN'" class="return-report-marker"></div>
                  <div v-if="report.reportStatusType === 'HOLDON'" class="holdon-report-marker"></div>
                </div>
              </td>

              <td align="start">{{ index + 1 }}</td>
              <td align="start">{{ report.reportedCategoryType }}</td>
              <td align="end">{{ report.reporterNickname }}</td>
              <td align="end" style="padding-right: 25px">{{ report.createReportDate }}</td>
            </tr>
            <tr v-if="selectedReportId === report.reportId">
              <td colspan="6">
                <AdminParticularReportDetailForm 
                @changeStatusTypeApprove="changeStatusTypeApprove"
                @changeStatusTypeReturn="changeStatusTypeReturn"
                :accountReportDetail="accountReportDetail"
                :playlistReportDetail="playlistReportDetail" 
                :songReportDetail="songReportDetail"
                :reportList="reportList" 
                :reportId="selectedReportId" 
                />
              </td>
            </tr>
          </template>
        </table>
      </div>
    </v-card>
  </div>
</template>

<script>

import AdminParticularReportDetailForm from "@/components/admin/report/AdminParticularReportDetailForm.vue"

export default {

  components: {
    AdminParticularReportDetailForm
  },

  data() {

    return {
      selectedReportId: '',
      chooseReportCategory: false,
      selectedCategory: '전체',
      selectedCategoryValue: 'TOTAL',
      reportCategories: [
        { value: 'TOTAL', name: "전체"}, 
        { value: 'ACCOUNT', name: "계정"},
        { value: 'PLAYLIST', name: "플레이리스트"},
        { value: 'SONG', name: "노래"},
      ],
      selectedStatusType: 'TOTAL',

      statusTypes: [
        { title: "승인된 신고 개수", value: "APPROVE" },
        { title: "반려된 신고 개수", value: "RETURN" },
        { title: "총 신고 개수", value: "TOTAL" },
        { title: "처리할 신고 개수", value: "HOLDON" },
      ]

    }
  },
  props: {
    reportList: {
      type: Object,
      required: true,
    },
    accountReportDetail: {
      type: Object,
      required: false,
    },
    playlistReportDetail: {
      type: Object,
      required: false,
    },
    songReportDetail: {
      type: Object,
      required: false,
    },
    reportStatusCount: {
      type: Object,
      required: true,
    },
  },
  methods: {

    changeStatusTypeApprove() {
      const selectedReportId = this.selectedReportId
      this.$emit("changeStatusTypeApprove", selectedReportId)
    },

    changeStatusTypeReturn() {
      const selectedReportId = this.selectedReportId
      this.$emit("changeStatusTypeReturn", selectedReportId)
    },


    selectCategory(category) {
      this.selectedCategory = category.name
      this.selectedCategoryValue = category.value
      const selectedStatusType = this.selectedStatusType
      const selectedCategory = category.value
      
      this.getReports({ selectedStatusType, selectedCategory })
    },

    forManage(reportId) {
      if (this.selectedReportId == reportId.toString()) {
        this.selectedReportId = ''
      } else {
        this.selectedReportId = reportId;
        this.$emit("openManage", this.selectedReportId)
      }
    },

    statusCount(value) {
      if (value === "APPROVE") {
        return this.reportStatusCount.approveCount; 
      }
      if (value === "RETURN") {
        return this.reportStatusCount.returnCount;
      }
      if (value === "TOTAL") {
        return this.reportStatusCount.totalCount;
      }
      if (value === "HOLDON") {
        return this.reportStatusCount.holdonCount;
      }
    },

    selectStatusType(value) {
      this.selectedStatusType = value
      const selectedStatusType = value
      const selectedCategory = this.selectedCategoryValue
      this.getReports({ selectedStatusType, selectedCategory })
    },

    getReports(payload) {
      this.$emit("getReports", payload)
      console.log(this.reportList[0])
    }
  },
}

</script>

<style>
.accounts-table-picker-container {
  height: 20px;
  color: #5F6871;
}

.approve-report-marker {
  height: 50px;
  width: 3px;
  background-color: #1f3ad6;
  border-radius: 5px;
}

.return-report-marker {
  height: 50px;
  width: 3px;
  background-color: #ec0000;
  border-radius: 5px;
}

.holdon-report-marker {
  height: 50px;
  width: 3px;
  background-color: #fffffa;
  border-radius: 5px;
}

.v-menu__content {
  position: absolute;
  z-index: 9999;
}

.report-category-select-field {
  background-color: #212630 !important;
  position: absolute;
  width: 300px;
  top: 82px;
  position: absolute;
  z-index: 9999;
  color: #ffffff;

}

.report-category-selection {
  margin-bottom: -5px;
}
</style>