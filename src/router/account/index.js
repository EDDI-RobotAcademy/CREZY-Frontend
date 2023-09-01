import AccountLoginPage from "@/views/account/AccountLoginPage.vue";
import GoogleRedirectPage from "@/views/account/oauth/GoogleRedirectPage.vue";
import MyPage from "@/views/account/MyPage.vue";
import KakaoRedirectPage from "@/views/account/oauth/KakaoRedirectPage.vue";
import NaverRedirectPage from "@/views/account/oauth/NaverRedirectPage.vue"
import AccountModifyPage from "@/views/account/AccountModifyPage.vue";

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
  {
    path: "/login/oauth2/code/naver",
    name: "NaverRedirectPage",
    component: NaverRedirectPage,
  },
  {
    path: "/account-modify-page/:accountId",
    name: "AccountModifyPage",
    components: {
      default: AccountModifyPage,
    },
    props: {
      default: true,
    },
  },
];

export default accountRoutes;
