import PlaylistListPage from "@/views/playlist/PlaylistListPage.vue";
import PlaylistReadPage from "@/views/playlist/PlaylistReadPage.vue";
import PlaylistManagePage from "@/views/playlist/PlaylistManagePage.vue";

const playlistRoutes = [
  {
    path: "/playlist-list-page",
    name: "PlaylistListPage",
    component: PlaylistListPage,
  },
  {
    path: "/playlist-read-page/:id",
    name: "PlaylistReadPage",
    components: {
      default: PlaylistReadPage,
    },
    props: {
      default: true,
    },
  },
  {
    path: "/playlist-modify-page/:playlistId",
    name: "PlaylistManagePage",
    components: {
      default: PlaylistManagePage,
    },
    props: {
      default: true,
    },
  },
];

export default playlistRoutes;
