import {
  REQUEST_REPORT_LIST_TO_SPRING,
  REQUEST_ACCOUNT_REPORT_DETAIL_TO_SPRING,
  REQUEST_PLAYLIST_REPORT_DETAIL_TO_SPRING,
  REQUEST_SONG_REPORT_DETAIL_TO_SPRING,
  REQUEST_REPORT_LIST_TOTAL_TO_SPRING
} from "./mutation-types"
import axiosInst from "@/utility/axiosInst"

export default {
  requestReportAccountAndPlaylistAndSongToSpring({ }, payload) {
    const { reportedCategoryType, reportContent, reportedId } = payload
    const userToken = localStorage.getItem("userToken")
    console.log(reportedId)

    return axiosInst.springAxiosInst.post("/report/register-report", { reportedCategoryType, reportContent, reportedId }, { headers: { Authorization: userToken } })
      .then((res) => {
        return res.data
      })
  },

  async requestReportListToSpring({ commit }, payload ) {
    const userToken = localStorage.getItem('userToken');
    const  page  = payload;
        return axiosInst.springAxiosInst.get(`/admin-report/list`,
        { 
          params: { page: page },
          headers: { Authorization: userToken } 
        }).then((res) => {
          commit(REQUEST_REPORT_LIST_TO_SPRING, res.data);
        });
  }, 

  async requestReportListTotalToSpring({ commit }, ) {
      return axiosInst.springAxiosInst.get(`/admin-report/list/total-page`,).then((res) => {
        commit(REQUEST_REPORT_LIST_TOTAL_TO_SPRING, res.data);
      });   
  }, 

  requestAccountReportDetailToSpring({ commit }, selectedReportId) {
    const userToken = localStorage.getItem('userToken');
    const reportId = selectedReportId;
        return axiosInst.springAxiosInst.get(`/admin-report/read-account-report?reportId=${reportId}`, { headers: { Authorization: userToken } }).then((res) => {
          commit(REQUEST_ACCOUNT_REPORT_DETAIL_TO_SPRING, res.data);
        });
  },
  requestPlaylistReportDetailToSpring({ commit }, selectedReportId) {
    const userToken = localStorage.getItem('userToken');
    const reportId = selectedReportId;
        return axiosInst.springAxiosInst.get(`/admin-report/read-playlist-report?reportId=${reportId}`, { headers: { Authorization: userToken } }).then((res) => {
          commit(REQUEST_PLAYLIST_REPORT_DETAIL_TO_SPRING, res.data);
        });
  },
  requestSongReportDetailToSpring({ commit }, selectedReportId) {
    const userToken = localStorage.getItem('userToken');
    const reportId = selectedReportId;
        return axiosInst.springAxiosInst.get(`/admin-report/read-song-report?reportId=${reportId}`, { headers: { Authorization: userToken } }).then((res) => {
          commit(REQUEST_SONG_REPORT_DETAIL_TO_SPRING, res.data);
        });
  },
  requestChangeReportStatusToSpring({}, payload) {
    const { reportId, reportStatus } = payload
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.post("/admin-report/processing",
      { reportId, reportStatus },
      { headers: { Authorization: userToken } })
      .then((res) => {})    
  },
 
}