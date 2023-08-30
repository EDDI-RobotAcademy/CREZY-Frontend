
import {
  REQUEST_ACCOUNT_TO_SPRING,
} from "./mutation-types";
import axiosInst from '@/utility/axiosInst'
import { SET_ACCOUNT } from "@/store/account/mutation-types";

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
        router.push({ name: 'Home' });
      })
  },
}