import {
  REQUEST_SONG_INFO_FOR_ADMIN_TO_SPRING,
  DELETE_SONG_FROM_STATE
} from './mutation-types'

export default {
  [REQUEST_SONG_INFO_FOR_ADMIN_TO_SPRING] (state, receivedData) {
    state.songInfo = receivedData
  },
  [DELETE_SONG_FROM_STATE] (state) {
    state.songInfo = {}
  }
}