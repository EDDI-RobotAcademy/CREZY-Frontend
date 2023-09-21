import {
  REQUEST_INQUIRY_STATUS_TO_SPRING,
  REQUEST_INQUIRY_LIST_TO_SPRING,
  REQUEST_URGENT_INQUIRIES_TO_SPRING,
  REQUEST_INQUIRY_FOR_ADMIN_TO_SPRING,
} from "./mutation-types";

import axiosInst from "@/utility/axiosInst";

export default {
  requestInquiryStatusToSpring({ commit }) {
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.get("/admin-inquiry/counting-inquiry", {
      headers: { Authorization: userToken }
    }).then((res) => {
      commit(REQUEST_INQUIRY_STATUS_TO_SPRING, res.data)
    })
  },
  requestInquiryListToSpring({ commit }, payload) {
    const { statusType, categoryType, page } = payload
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.post("/admin-inquiry/inquiry-list",
      { statusType, categoryType, page },
      { headers: { Authorization: userToken } })
      .then((res) => {
        commit(REQUEST_INQUIRY_LIST_TO_SPRING, res.data)
      })
  },
  requestUrgentInquiriesToSpring({ commit }) {
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.get("/admin-inquiry/waiting-inquiry-list", {
      headers: { Authorization: userToken }
    }).then((res) => {
      commit(REQUEST_URGENT_INQUIRIES_TO_SPRING, res.data)
    })
  },

  requestAccountInquiriesToSpring({ commit }, payload) {
    const { accountId, page } = payload
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.post("/admin-account/account-inquiry",
      { accountId, page },
      { headers: { Authorization: userToken } }
    ).then((res) => {
      commit(REQUEST_INQUIRY_LIST_TO_SPRING, res.data)
    })
  },

  requestInquiryForAdminToSpring({ commit }, inquiryId) {
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.get(`/admin-inquiry/${inquiryId}`, {
      headers: { Authorization: userToken }
    }).then((res) => {
      commit(REQUEST_INQUIRY_FOR_ADMIN_TO_SPRING, res.data)
    })
  },

  requestInquiryAnswerToSpring({ }, payload) {
    const { inquiryAnswer, inquiryId } = payload
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.post("/admin-inquiry/inquiry-answer",
      { inquiryAnswer, inquiryId },
      { headers: { Authorization: userToken } }
    ).then((res) => {
    })
  },

  requestModifyInquiryAnswerToSpring({ }, payload) {
    const { answer, inquiryAnswerId } = payload
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.post("/admin-inquiry/modify-inquiry-answer",
      { answer, inquiryAnswerId },
      { headers: { Authorization: userToken } }
    ).then((res) => {
    })
  },
}