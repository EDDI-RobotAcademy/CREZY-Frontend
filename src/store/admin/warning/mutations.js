import {
  REQUEST_ACCOUNT_WARNINGS_FOR_ADMIN_TO_SPRING
} from "./mutation-types"

export default {
  [REQUEST_ACCOUNT_WARNINGS_FOR_ADMIN_TO_SPRING](state, receivedData) {
    state.warnings = receivedData
  }
}