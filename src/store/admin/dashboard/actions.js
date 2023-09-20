import {
  REQUEST_WEEK_BEHAVIOR_TO_STRING,
  REQUEST_WEEK_TRAFFIC_TO_STRING,
  REQUEST_DAILY_COUNT_TO_SPRING
} from "./mutation-types"

import axiosInst from "@/utility/axiosInst"

export default {
  requestWeekBehaviorToSpring({ commit }, value) {
    const weekValue = value
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.get("/traffic/weekly-regist", {
      params: { weekValue: weekValue },
      headers: { Authorization: userToken }
    }).then((res) => {
      commit(REQUEST_WEEK_BEHAVIOR_TO_STRING, res.data)
    })
  },

  requestWeekTrafficToSpring({ commit }, value) {
    const weekValue = value
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.get("/traffic/week-count", {
      params: { weekValue: weekValue },
      headers: { Authorization: userToken }
    }).then((res) => {
      commit(REQUEST_WEEK_TRAFFIC_TO_STRING, res.data)
    })
  },

  requestDailyStatToSpring({ commit }) {
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.get("/traffic/today-count", {
      headers: { Authorization: userToken }
    }).then((res) => {
      commit(REQUEST_DAILY_COUNT_TO_SPRING, res.data)
    })
  }
}