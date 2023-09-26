import {
    REQUEST_REPORT_LIST_TO_SPRING,
    REQUEST_ACCOUNT_REPORT_DETAIL_TO_SPRING,
    REQUEST_PLAYLIST_REPORT_DETAIL_TO_SPRING,
    REQUEST_SONG_REPORT_DETAIL_TO_SPRING,
    REQUEST_REPORT_LIST_TOTAL_TO_SPRING
   
  } from "./mutation-types";
  
  export default {
    [REQUEST_REPORT_LIST_TO_SPRING](state, receivedData) {
      state.reportList = receivedData;
    },
    [REQUEST_REPORT_LIST_TOTAL_TO_SPRING](state, receivedData) {
      state.reportListNum = receivedData;
    },
    [REQUEST_ACCOUNT_REPORT_DETAIL_TO_SPRING](state, receivedData) {
      state.accountReportDetail = receivedData;
    },
    [REQUEST_PLAYLIST_REPORT_DETAIL_TO_SPRING](state, receivedData) {
      state.playlistReportDetail = receivedData;
    },
    [REQUEST_SONG_REPORT_DETAIL_TO_SPRING](state, receivedData) {
      state.songReportDetail = receivedData;
    },
}