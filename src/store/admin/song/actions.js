import {
  REQUEST_SONG_INFO_FOR_ADMIN_TO_SPRING
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

  requestModifyLyricsToSpring({}, payload) {
    const { songId, lyrics } = payload
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.post("/admin-song/modify-lyrics", 
      { songId, lyrics },
      {headers: { Authorization: userToken }}
    ).then((res) => {})
  }
}