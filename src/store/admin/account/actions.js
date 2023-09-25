import {
  REQUEST_ACCOUNTS_STATUS_TO_SPRING,
  REQUEST_ACCOUNT_LIST_FOR_ADMIN_TO_SPRING,
  REQUEST_ACCOUNT_INFO_FOR_ADMIN_TO_SPRING,
  REQUEST_CATEGORY_ACCOUNT_LIST_TO_SPRING,
  REQUEST_ACCOUNT_WARNINGS_FOR_ADMIN_TO_SPRING
} from "./mutation-types";

import axiosInst from "@/utility/axiosInst";

export default {
  requestAccountsStatusToSpring({ commit }, targetDate) {
    const { date } = targetDate
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.get("/admin-account/check-account", {
      params: { date: date },
      headers: { Authorization: userToken }
    }).then((res) => {
      commit(REQUEST_ACCOUNTS_STATUS_TO_SPRING, res.data)
    })
  },

  requestAccountListForAdminToSpring({ commit }, payload) {
    const page = payload
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.get("/admin-account/account-list", {
      params: { page: page },
      headers: { Authorization: userToken }
    }).then((res) => {
      commit(REQUEST_ACCOUNT_LIST_FOR_ADMIN_TO_SPRING, res.data)
    })
  },

  requestCategoryAccountListToSpring({ commit }, payload) {
    const { warningCounts, page } = payload
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.post("/admin-account/account-warningCount-list",
      { warningCounts, page },
      { headers: { Authorization: userToken } })
      .then((res) => {
        commit(REQUEST_CATEGORY_ACCOUNT_LIST_TO_SPRING, res.data)
      })
  },

  requestAccountInfoForAdminToSpring({ commit }, selectedAccountId) {
    const accountId = selectedAccountId
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.get("/admin-account/account-detail", {
      params: { accountId: accountId },
      headers: { Authorization: userToken }
    }).then((res) => {
      commit(REQUEST_ACCOUNT_INFO_FOR_ADMIN_TO_SPRING, res.data)
    })
  },

  requestChangeBadNicknameToSpring({ }, accountId) {
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.get("/admin-account/change-nickname", {
      params: { accountId: accountId },
      headers: { Authorization: userToken }
    }).then((res) => {
    })
  },

  requestBlacklistAccountToSpring({ }, accountId) {
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.get("/admin-account/account-change-RoleType-blacklist", {
      params: { accountId: accountId },
      headers: { Authorization: userToken }
    }).then((res) => { })
  },

  requestRemoveBlacklistAccountToSpring({ }, accountId) {
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.get("/admin-account/account-change-RoleType-normal", {
      params: { accountId: accountId },
      headers: { Authorization: userToken }
    }).then((res) => { })
  },

  requestAccountWarningsForAdminToSpring({ commit }, accountId) {
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.get("/warning/search-by-account", {
      params: { accountId: accountId },
      headers: { Authorization: userToken }
    }).then((res) => {
      commit(REQUEST_ACCOUNT_WARNINGS_FOR_ADMIN_TO_SPRING, res.data)
    })
  },

  requestWarningToAccountToSpring({ }, payload) {
    const { reportedCategoryType, reportContent, reportedId } = payload
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.post("/warning/regist-warning",
      { reportedCategoryType, reportContent, reportedId },
      { headers: { Authorization: userToken } }).then((res) => { })
  },

  requestRemoveWarningToSpring({ }, warningId) {
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.delete("/warning/delete-warning",{
      params: { warningId: warningId },
      headers: { Authorization: userToken }
    }).then((res) => { })
  },

  requestSearchAccountListForAdminToSpring({ commit }, payload) {
    const { page, keyword } = payload
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.post("/admin-account/search-account",
      { page, keyword },
      { headers: { Authorization: userToken } })
      .then((res) => {
        commit(REQUEST_ACCOUNT_LIST_FOR_ADMIN_TO_SPRING, res.data)
      })
  },
  requestRemoveProfileImageToSpring({ }, accountId) {
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.get("/admin-account/change-profileImageName", {
      params: { accountId: accountId },
      headers: { Authorization: userToken }
    }).then((res) => { })
  },
}