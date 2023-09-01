import { createStore } from "vuex";

import MusicModule from "./music/MusicModule";
import PlaylistModule from "./playlist/PlaylistModule";
import AccountModule from "./account/AccountModule";
import SongModule from "./song/SongModule"

import createPersistedState from 'vuex-persistedstate';

export default createStore({
  modules: {
    musicModule: MusicModule,
    playlistModule: PlaylistModule,
    accountModule: AccountModule,
    songModule: SongModule
  },
  plugins: [
    createPersistedState({
      paths: ['accountModule.isLoggedIn']
    })
  ]
});
