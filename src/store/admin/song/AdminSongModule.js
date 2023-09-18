import actions from "@/store/admin/song/actions";
import state from "@/store/admin/song/states";
import mutations from "@/store/admin/song/mutations";

const AdminSongModule = {
  namespaced: true,
  actions,
  state,
  mutations,
};

export default AdminSongModule;
