import actions from "@/store/song/actions";
import state from "@/store/song/states";
import mutations from "@/store/song/mutations";

const SongModule = {
  namespaced: true,
  actions,
  state,
  mutations,
};

export default SongModule;
