import {
  REQUEST_WEEK_BEHAVIOR_TO_STRING,
  REQUEST_WEEK_TRAFFIC_TO_STRING,
  REQUEST_DAILY_COUNT_TO_SPRING
} from "./mutation-types"

export default {
  [REQUEST_WEEK_BEHAVIOR_TO_STRING] (state, receivedData) {
    state.weeklyBehavior = receivedData
  },
  [REQUEST_WEEK_TRAFFIC_TO_STRING] (state, receivedData) {
    state.weeklyTraffic = receivedData
  },
  [REQUEST_DAILY_COUNT_TO_SPRING] (state, receivedData) {
    state.dailyStat = receivedData
  }
}