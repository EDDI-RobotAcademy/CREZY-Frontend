import actions from "@/store/playlist/actions";
import state from "@/store/playlist/states";
import mutations from "@/store/playlist/mutations";

const PlaylistModule = {
  namespaced: true,
  actions,
  state,
  mutations,
};

export default PlaylistModule;
