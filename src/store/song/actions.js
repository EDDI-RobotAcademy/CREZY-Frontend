import axiosInst from "@/utility/axiosInst";

export default {
  requestDeleteSelectedSongsToSpring({ commit }, payload) {
    const songlistId = payload
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.delete("/song/delete-songIds", { params: songlistId, paramsSerializer: params => { return qs.stringify(params, { arrayFormat: 'brackets' }) } },
      { headers: { Authorization: userToken } }).then((res) => {
        commit(REQUEST_PLAYLIST_TO_SPRING, res.data);
      });
  },
  async requestSongRegisterToSpring(_, payload) {
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.post("/song/register", payload, { headers: { Authorization: userToken } })
      .then((res) => {
      });
  },
};
