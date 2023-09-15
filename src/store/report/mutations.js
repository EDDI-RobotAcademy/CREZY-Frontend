import {
    REQUEST_REPORTLIST_TO_SPRING
   
  } from "./mutation-types";
  
  export default {
    [REQUEST_REPORTLIST_TO_SPRING](state, receivedData) {
      state.reportList = receivedData;
    },
}