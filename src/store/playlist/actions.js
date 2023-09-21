import {
  REQUEST_PLAYLISTS_TO_SPRING,
  REQUEST_PLAYLIST_TO_SPRING,
  REQUEST_MY_PLAYLISTS_TO_SPRING,
  REQUEST_MY_LIKED_PLAYLISTS_TO_SPRING,
} from "./mutation-types";

import axiosInst from "@/utility/axiosInst";

export default {
  requestPlaylistsToSpring({ commit }, payload) {
    const { page, sortType } = payload
    return axiosInst.springAxiosInst.post("/playlist/list", { page, sortType }).then((res) => {
      commit(REQUEST_PLAYLISTS_TO_SPRING, res.data);
    });
  },
  requestPlaylistExceptBlockSongToSpring({ commit }, playlistId) {
    return axiosInst.springAxiosInst
      .get(`/playlist/playlists/${playlistId}`)
      .then((res) => {
        commit(REQUEST_PLAYLIST_TO_SPRING, res.data);
        return res.data.likes;
      });
  },
  requestPlaylistIncludeBlockSongToSpring({ commit }, playlistId) {
    return axiosInst.springAxiosInst
      .get(`/playlist/MyPage/${playlistId}`)
      .then((res) => {
        commit(REQUEST_PLAYLIST_TO_SPRING, res.data);
        return res.data.likes;
      });
  },
  requestMyPlaylistsToSpring({ commit }) {
    const userToken = localStorage.getItem("userToken")

    return axiosInst.springAxiosInst.get("/playlist/my-playlist", { headers: { Authorization: userToken } })
      .then((res) => {
        commit(REQUEST_MY_PLAYLISTS_TO_SPRING, res.data);
      });
  },
  requestMyLikedPlaylistsToSpring({ commit }) {
    const userToken = localStorage.getItem("userToken")

    return axiosInst.springAxiosInst.get("/likePlaylist/my-liked-playlist", { headers: { Authorization: userToken } })
      .then((res) => {
        commit(REQUEST_MY_LIKED_PLAYLISTS_TO_SPRING, res.data);
      });
  },
  requestPlaylistModifyToSpring({ commit }, payload) {
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst
      .post("/playlist/modify", payload, { headers: { Authorization: userToken } })
      .then((res) => {
        commit(REQUEST_PLAYLIST_TO_SPRING, res.data);
      });
  },
  requestPlaylistDeleteToSpring(_, playlistId) {
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.delete(`/playlist/${playlistId}`, { headers: { Authorization: userToken } })
  },
  requestDeleteSelectedSongsToSpring({ commit }, payload) {
    const songlistId = payload
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.delete("/song/delete-songIds", { params: { songlistId: songlistId } }, { headers: { Authorization: userToken } }).then((res) => {
      commit(REQUEST_PLAYLIST_TO_SPRING, res.data);
    });
  },
  async requestPlaylistRegisterToSpring({ }, payload) {
    const { playlistName, thumbnailName } = payload
    const userToken = localStorage.getItem("userToken")

    return axiosInst.springAxiosInst.post("/playlist/register", { playlistName, thumbnailName }, { headers: { Authorization: userToken } })
      .then((res) => {
        return res.data
      });
  },
  checkIsPlaylistLikedToSpring({ }, playlistId) {
    const userToken = localStorage.getItem("userToken")

    return axiosInst.springAxiosInst.post(`/likePlaylist/check-liked/${playlistId}`, { playlistId }, { headers: { Authorization: userToken } })
      .then((res) => {
        return res.data
      })
  },
  requestLikePlaylistToSpring({ }, playlistId) {
    const userToken = localStorage.getItem("userToken")

    return axiosInst.springAxiosInst.post(`/likePlaylist/like-playlist/${playlistId}`, { playlistId }, { headers: { Authorization: userToken } })
      .then((res) => {
        return res.data
      })
  },
  requestUnlikePlaylistToSpring({ }, playlistId) {
    const userToken = localStorage.getItem("userToken")

    return axiosInst.springAxiosInst.post(`/likePlaylist/unlike-playlist/${playlistId}`, { playlistId }, { headers: { Authorization: userToken } })
      .then((res) => {
        return res.data
      })
  },
};