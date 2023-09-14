import {
  REQUEST_ACCOUNTS_STATUS_TO_SPRING,
  REQUEST_ACCOUNT_LIST_FOR_ADMIN_TO_SPRING,
  REQUEST_ACCOUNT_LIST_TOTAL_TO_SPRING
} from "./mutation-types";

import axiosInst from "@/utility/axiosInst";

export default {
  requestAccountsStatusToSpring({commit}, targetDate) {
    const { date } = targetDate
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.get("/admin/check-account", { 
        params: { date: date } , 
        headers: { Authorization: userToken }
    }).then((res) => {
        commit(REQUEST_ACCOUNTS_STATUS_TO_SPRING, res.data)
    })
  },

  requestAccountListForAdminToSpring({ commit }, payload) {
    const currentPage  = payload
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.get("/admin/account-list", {
      params: { page: currentPage },
      headers: { Authorization: userToken }
    }).then((res) => {
      commit(REQUEST_ACCOUNT_LIST_FOR_ADMIN_TO_SPRING, res.data)
    })
  },

  requestAccountListTotalToSpring({ commit }) {
    return axiosInst.springAxiosInst.get("/admin/list/total-page")
      .then((res) => {
        commit(REQUEST_ACCOUNT_LIST_TOTAL_TO_SPRING, res.data)
      })
  }
}