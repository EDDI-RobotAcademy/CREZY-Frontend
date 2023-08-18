import { REQUEST_PLAYLISTS_TO_SPRING } from "./mutation-types";

import axiosInst from "@/utility/axiosInst";

export default {
  requestPlaylistsToSpring({ commit }) {
    return axiosInst.springAxiosInst.get("/playlist/list").then((res) => {
      commit(REQUEST_PLAYLISTS_TO_SPRING, res.data);
    });
  },
};
