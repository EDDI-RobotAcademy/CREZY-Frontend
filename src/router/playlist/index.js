import PlaylistListPage from "@/views/playlist/PlaylistListPage.vue";
import PlaylistReadPage from "@/views/playlist/PlaylistReadPage.vue";

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
];

export default playlistRoutes;
