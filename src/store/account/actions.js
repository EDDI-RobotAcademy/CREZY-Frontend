import axiosInst from '@/utility/axiosInst'
import { SET_ACCESS_TOKEN } from "@/store/account/mutation-types";


export default {
    
    async requestGoogleOauthRedirectUrlToSpring() {
        return axiosInst.springAxiosInst.get('/oauth/google')
          .then(res=> {
              window.location.href=res.data
          })
    },

    async requestOauthGoogleToSpring(context, code) {
        return axiosInst.springAxiosInst.get("/oauth/google-login", {params: {code: code}})
          .then(async (res)=> {
              console.log(res.data)
              await context.commit(SET_ACCESS_TOKEN, res.data)
            
          })
    },
   
}