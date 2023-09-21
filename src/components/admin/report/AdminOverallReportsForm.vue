<template>
  <div>
    <v-row style="margin: 15px;">
      <v-col cols="12">
        <v-row>
          <v-col cols="3">
            <v-card class="overall-playlist-stat-card" @click="selectedStatusType = 'APPROVE'">
              <div class="overall-playlist-stat-content">
                <div class="overall-playlist-stat=title">
                  승인된 신고 개수
                </div>
                <div class="overall-playlist-stat-num">
                  {{ approveReports }}
                </div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="3">
            <v-card class="overall-playlist-stat-card" @click="selectedStatusType = 'RETURN'">
              <div class="overall-playlist-stat-content">
                <div class="overall-playlist-stat=title">
                  반려된 신고 개수
                </div>
                <div class="overall-playlist-stat-num">
                  {{ returnReports }}
                </div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="3">
            <v-card class="overall-playlist-stat-card" @click="selectedStatusType = null">
              <div class="overall-playlist-stat-content">
                <div class="overall-playlist-stat=title">
                  총 신고 개수
                </div>
                <div class="overall-playlist-stat-num">
                  {{ totalReports }}
                </div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="3">
            <v-card class="overall-playlist-stat-card" @click="selectedStatusType = 'HOLDON'">
              <div class="overall-playlist-stat-content">
                <div class="overall-playlist-stat=title">
                  처리할 신고 개수
                </div>
                <div class="overall-playlist-stat-num">
                  {{ holdonReports }}
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
                  <v-list-item-title style="font-size: 13px">{{ reportCategory }}</v-list-item-title>
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
          <template v-for="(report, index) in filteredReportList">
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
                :reportList="reportList" :reportId="selectedReportId" 
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
      reportCategories: ['전체', '계정', '플레이리스트', '노래'],
      selectedStatusType: null,



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
  },
  methods: {

    changeStatusTypeApprove() {
      const selectedReportId = this.selectedReportId
      this.$emit("changeStatusTypeApprove", selectedReportId)
      console.log("APPROVE 자식")
    },

    changeStatusTypeReturn() {
      const selectedReportId = this.selectedReportId
      this.$emit("changeStatusTypeReturn", selectedReportId)
    },


    selectCategory(selectedCategory) {
      this.selectedCategory = selectedCategory
    },

    forManage(reportId) {
      if (this.selectedReportId == reportId.toString()) {
        this.selectedReportId = ''
      } else {
        this.selectedReportId = reportId;
        this.$emit("openManage", this.selectedReportId)
      }
    },

  },
  computed: {

    approveReports() {
      return this.reportList.filter(report => report.reportStatusType === 'APPROVE').length;
    },
    returnReports() {
      return this.reportList.filter(report => report.reportStatusType === 'RETURN').length;
    },
    holdonReports() {
      return this.reportList.filter(report => report.reportStatusType === 'HOLDON').length;
    },
    totalReports() {
      return this.returnReports + this.approveReports + this.holdonReports
    },



    filteredReportList() {
      if (this.selectedCategory === '전체') {
        if (this.selectedStatusType === null) {
          return this.reportList;
        } else {
          return this.reportList.filter(report => report.reportStatusType === this.selectedStatusType);
        }
      } else if (this.selectedCategory === '계정') {
        if (this.selectedStatusType === null) {
          return this.reportList.filter(report => report.reportedCategoryType === 'ACCOUNT');
        } else {
          return this.reportList.filter(
            report => report.reportedCategoryType === 'ACCOUNT' && report.reportStatusType === this.selectedStatusType
          );
        }
      } else if (this.selectedCategory === '플레이리스트') {
        if (this.selectedStatusType === null) {
          return this.reportList.filter(report => report.reportedCategoryType === 'PLAYLIST');
        } else {
          return this.reportList.filter(
            report => report.reportedCategoryType === 'PLAYLIST' && report.reportStatusType === this.selectedStatusType
          );
        }
      } else if (this.selectedCategory === '노래') {
        if (this.selectedStatusType === null) {
          return this.reportList.filter(report => report.reportedCategoryType === 'SONG');
        } else {
          return this.reportList.filter(
            report => report.reportedCategoryType === 'SONG' && report.reportStatusType === this.selecte
          );

        }
      }
    },
    updateSelectedStatusAndCategory(statusType) {
      this.selectedStatusType = statusType;
      this.selectedCategory = '전체';
    },
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