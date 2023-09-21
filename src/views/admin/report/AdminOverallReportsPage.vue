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
  </div>
</template>
  
<script>
import AdminOverallReportsForm from "@/components/admin/report/AdminOverallReportsForm.vue"
import { mapActions, mapState } from "vuex";

const reportModule = "reportModule";

export default {
  components: {
    AdminOverallReportsForm
  },
  methods: {
    ...mapActions(reportModule, [
      "requestReportListToSpring",
      "requestAccountReportDetailToSpring",
      "requestPlaylistReportDetailToSpring",
      "requestSongReportDetailToSpring",
      "requestChangeReportStatusToSpring",
    ]),

    async getReportInfo(selectedReportId) {
      const reportId = selectedReportId
      await this.requestAccountReportDetailToSpring(reportId);      
      await this.requestPlaylistReportDetailToSpring(reportId);
      await this.requestSongReportDetailToSpring(reportId);

    },

    async changeStatusTypeApprove(selectedReportId) {
      const payload = {
        reportId: selectedReportId,
        reportStatus: 'APPROVE' 
      };
      await this.requestChangeReportStatusToSpring(payload);
      await this.requestReportListToSpring();
    },
    async changeStatusTypeReturn(selectedReportId) {
      const payload = {
        reportId: selectedReportId,
        reportStatus: 'RETURN', 
      };
      await this.requestChangeReportStatusToSpring(payload);
      await this.requestReportListToSpring();
    },
  },
  computed: {
    ...mapState(reportModule, [
      "reportList",
      "accountReportDetail",
      "playlistReportDetail",
      "songReportDetail",
    ]),
  },
  async mounted() {
    if (!localStorage.getItem("roleType") === "ADMIN" || localStorage.getItem("roleType") === null) {
      this.$router.push({ name: "home" });
    } else {
      await this.requestReportListToSpring();
    }
  },
};

</script>
  
<style></style>