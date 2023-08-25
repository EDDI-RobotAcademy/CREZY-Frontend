import {
  REQUEST_PLAYLISTS_TO_SPRING,
  REQUEST_PLAYLIST_TO_SPRING,
  REQUEST_MY_PLAYLISTS_TO_SPRING,
  REQUEST_MY_LIKED_PLAYLISTS_TO_SPRING,
} from "./mutation-types";

export default {
  [REQUEST_PLAYLISTS_TO_SPRING](state, receivedData) {
    state.playlists = receivedData;
  },
  [REQUEST_PLAYLIST_TO_SPRING](state, receivedData) {
    state.playlist = receivedData;
  },
  [REQUEST_MY_PLAYLISTS_TO_SPRING](state, receivedData) {
    state.myPlaylists = receivedData;
  },
  [REQUEST_MY_LIKED_PLAYLISTS_TO_SPRING](state, receivedData) {
    state.myLikedPlaylists = receivedData;
  },
};
