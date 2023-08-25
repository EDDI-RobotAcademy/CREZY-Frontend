import {
  REQUEST_ACCOUNT_TO_SPRING,
} from "./mutation-types";

export default {
  [REQUEST_ACCOUNT_TO_SPRING](state, receivedData) {
    state.account = receivedData;
  },
};
