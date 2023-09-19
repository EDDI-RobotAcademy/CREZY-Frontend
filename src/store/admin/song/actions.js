import {
  REQUEST_SONG_INFO_FOR_ADMIN_TO_SPRING,
  REQUEST_SONGLIST_FOR_ADMIN_TO_SPRING,
  DELETE_SONG_FROM_STATE
} from './mutation-types'

import axiosInst from '@/utility/axiosInst'

export default {
  requestSongInfoForAdminToSpring({ commit }, selectedSongId) {
    const songId = selectedSongId
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.get("/admin-song/read-song", {
      params: { songId: songId },
      headers: { Authorization: userToken }
    }).then((res) => {
      commit(REQUEST_SONG_INFO_FOR_ADMIN_TO_SPRING, res.data)
    })
  },
  requestSongListForAdminToSpring({ commit }, payload) {
    const { songStatusType, sortType, page } = payload
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.post("/admin-song/song-list",
      { songStatusType, sortType, page },
      { headers: { Authorization: userToken } })
      .then((res) => {
        commit(REQUEST_SONGLIST_FOR_ADMIN_TO_SPRING, res.data)
        console.log(res.data.totalPages)
      })
  },

  requestModifyLyricsToSpring({}, payload) {
    const { songId, lyrics } = payload
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.post("/admin-song/modify-lyrics", 
      { songId, lyrics },
      {headers: { Authorization: userToken }}
    ).then((res) => {})
  },

  requestDeleteSongToSpring({}, selectedSongId) {
    const songId = selectedSongId
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.delete("/admin-song/delete-song", {
      params: { songId: songId },
      headers: { Authorization: userToken }
    }).then((res) => {})
  },

  requestOpenSongToSpring({}, selectedSongId) {
    const songId = selectedSongId
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.get("/admin-song/register-song-status-open", {
      params: { songId: songId },
      headers: { Authorization: userToken }
    }).then((res) => {})
  },

  requestBlockSongToSpring({}, selectedSongId) {
    const songId = selectedSongId
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.get("/admin-song/register-song-status-block", {
      params: { songId: songId },
      headers: { Authorization: userToken }
    }).then((res) => {})
  },

  removeSongFromState({commit}) {
    return commit(DELETE_SONG_FROM_STATE)
  }
}