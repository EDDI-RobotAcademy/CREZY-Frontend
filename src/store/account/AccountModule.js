import actions from "@/store/account/actions";
import state from "@/store/account/states";
import mutations from "@/store/account/mutations";

const AccountModule = {
  namespaced: true,
  actions,
  state,
  mutations,
};

export default AccountModule;
