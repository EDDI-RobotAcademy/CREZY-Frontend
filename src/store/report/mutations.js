import {
    REQUEST_REPORT_LIST_TO_SPRING,
    REQUEST_ACCOUNT_REPORT_DETAIL_TO_SPRING
   
  } from "./mutation-types";
  
  export default {
    [REQUEST_REPORT_LIST_TO_SPRING](state, receivedData) {
      state.reportList = receivedData;
    },
    [REQUEST_ACCOUNT_REPORT_DETAIL_TO_SPRING](state, receivedData) {
      state.accountReportDetail = receivedData;
    },
}