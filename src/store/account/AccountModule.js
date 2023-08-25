import mutations from "@/store/account/mutations"
import actions from "@/store/account/actions"
import state from "@/store/account/states"


const AccountModule = {
    namespaced: true,
    state,
    actions,
    mutations
}


export default AccountModule