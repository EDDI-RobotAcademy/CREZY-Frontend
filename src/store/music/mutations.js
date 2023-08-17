import { REQEUST_RECOMMENDATION_TO_FAST_API } from "./mutation-types";

export default {
  [REQEUST_RECOMMENDATION_TO_FAST_API](state, receivedData) {
    state.musicList = receivedData;
  },
};
