import {
  REQUEST_PLAYLISTS_STATUS_TO_SPRING,
  REQUEST_PLAYLISTS_FOR_ADMIN_TO_SPRING,
} from "./mutation-types";

import axiosInst from "@/utility/axiosInst";

export default {
  requestPlaylistsStatusToSpring({ commit }, targetDate) {
    const { date } = targetDate
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.get("/admin-playlist/check-playlist", { 
        params: { date: date } , 
        headers: { Authorization: userToken }
    }).then((res) => {
        commit(REQUEST_PLAYLISTS_STATUS_TO_SPRING, res.data)
    })
  },

  requestPlaylistsForAdminToSpring({ commit }, payload) {
    const { sortType, page } = payload
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.post("/admin-playlist/playlist-recent-list", 
      { sortType, page },
      { headers: { Authorization: userToken }})
      .then((res) => {
        commit(REQUEST_PLAYLISTS_FOR_ADMIN_TO_SPRING, res.data)
        console.log(res.data.totalPages)
      })
  }
}