import {
  REQUEST_ACCOUNT_TO_SPRING,
  SET_ACCOUNT,
  SET_LOGGED_IN,
} from "./mutation-types";
import axiosInst from "@/utility/axiosInst";

export default {
  requestAccountInfoToSpring({ commit }) {
    const userToken = localStorage.getItem("userToken");

    return axiosInst.springAxiosInst
      .get("account/info", { headers: { Authorization: userToken } })
      .then((res) => {
        commit(REQUEST_ACCOUNT_TO_SPRING, res.data);
        console.log(res.data);
      });
  },

  async requestGoogleOauthRedirectUrlToSpring() {
    return axiosInst.springAxiosInst.get("/oauth/google").then((res) => {
      window.location.href = res.data;
    });
  },

  // 신규 유저 로그인 요청. 코드, 닉네임, 프로필이미지네임 3가지를 받아온다
  async requestUserInfoGoogleToSpring(context, payload) {
    const { code, nickname, profileImageName } = payload;

    // code를 쿼리 파라미터로 추가
    const reqForm = {
      nickname,
      profileImageName,
    };

    return axiosInst.springAxiosInst
      .post(`/oauth/google-new-login?code=${code}`, reqForm)
      .then(async (res) => {
        await context.commit(SET_ACCOUNT, res.data);
        localStorage.setItem("userToken", res.data.userToken);
        await context.commit(SET_LOGGED_IN, true);
      });
  },

  // 기존 유저 로그인 요청. 코드만을 받아온다
  async requestExistUserInfoGoogleToSpring(context, payload) {
    const { code } = payload;
    console.log(code);
    return axiosInst.springAxiosInst
      .get("/oauth/google-login", { params: { code: code } })
      .then(async (res) => {
        await context.commit(SET_ACCOUNT, res.data);
        localStorage.setItem("userToken", res.data.userToken);

        await context.commit(SET_LOGGED_IN, true);
      });
  },

  async requestUserLogoutToSpring(context, code) {
    const userToken = localStorage.getItem("userToken");
    return axiosInst.springAxiosInst
      .get("/account/logout", { params: { userToken: userToken } })
      .then(async (res) => {
        await context.commit(SET_LOGGED_IN, false);
      });
  },

  async requestKakaoOauthRedirectUrlToSpring() {
    return axiosInst.springAxiosInst.get("/oauth/kakao").then((res) => {
      window.location.href = res.data;
    });
  },
  async requestUserInfoKakaoToSpring(context, code) {
    return axiosInst.springAxiosInst
      .get("/oauth/kakao-login", { params: { code: code } })
      .then(async (res) => {
        await context.commit(SET_ACCOUNT, res.data);
        localStorage.setItem("userToken", res.data.userToken);

        await context.commit(SET_LOGGED_IN, true);
      });
  },

  async requestNaverOauthRedirectUrlToSpring() {
    return axiosInst.springAxiosInst.get("/oauth/naver").then((res) => {
      window.location.href = res.data;
    });
  },
  async requestUserInfoNaverToSpring(context, code) {
    return axiosInst.springAxiosInst
      .get("/oauth/naver-login", { params: { code: code } })
      .then(async (res) => {
        await context.commit(SET_ACCOUNT, res.data);
        localStorage.setItem("userToken", res.data.userToken);

        await context.commit(SET_LOGGED_IN, true);
      });
  },

  requestCheckNicknameToSpring({}, payload) {
    const { newNickname } = payload;
    return axiosInst.springAxiosInst
      .get(`/account/check-nickName/${newNickname}`)
      .then((res) => {
        if (res.data) {
          alert("사용 가능한 닉네임입니다!");
          return true;
        } else {
          alert("중복된 닉네임입니다!");
          return false;
        }
      });
  },
  async requestChangeNicknameToSpring({}, payload) {
    const userToken = localStorage.getItem("userToken");
    const { newNickname } = payload;

    return axiosInst.springAxiosInst
      .get(
        `/account/change-nickname?userToken=${userToken}&nickname=${newNickname}`
      )
      .then((res) => {
        console.log(res.data);
      });
  },

  async requestChangeProfileImageToSpring({}, payload) {
    const userToken = localStorage.getItem("userToken");
    const { newProfileImageName } = payload;

    return axiosInst.springAxiosInst
      .get("/account/change-profileImage", {
        headers: { Authorization: userToken },
        params: { profileImageName: newProfileImageName },
      })
      .then((res) => {
        console.log(res.data);
      });
  },

  // 로그인이전 사용 코드를 이용 기존회원인지, 신규회원인지를 판별한다.
  async requestCheckGoogleEmailToSpring({}, checkPayload) {
    const { code } = checkPayload;
    return axiosInst.springAxiosInst
      .get("/oauth/google-check-exist", { params: { code: code } })
      .then((res) => {
        if (res.data) {
          return true;
        } else {
          return false;
        }
      });
  },
  
};
