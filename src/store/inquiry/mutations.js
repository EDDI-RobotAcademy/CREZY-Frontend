import {
  REQUEST_INQUIRY_LIST_TO_SPRING,
} from "./mutation-types";

export default {
  [REQUEST_INQUIRY_LIST_TO_SPRING](state, receivedData) {
    state.inquiries = receivedData;
  },
};