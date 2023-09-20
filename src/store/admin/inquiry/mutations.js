import {
  REQUEST_INQUIRY_STATUS_TO_SPRING,
  REQUEST_INQUIRY_LIST_TO_SPRING,
  REQUEST_URGENT_INQUIRIES_TO_SPRING,
  REQUEST_INQUIRY_FOR_ADMIN_TO_SPRING,
} from "./mutation-types";

export default {
  [REQUEST_INQUIRY_STATUS_TO_SPRING](state, receivedData) {
    state.inquiryStatus = receivedData
  },
  [REQUEST_INQUIRY_LIST_TO_SPRING](state, receivedData) {
    state.inquiryList = receivedData.content
    state.inquiryListCount = receivedData.totalPages
  },
  [REQUEST_URGENT_INQUIRIES_TO_SPRING](state, receivedData) {
    state.urgentInquiries = receivedData
  },
  [REQUEST_INQUIRY_FOR_ADMIN_TO_SPRING](state, receivedData) {
    state.inquiry = receivedData
  },
};
