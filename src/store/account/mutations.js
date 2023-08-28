import {

    REQUEST_ACCOUNT_TO_SPRING, SET_USER
} from './mutation-types'

export default {
    [SET_USER] (state, receiveData) {
        state.user = receiveData
    },
    [REQUEST_ACCOUNT_TO_SPRING](state, receivedData) {
        state.account = receivedData;
  },
   
}
