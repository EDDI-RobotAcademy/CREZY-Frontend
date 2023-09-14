<template>
    <div>
       <AdminOverallReportsForm :reportList="reportList"/>   
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
    ...mapActions(reportModule, ["requestReportListToSpring"]),
  },
  computed: {
    ...mapState(reportModule, ["reportList"]),
  },
  async mounted() {
    await this.requestReportListToSpring();
  },
};
  
  </script>
  
  <style>
      
  </style>