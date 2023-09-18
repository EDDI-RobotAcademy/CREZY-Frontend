import actions from "@/store/admin/inquiry/actions";
import state from "@/store/admin/inquiry/states";
import mutations from "@/store/admin/inquiry/mutations";

const AdminInquiryModule = {
  namespaced: true,
  actions,
  state,
  mutations,
};

export default AdminInquiryModule;
