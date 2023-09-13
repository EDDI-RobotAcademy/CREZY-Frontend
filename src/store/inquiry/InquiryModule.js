import actions from "@/store/inquiry/actions";
import state from "@/store/inquiry/states";
import mutations from "@/store/inquiry/mutations";

const InquiryModule = {
  namespaced: true,
  actions,
  state,
  mutations,
};

export default InquiryModule;
