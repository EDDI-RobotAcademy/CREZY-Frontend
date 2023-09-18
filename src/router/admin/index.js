import AdminMainPage from "@/views/admin/AdminMainPage.vue"
import AdminOverallPlaylistPage from "@/views/admin/playlist/AdminOverallPlaylistPage.vue"
import AdminOverallAccountsPage from "@/views/admin/account/AdminOverallAccountsPage.vue"
import AdminOverallReportsPage from "@/views/admin/report/AdminOverallReportsPage.vue"
import AdminOverallInquiriesPage from "@/views/admin/inquiry/AdminOverallInquiriesPage.vue"
import AdminParticularPlaylistPage from "@/views/admin/playlist/AdminParticularPlaylistDetailPage.vue"

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
  },
  {
    path: "/admin/overall-reports",
    name: "AdminOverallReportsPage",
    component: AdminOverallReportsPage
  },
  {
    path: "/admin/overall-inquiries",
    name: "AdminOverallInquiriesPage",
    component: AdminOverallInquiriesPage
  },
  {
    path: "/admin/particular-playlist/:selectedPlaylistId",
    name: "AdminParticularPlaylistPage",
    components: {
      default: AdminParticularPlaylistPage,
    },
    props: {
      default: true
    }
  },
]

export default adminRoutes