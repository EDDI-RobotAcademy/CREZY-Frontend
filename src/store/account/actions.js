
import {
  REQUEST_ACCOUNT_TO_SPRING,
} from "./mutation-types";
import axiosInst from '@/utility/axiosInst'
import { SET_ACCOUNT } from "@/store/account/mutation-types";


export default {
    
    async requestGoogleOauthRedirectUrlToSpring() {
        return axiosInst.springAxiosInst.get('/oauth/google')
          .then(res=> {
              window.location.href=res.data
          })
    },

    async requestUserInfoGoogleToSpring(context, code) {
        return axiosInst.springAxiosInst.get("/oauth/google-login", {params: {code: code}})
          .then(async (res)=> {
              console.log(res.data)
              await context.commit(SET_ACCOUNT, res.data)
            
          })
    },
  
  requestAccountToSpring({ commit }, payload) {
    const { userToken } = payload
    return axiosInst.springAxiosInst.post('account/info', { userToken })
      .then((resAccount) => {
        console.log("회원 정보: " + JSON.stringify(resAccount.data));
        commit(REQUEST_ACCOUNT_TO_SPRING, resAccount.data);
      })
  },
   
}
