import { REQEUST_RECOMMENDATION_TO_FAST_API } from "./mutation-types";

import axiosInst from "@/utility/axiosInst";

export default {
  requestRecommendationToFastApi({ commit }, payload) {
    const { emotionKeyword } = payload;
    return axiosInst.fastApiAxiosInst
      .post("/music/getRecommendation", { emotionKeyword })
      .then((res) => {
        commit(REQEUST_RECOMMENDATION_TO_FAST_API, res.data);
      });
  },
};
