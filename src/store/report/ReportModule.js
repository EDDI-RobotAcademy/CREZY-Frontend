import mutations from "@/store/report/mutations"
import actions from "@/store/report/actions"
import state from "@/store/report/states"

const ReportModule = {
  namespaced: true,
  state,
  actions,
  mutations,
}

export default ReportModule