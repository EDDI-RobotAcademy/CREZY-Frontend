
import {
  REQUEST_ACCOUNT_TO_SPRING,
  SET_ACCOUNT,
  SET_LOGGED_IN
} from "./mutation-types";
import axiosInst from '@/utility/axiosInst'

export default {
  requestAccountInfoToSpring({ commit }) {
    const userToken = localStorage.getItem("userToken")

    return axiosInst.springAxiosInst.get('account/info', { headers: { Authorization: userToken } })
      .then((res) => {
        commit(REQUEST_ACCOUNT_TO_SPRING, res.data);
        console.log(res.data)
      })
  },

  async requestGoogleOauthRedirectUrlToSpring() {
    return axiosInst.springAxiosInst.get('/oauth/google')
      .then(res => {
        window.location.href = res.data
      })
  },
  async requestUserInfoGoogleToSpring(context, code) {
    return axiosInst.springAxiosInst.get("/oauth/google-login", { params: { code: code } })
      .then(async (res) => {
        await context.commit(SET_ACCOUNT, res.data)
        localStorage.setItem("userToken", res.data.userToken)

        await context.commit(SET_LOGGED_IN, true);
      })
  },

  async requestUserLogoutToSpring(context, code) {
    const userToken = localStorage.getItem("userToken")
    return axiosInst.springAxiosInst.get("/account/logout", { params: { userToken: userToken } })
      .then(async (res) => {
        await context.commit(SET_LOGGED_IN, false);
      })
  },

  async requestKakaoOauthRedirectUrlToSpring() {
    return axiosInst.springAxiosInst.get('/oauth/kakao')
      .then(res => {
        window.location.href = res.data
      })
  },
  async requestUserInfoKakaoToSpring(context, code) {
    return axiosInst.springAxiosInst.get("/oauth/kakao-login", { params: { code: code } })
      .then(async (res) => {
        await context.commit(SET_ACCOUNT, res.data)
        localStorage.setItem("userToken", res.data.userToken)
      })
  },
}