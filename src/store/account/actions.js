import {
  REQUEST_ACCOUNT_TO_SPRING,
} from "./mutation-types";

import axiosInst from "@/utility/axiosInst";

export default {
  requestAccountToSpring({ commit }, payload) {
    const { userToken } = payload
    return axiosInst.springAxiosInst.post('account/info', { userToken })
      .then((resAccount) => {
        console.log("회원 정보: " + JSON.stringify(resAccount.data));
        commit(REQUEST_ACCOUNT_TO_SPRING, resAccount.data);
      })
  },
};
