import {
  REQUEST_RECOMMENDATIONS_TO_SPRING,
  REMOVE_RECOMMENDATIONS
} from "./mutation-types"

export default {
  [REQUEST_RECOMMENDATIONS_TO_SPRING] (state, receivedData) {
    state.musicList = receivedData
  },
  [REMOVE_RECOMMENDATIONS] (state) {
    state.musicList = []
  }
}