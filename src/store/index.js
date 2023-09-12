import { createStore } from "vuex";

import MusicModule from "./music/MusicModule";
import PlaylistModule from "./playlist/PlaylistModule";
import AccountModule from "./account/AccountModule";
import SongModule from "./song/SongModule"
import ReportModule from "./report/ReportModule";
import InquiryModule from "./inquiry/InquiryModule"

import createPersistedState from 'vuex-persistedstate';

export default createStore({
  modules: {
    musicModule: MusicModule,
    playlistModule: PlaylistModule,
    accountModule: AccountModule,
    songModule: SongModule,
    reportModule: ReportModule,
    inquiryModule: InquiryModule,
  },
  plugins: [
    createPersistedState({
      paths: ['accountModule.isLoggedIn']
    })
  ]
});
