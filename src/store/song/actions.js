import {
  REQUEST_RECOMMENDATIONS_TO_SPRING
} from "./mutation-types";

import axiosInst from "@/utility/axiosInst";

export default {
  requestDeleteSelectedSongsToSpring({ }, payload) {
    const songlistId = payload
    const userToken = localStorage.getItem("userToken")
    console.log(userToken)
    return axiosInst.springAxiosInst.delete("/song/delete-songIds", { headers: { authorization: userToken }, params: { songlistId } })
      .then((res) => {
      });
  },
  async requestSongRegisterToSpring(_, payload) {
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.post("/song/register", payload, { headers: { Authorization: userToken } })
      .then((res) => {
        return res.data
      });
  },

  requestRecommendationToSpring({ commit }, payload) {
    const sentence = payload
    return axiosInst.springAxiosInst.get("/emotion/analysis", { params: { sentence: sentence } })
      .then((res) => {
        commit(REQUEST_RECOMMENDATIONS_TO_SPRING, res.data)
      })
  } 
};
