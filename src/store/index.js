import { createStore } from "vuex";

import MusicModule from "./music/MusicModule";

export default createStore({
  modules: {
    musicModule: MusicModule,
  },
});
