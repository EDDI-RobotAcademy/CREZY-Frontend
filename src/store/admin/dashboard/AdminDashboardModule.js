import mutations from "@/store/admin/dashboard/mutations"
import actions from "@/store/admin/dashboard/actions"
import state from "@/store/admin/dashboard/states"


const AdminDashboardModule = {
    namespaced: true,
    state,
    actions,
    mutations
}


export default AdminDashboardModule
