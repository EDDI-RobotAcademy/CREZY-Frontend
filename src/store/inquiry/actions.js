import {
  REQUEST_INQUIRY_LIST_TO_SPRING,
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
      console.log('1:1 문의 내역: ' + res.data)
    });
  },
};