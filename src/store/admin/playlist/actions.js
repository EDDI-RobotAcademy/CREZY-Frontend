import {
  REQUEST_PLAYLISTS_STATUS_TO_SPRING,
  REQUEST_PLAYLISTS_FOR_ADMIN_TO_SPRING,
  REQUEST_PLAYLIST_FOR_ADMIN_TO_SPRING
} from "./mutation-types";

import axiosInst from "@/utility/axiosInst";

export default {
  requestPlaylistsStatusToSpring({ commit }, targetDate) {
    const { date } = targetDate
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.get("/admin-playlist/check-playlist", {
      params: { date: date },
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
      { headers: { Authorization: userToken } })
      .then((res) => {
        commit(REQUEST_PLAYLISTS_FOR_ADMIN_TO_SPRING, res.data)
        console.log(res.data.totalPages)
      })
  },
  requestPlaylistForAdminToSpring({ commit }, selectedPlaylistId) {
    const playlistId = selectedPlaylistId
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.get("/admin-playlist/read-playlist", {
      params: { playlistId: playlistId },
      headers: { Authorization: userToken }
    }).then((res) => {
      commit(REQUEST_PLAYLIST_FOR_ADMIN_TO_SPRING, res.data)
    })
  },
  requestRemovePlaylistThumbnailToSpring({ }, selectedPlaylistId) {
    const playlistId = selectedPlaylistId
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.get("/admin-playlist/change-playlistThumbnailName", {
      params: { playlistId: playlistId },
      headers: { Authorization: userToken }
    }).then((res) => { })
  },
  requestChangePlaylistNameToSpring({ }, selectedPlaylistId) {
    const playlistId = selectedPlaylistId
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.get("/admin-playlist/change-playlistName", {
      params: { playlistId: playlistId },
      headers: { Authorization: userToken }
    }).then((res) => { })
  },
  requestDeletePlaylistToSpring({ }, selectedPlaylistId) {
    const playlistId = selectedPlaylistId
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.delete("/admin-playlist/delete-playlist", {
      params: { playlistId: playlistId },
      headers: { Authorization: userToken }
    }).then((res) => { })
  },

  requestAccountPlaylistsToSpring({ commit }, payload) {
    const { accountId, page } = payload
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.post("/admin-account/account-playlist",
      { accountId, page },
      { headers: { Authorization: userToken } }
    ).then((res) => {
      commit(REQUEST_PLAYLISTS_FOR_ADMIN_TO_SPRING, res.data)
    })
  },
  requestSearchPlaylistsForAdminToSpring({ commit }, payload) {
    const { page, keyword } = payload
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.post("/admin-playlist/search-playlist",
      { page, keyword },
      { headers: { Authorization: userToken } })
      .then((res) => {
        commit(REQUEST_PLAYLISTS_FOR_ADMIN_TO_SPRING, res.data)
      })
  }
}