import actions from "@/store/music/actions";
import state from "@/store/music/states";
import mutations from "@/store/music/mutations";

const MusicModule = {
  namespaced: true,
  actions,
  state,
  mutations,
};

export default MusicModule;
