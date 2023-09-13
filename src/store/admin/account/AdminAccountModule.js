import actions from "@/store/admin/account/actions";
import state from "@/store/admin/account/states";
import mutations from "@/store/admin/account/mutations";

const AdminAccountModule = {
  namespaced: true,
  actions,
  state,
  mutations,
};

export default AdminAccountModule;
