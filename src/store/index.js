import { createStore } from "vuex";

import MusicModule from "./music/MusicModule";
import PlaylistModule from "./playlist/PlaylistModule";

export default createStore({
  modules: {
    musicModule: MusicModule,
    playlistModule: PlaylistModule,
  },
});
