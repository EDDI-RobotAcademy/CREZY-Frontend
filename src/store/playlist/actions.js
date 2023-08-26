import {
  REQUEST_PLAYLISTS_TO_SPRING,
  REQUEST_PLAYLIST_TO_SPRING,
  REQUEST_MY_PLAYLISTS_TO_SPRING,
  REQUEST_MY_LIKED_PLAYLISTS_TO_SPRING,
} from "./mutation-types";

import axiosInst from "@/utility/axiosInst";

export default {
  requestPlaylistsToSpring({ commit }) {
    return axiosInst.springAxiosInst.get("/playlist/list").then((res) => {
      commit(REQUEST_PLAYLISTS_TO_SPRING, res.data);
    });
  },
  requestPlaylistToSpring({ commit }, playlistId) {
    return axiosInst.springAxiosInst
      .get(`/playlist/${playlistId}`)
      .then((res) => {
        commit(REQUEST_PLAYLIST_TO_SPRING, res.data);
      });
  },
  requestMyPlaylistsToSpring({ commit }) {
    return axiosInst.springAxiosInst.get("/playlist/my-list").then((res) => {
      commit(REQUEST_MY_PLAYLISTS_TO_SPRING, res.data);
    });
  },
  requestMyLikedPlaylistsToSpring({ commit }) {
    return axiosInst.springAxiosInst.get("/playlist/liked-list").then((res) => {
      commit(REQUEST_MY_LIKED_PLAYLISTS_TO_SPRING, res.data);
    });
  },
  requestPlaylistModifyToSpring({ commit }, payload) {
    return axiosInst.springAxiosInst
      .post("/playlist/modify", payload)
      .then((res) => {
        commit(REQUEST_PLAYLIST_TO_SPRING, res.data);
      });
  },
  requestPlaylistDeleteToSpring(_, playlistId) {
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.delete(`/playlist/${playlistId}`, { headers: { Authorization: userToken } })
      .then((res) => {
        this.$router.push('/my-page')
      });
  },
  requestDeleteSelectedSongsToSpring({ commit }, payload) {
    const songlistId = payload
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.delete("/song/delete-songIds", { params: { songlistId: songlistId } }, { headers: { Authorization: userToken } }).then((res) => {
      commit(REQUEST_PLAYLIST_TO_SPRING, res.data);
    });
  },
};
