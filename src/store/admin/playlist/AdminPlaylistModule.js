import actions from "@/store/admin/playlist/actions";
import state from "@/store/admin/playlist/states";
import mutations from "@/store/admin/playlist/mutations";

const AdminPlaylistModule = {
  namespaced: true,
  actions,
  state,
  mutations,
};

export default AdminPlaylistModule;
