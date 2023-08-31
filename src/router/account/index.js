import AccountLoginPage from "@/views/account/AccountLoginPage.vue";
import GoogleRedirectPage from "@/views/account/oauth/GoogleRedirectPage.vue";
import MyPage from "@/views/account/MyPage.vue";
import KakaoRedirectPage from "@/views/account/oauth/KakaoRedirectPage.vue";

const accountRoutes = [
  {
    path: "/account-login-page",
    name: "AccountLoginPage",
    component: AccountLoginPage,
  },
  {
    path: "/login/oauth2/code/google",
    name: "GoogleRedirectPage",
    component: GoogleRedirectPage,
  },
  {
    path: "/my-page",
    name: "MyPage",
    component: MyPage,
  },
  {
    path: "/login/oauth2/code/kakao",
    name: "KakaoRedirectPage",
    component: KakaoRedirectPage,
  },
];

export default accountRoutes;
