import {
  REQUEST_ACCOUNT_WARNINGS_FOR_ADMIN_TO_SPRING
} from "./mutation-types"

import axiosInst from "@/utility/axiosInst"

export default {
  requestAccountWarningsForAdminToSpring({ commit }, accountId) {
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.get("/warning/search-by-account", {
      params: { accountId: accountId },
      headers: { Authorization: userToken }
    }).then((res) => {
      commit(REQUEST_ACCOUNT_WARNINGS_FOR_ADMIN_TO_SPRING, res.data)
    })
  },
    
  requestGiveWarningToSpring({ }, payload) {
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
}