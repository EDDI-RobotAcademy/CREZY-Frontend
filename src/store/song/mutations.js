import {
  REQUEST_RECOMMENDATIONS_TO_SPRING
} from "./mutation-types"

export default {
  [REQUEST_RECOMMENDATIONS_TO_SPRING] (state, receivedData) {
    state.musicList = receivedData
  }
}