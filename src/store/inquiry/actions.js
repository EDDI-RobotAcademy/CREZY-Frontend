import {
  REQUEST_INQUIRY_LIST_TO_SPRING,
  REQUEST_SELECTED_INQUIRY_TO_SPRING,
} from "./mutation-types";

import axiosInst from "@/utility/axiosInst";

export default {
  requestInquiryRegisterToSpring({ }, payload) {
    const { inquiryCategoryType, inquiryTitle, inquiryContent, inquiryImageNames } = payload
    const userToken = localStorage.getItem("userToken")

    return axiosInst.springAxiosInst.post("/inquiry/register",
      { inquiryCategoryType, inquiryTitle, inquiryContent, inquiryImageNames },
      { headers: { Authorization: userToken } })
      .then((res) => {
        return res.data
      });
  },
  requestInquiryListToSpring({ commit }) {
    const userToken = localStorage.getItem("userToken")

    return axiosInst.springAxiosInst.get("/inquiry/list", { headers: { Authorization: userToken } }).then((res) => {
      commit(REQUEST_INQUIRY_LIST_TO_SPRING, res.data);
    });
  },
  requestInquiryToSpring({ commit }, inquiryId) {
    return axiosInst.springAxiosInst.get(`/inquiry/${inquiryId}`)
      .then((res) => {
        commit(REQUEST_SELECTED_INQUIRY_TO_SPRING, res.data);
      });
  },
  requestInquiryModifyToSpring({ }, payload) {
    return axiosInst.springAxiosInst
      .post("/inquiry/modify", payload)
      .then((res) => {
        return res.data
      });
  },
};