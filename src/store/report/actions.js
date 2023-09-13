import {

} from "./mutation-types"
import axiosInst from "@/utility/axiosInst"

export default {
  requestReportAccountAndPlaylistToSpring({ }, payload) {
    const { reportedCategoryType, reportContent, reportedId } = payload
    const userToken = localStorage.getItem("userToken")

    return axiosInst.springAxiosInst.post("/report/register-report", { reportedCategoryType, reportContent, reportedId }, { headers: { Authorization: userToken } })
      .then((res) => {
        return res.data
      })
  },
}