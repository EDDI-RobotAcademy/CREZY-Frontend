<template>
  <div>
    <AdminOverallReportsForm @openManage="getReportInfo" :reportList="reportList"
      :accountReportDetail="accountReportDetail" :playlistReportDetail="playlistReportDetail"
      :songReportDetail="songReportDetail" />
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
    ]),

    async getReportInfo(selectedReportId) {
      const reportId = selectedReportId
      await this.requestAccountReportDetailToSpring(reportId);
      console.log(this.accountReportDetail.reporterProfileName)
      await this.requestPlaylistReportDetailToSpring(reportId);
      console.log(this.playlistReportDetail.reporterProfileName)
      await this.requestSongReportDetailToSpring(reportId);

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