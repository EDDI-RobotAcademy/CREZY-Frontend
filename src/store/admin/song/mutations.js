import {
  REQUEST_SONG_INFO_FOR_ADMIN_TO_SPRING,
  REQUEST_SONG_LIST_FOR_ADMIN_TO_SPRING,
  DELETE_SONG_FROM_STATE,
  REQUEST_SONGS_STATUS_TO_SPRING,
} from './mutation-types'

export default {
  [REQUEST_SONG_INFO_FOR_ADMIN_TO_SPRING](state, receivedData) {
    state.songInfo = receivedData
  },
  [REQUEST_SONG_LIST_FOR_ADMIN_TO_SPRING](state, receivedData) {
    state.songs = receivedData.content
    state.songListCount = receivedData.totalPages
  },
  [DELETE_SONG_FROM_STATE](state) {
    state.songInfo = {}
  },
  [REQUEST_SONGS_STATUS_TO_SPRING](state, receivedData) {
    state.songsStatus = receivedData
  },
}