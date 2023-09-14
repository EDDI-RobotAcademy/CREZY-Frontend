import {
  REQUEST_REPORTLIST_TO_SPRING
} from "./mutation-types"
import axiosInst from "@/utility/axiosInst"

export default {
  requestReportAccountAndPlaylistToSpring({ }, payload) {
    const { reportedCategoryType, reportContent, reportedPlaylistId } = payload
    const userToken = localStorage.getItem("userToken")
    console.log(reportedPlaylistId)

    return axiosInst.springAxiosInst.post("/report/register-report", { reportedCategoryType, reportContent, reportedPlaylistId }, { headers: { Authorization: userToken } })
      .then((res) => {
        return res.data
      })
  },

  async requestReportListToSpring({ commit }, payload = {}) {
    const userToken = localStorage.getItem('userToken');
    const { pageNum = 1 } = payload;
        return axiosInst.springAxiosInst.get(`/report/list?page=${pageNum}`, { headers: { Authorization: userToken } }).then((res) => {
          commit(REQUEST_REPORTLIST_TO_SPRING, res.data);
        });
  },
}