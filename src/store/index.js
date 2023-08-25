import { createStore } from "vuex";

import MusicModule from "./music/MusicModule";
import PlaylistModule from "./playlist/PlaylistModule";
import AccountModule from "./account/AccountModule";

export default createStore({
  modules: {
    musicModule: MusicModule,
    playlistModule: PlaylistModule,
    accountModule: AccountModule,
  },
});
