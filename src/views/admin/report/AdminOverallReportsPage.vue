<template>
    <div>
       <AdminOverallReportsForm 
       @openManage="getReportInfo"
       :reportList="reportList"
       :accountReportDetail="accountReportDetail"
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
      "requestAccountReportDetailToSpring"
    ]),

    async getReportInfo(selectedReportId) {
      const reportId = selectedReportId
      await this.requestAccountReportDetailToSpring(reportId)
      console.log(this.accountReportDetail.reporterProfileName)
    },
  },
  computed: {
    ...mapState(reportModule, [
      "reportList",
      "accountReportDetail",
    ]),
  },
  async mounted() {
    await this.requestReportListToSpring();
  },
};
  
  </script>
  
  <style>
      
  </style>