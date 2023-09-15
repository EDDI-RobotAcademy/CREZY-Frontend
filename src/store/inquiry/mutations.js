import {
  REQUEST_INQUIRY_LIST_TO_SPRING,
  REQUEST_SELECTED_INQUIRY_TO_SPRING,
} from "./mutation-types";

export default {
  [REQUEST_INQUIRY_LIST_TO_SPRING](state, receivedData) {
    state.inquiries = receivedData;
  },
  [REQUEST_SELECTED_INQUIRY_TO_SPRING](state, receivedData) {
    state.selectedInquiry = receivedData;
  },
  updateInquiryTitle(state, { inquiryId, newTitle }) {
    const inquiry = state.inquiries.find(item => item.inquiryId === inquiryId);
    if (inquiry) {
      inquiry.inquiryTitle = newTitle;
    }
  },
};