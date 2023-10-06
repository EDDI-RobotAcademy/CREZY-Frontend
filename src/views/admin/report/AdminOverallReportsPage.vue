<template>
  <div>
    <AdminOverallReportsForm @openManage="getReportInfo" @changeStatusTypeApprove="changeStatusTypeApprove"
      @changeStatusTypeReturn="changeStatusTypeReturn" @getReports="getReports" :reportList="reportList" 
      :accountReportDetail="accountReportDetail" :playlistReportDetail="playlistReportDetail" :songReportDetail="songReportDetail"
      :reportStatusCount="reportStatusCount" />
    <v-pagination style="color: white" v-model="currentPage" :length="reportListNum" @click="getPaginatedReports">
    </v-pagination>

  </div>
</template>

<script>
import AdminOverallReportsForm from "@/components/admin/report/AdminOverallReportsForm.vue";
import { mapActions, mapState } from "vuex";

const adminReportModule = "adminReportModule";
const adminAccountModule = "adminAccountModule";
const adminPlaylistModule = "adminPlaylistModule";
const adminSongModule = "adminSongModule";

export default {
  data() {
    return {
      currentPage: 1,
      selectedStatusType: 'TOTAL',
      selectedCategory: 'TOTAL',
    }
  },
  components: {
    AdminOverallReportsForm,
  },
  methods: {
    ...mapActions(
      adminReportModule, [
      "requestReportListToSpring",
      "requestAccountReportDetailToSpring",
      "requestPlaylistReportDetailToSpring",
      "requestSongReportDetailToSpring",
      "requestChangeReportStatusToSpring",
      "requestReportStatusCountToSpring"
    ]),

    ...mapActions(
      adminAccountModule, [
      "requestChangeBadNicknameToSpring",
      "requestRemoveProfileImageToSpring",
    ]),

    ...mapActions(
      adminPlaylistModule, [
      "requestChangePlaylistNameToSpring",
      "requestRemovePlaylistThumbnailToSpring",
    ]),

    ...mapActions(
      adminSongModule, [
      "requestBlockSongToSpring"
    ]),

    async getPaginatedReports() {
      const page = this.currentPage
      const statusType = this.selectedStatusType
      const categoryType = this.selectedCategory
      await this.requestReportListToSpring({ page, statusType, categoryType })

    },

    async getReports(payload) {
      if (payload.selectedStatusType !== this.selectedStatusType) {
        this.currentPage = 1
        const page = this.currentPage
        const statusType = payload.selectedStatusType
        const categoryType = payload.selectedCategory
        this.selectedStatusType = payload.selectedStatusType
        await this.requestReportListToSpring({ page, statusType, categoryType })
      }
      else if (payload.selectedCategory !== this.selectedCategory) {
        this.currentPage = 1
        const page = this.currentPage
        const statusType = payload.selectedStatusType
        const categoryType = payload.selectedCategory
        this.selectedCategory = payload.selectedCategory
        await this.requestReportListToSpring({ page, statusType, categoryType })
      }
      else {
        this.getPaginatedReports()
      }
    },

    async getReportInfo(selectedReportId) {
      const reportId = selectedReportId;
      const foundReportInfo = await this.foundReport(reportId);
      if (foundReportInfo.reportedCategoryType === 'ACCOUNT') {
        await this.requestAccountReportDetailToSpring(reportId);
      } else if (foundReportInfo.reportedCategoryType === 'PLAYLIST') {
        await this.requestPlaylistReportDetailToSpring(reportId);
        await this.requestAccountReportDetailToSpring(reportId);
      } else if (foundReportInfo.reportedCategoryType === 'SONG') {
        await this.requestSongReportDetailToSpring(reportId);
        await this.requestAccountReportDetailToSpring(reportId);
      }
    },

    async changeStatusTypeApprove(selectedReportId) {
      const payload = {
        reportId: selectedReportId,
        reportStatus: "APPROVE",
      };
      await this.requestChangeReportStatusToSpring(payload);
      await this.getPaginatedReports()
      await this.requestReportStatusCountToSpring();

    },

    async changeStatusTypeReturn(selectedReportId) {
      const payload = {
        reportId: selectedReportId,
        reportStatus: "RETURN",
      };
      await this.requestChangeReportStatusToSpring(payload);
      await this.getPaginatedReports()
      await this.requestReportStatusCountToSpring();
    },

    foundReport(selectedReportId) {
      return this.reportList.find(report => report.reportId === selectedReportId);
    },

  },
  computed: {
    ...mapState(
      adminReportModule, [
      "reportList",
      "accountReportDetail",
      "playlistReportDetail",
      "songReportDetail",
      "reportListNum",
      "reportStatusCount"
    ]),
  },

  async mounted() {
    if (
      !localStorage.getItem("roleType") === "ADMIN" ||
      localStorage.getItem("roleType") === null
    ) {
      this.$router.push({ name: "home" });
    } else {
      await this.requestReportStatusCountToSpring()
      await this.getPaginatedReports()
    }
  }
};
</script>

<style></style>
