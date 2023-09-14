import {
    REQUEST_ACCOUNTS_STATUS_TO_SPRING,
    REQUEST_ACCOUNT_LIST_FOR_ADMIN_TO_SPRING,
    REQUEST_ACCOUNT_LIST_TOTAL_TO_SPRING,
    REQUEST_ACCOUNT_INFO_FOR_ADMIN_TO_SPRING
  } from "./mutation-types";
  
  export default {
    [REQUEST_ACCOUNTS_STATUS_TO_SPRING](state, receivedData) {
      state.accountsStatus = receivedData;
    },
    [REQUEST_ACCOUNT_LIST_FOR_ADMIN_TO_SPRING] (state, receivedData) {
      state.accountList = receivedData
    },
    [REQUEST_ACCOUNT_LIST_TOTAL_TO_SPRING] (state, receivedData) {
      state.accountListCount = receivedData
    },
    [REQUEST_ACCOUNT_INFO_FOR_ADMIN_TO_SPRING] (state, receivedData) {
      state.accountInfo = receivedData
    }
  };
  