import AccountLoginPage from "@/views/account/AccountLoginPage.vue";
import GoogleRedirectPage from "@/views/account/oauth/GoogleRedirectPage.vue";

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
];

export default accountRoutes;
