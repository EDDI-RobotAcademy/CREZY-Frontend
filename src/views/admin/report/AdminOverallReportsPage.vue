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
      :reportStatusCount="reportStatusCount"     
    />
    <v-pagination style="color: white" v-model="currentPage" :length="this.reportListNum" @click="getPaginatedReports">
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
      "requestReportListTotalToSpring",
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
      await this.requestReportListToSpring(page)
      
      },

    async getReportInfo(selectedReportId) {
      const reportId = selectedReportId;
      const foundReportInfo = await this.foundReport(reportId);
      if(foundReportInfo.reportedCategoryType === 'ACCOUNT') {
        await this.requestAccountReportDetailToSpring(reportId);
      }else if (foundReportInfo.reportedCategoryType === 'PLAYLIST') {
          await this.requestPlaylistReportDetailToSpring(reportId);
      }else if (foundReportInfo.reportedCategoryType === 'SONG') {
        await this.requestSongReportDetailToSpring(reportId);
      }
    },

    async changeStatusTypeApprove(selectedReportId) {
      const payload = {
        reportId: selectedReportId,
        reportStatus: "APPROVE",
      };        
      await this.requestChangeReportStatusToSpring(payload);
      await this.requestReportListToSpring(this.currentPage);
      await this.requestReportStatusCountToSpring();
      
    },

    async changeStatusTypeReturn(selectedReportId) {
      const payload = {
        reportId: selectedReportId,
        reportStatus: "RETURN",
      };
      await this.requestChangeReportStatusToSpring(payload);
      await this.requestReportListToSpring(this.currentPage);
      await this.requestReportStatusCountToSpring();
    },

    async foundReport(selectedReportId) {
      await this.requestReportListToSpring(this.currentPage); 
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
    await this.requestReportStatusCountToSpring();
    
  },
};
</script>

<style></style>
