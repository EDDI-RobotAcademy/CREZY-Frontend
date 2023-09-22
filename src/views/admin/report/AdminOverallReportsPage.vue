<template>
  <div>
    <AdminOverallReportsForm
      @openManage="getReportInfo"
      @changeStatusTypeApprove="changeStatusTypeApprove"
      @changeStatusTypeReturn="changeStatusTypeReturn"
      :reportList="reportList"
      :accountReportDetail="accountReportDetail"
      :playlistReportDetail="playlistReportDetail"
      :songReportDetail="songReportDetail"      
    />
    <v-pagination style="color: white" v-model="currentPage" :length="this.reportListNum" @click="getPaginatedReports">
    </v-pagination>
    
  </div>
</template>

<script>
import AdminOverallReportsForm from "@/components/admin/report/AdminOverallReportsForm.vue";
import { mapActions, mapState } from "vuex";

const reportModule = "reportModule";
const adminAccountModule = "adminAccountModule";
const adminPlaylistModule = "adminPlaylistModule";
const adminSongModule = "adminSongModule";

export default {
  data() {
        return {
            currentPage: 1,       
        }
    },    
  components: {
    AdminOverallReportsForm,
  },
  methods: {
    ...mapActions(
      reportModule, [
      "requestReportListToSpring",
      "requestAccountReportDetailToSpring",
      "requestPlaylistReportDetailToSpring",
      "requestSongReportDetailToSpring",
      "requestChangeReportStatusToSpring",
      "requestReportListTotalToSpring",
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
      await this.requestReportListToSpring(page)
      
      },

    async getReportInfo(selectedReportId) {
      const reportId = selectedReportId;
      await this.requestAccountReportDetailToSpring(reportId);
      await this.requestPlaylistReportDetailToSpring(reportId);
      await this.requestSongReportDetailToSpring(reportId);
    },

    async changeStatusTypeApprove(selectedReportId) {
      const payload = {
        reportId: selectedReportId,
        reportStatus: "APPROVE",
      };        
      await this.requestChangeReportStatusToSpring(payload);
      await this.requestReportListToSpring(this.currentPage);
      
    },

    async changeStatusTypeReturn(selectedReportId) {
      const payload = {
        reportId: selectedReportId,
        reportStatus: "RETURN",
      };
      await this.requestChangeReportStatusToSpring(payload);
      await this.requestReportListToSpring(this.currentPage);
    },

    async foundReport(selectedReportId) {
      await this.requestReportListToSpring(this.currentPage); 
      return this.reportList.find(report => report.reportId === selectedReportId); 
    },

  },
  computed: {
    ...mapState(
      reportModule, [
        "reportList",
        "accountReportDetail",
        "playlistReportDetail",
        "songReportDetail",
        "reportListNum"
      ],
     
    ),

    
  },
  async mounted() {
    if (
      !localStorage.getItem("roleType") === "ADMIN" ||
      localStorage.getItem("roleType") === null
    ) {
      this.$router.push({ name: "home" });
    } else {
      await this.requestReportListToSpring(this.currentPage);
    }
    await this.requestReportListTotalToSpring();
  },
};
</script>

<style></style>
