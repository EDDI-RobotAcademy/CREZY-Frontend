import {
  REQUEST_SONG_INFO_FOR_ADMIN_TO_SPRING,
  REQUEST_SONGLIST_FOR_ADMIN_TO_SPRING
} from './mutation-types'

export default {
  [REQUEST_SONG_INFO_FOR_ADMIN_TO_SPRING](state, receivedData) {
    state.songInfo = receivedData
  },
  [REQUEST_SONGLIST_FOR_ADMIN_TO_SPRING](state, receivedData) {
    state.songs = receivedData
  },
}