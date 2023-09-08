import AdminMainPage from "@/views/admin/AdminMainPage.vue"
import AdminOverallPlaylistPage from "@/views/admin/playlist/AdminOverallPlaylistPage.vue"

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
]

export default adminRoutes