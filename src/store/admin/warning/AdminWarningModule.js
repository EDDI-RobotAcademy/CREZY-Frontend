import actions from "@/store/admin/warning/actions";
import state from "@/store/admin/warning/states";
import mutations from "@/store/admin/warning/mutations";

const AdminWarningModule = {
  namespaced: true,
  actions,
  state,
  mutations,
};

export default AdminWarningModule;
