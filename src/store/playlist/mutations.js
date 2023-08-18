import { REQUEST_PLAYLISTS_TO_SPRING } from "./mutation-types";

export default {
  [REQUEST_PLAYLISTS_TO_SPRING](state, receivedData) {
    state.playlists = receivedData;
  },
};
