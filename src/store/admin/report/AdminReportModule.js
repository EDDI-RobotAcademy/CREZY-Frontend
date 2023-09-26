import mutations from "@/store/admin/report/mutations"
import actions from "@/store/admin/report/actions"
import state from "@/store/admin/report/states"

const AdminReportModule = {
  namespaced: true,
  state,
  actions,
  mutations,
}

export default AdminReportModule