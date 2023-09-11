import AdminMainPage from "@/views/admin/AdminMainPage.vue"
import AdminOverallPlaylistPage from "@/views/admin/playlist/AdminOverallPlaylistPage.vue"
import AdminOverallAccountsPage from "@/views/admin/account/AdminOverallAccountsPage.vue"

const adminRoutes = [
  {
    path: "/admin",
    name: "AdminMainPage",
    component: AdminMainPage,
  },
  {
    path: "/admin/overall-playlist",
    name: "AdminOverallPlaylistPage",
    component: AdminOverallPlaylistPage,
  },
  {
    path: "/admin/overall-accounts",
    name: "AdminOverallAccountsPage",
    component: AdminOverallAccountsPage
  }
]

export default adminRoutes