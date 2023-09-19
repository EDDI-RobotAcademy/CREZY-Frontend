import {
  REQUEST_PLAYLISTS_STATUS_TO_SPRING,
  REQUEST_PLAYLISTS_FOR_ADMIN_TO_SPRING,
  REQUEST_PLAYLIST_FOR_ADMIN_TO_SPRING,
} from "./mutation-types";

export default {
  [REQUEST_PLAYLISTS_STATUS_TO_SPRING](state, receivedData) {
    state.playlistsStatus = receivedData;
  },
  [REQUEST_PLAYLISTS_FOR_ADMIN_TO_SPRING] (state, receivedData) {
    state.playlists = receivedData.content
    state.playlistListCount = receivedData.totalPages
  },
  [REQUEST_PLAYLIST_FOR_ADMIN_TO_SPRING] (state, receivedData) {
    state.playlist = receivedData
  }
};
