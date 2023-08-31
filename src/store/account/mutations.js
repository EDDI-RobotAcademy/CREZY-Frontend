import {
    REQUEST_ACCOUNT_TO_SPRING, SET_ACCOUNT, SET_LOGGED_IN
} from './mutation-types'

export default {
    [SET_ACCOUNT](state, receiveData) {
        state.account = receiveData
    },
    [REQUEST_ACCOUNT_TO_SPRING](state, receivedData) {
        state.account = receivedData;
    },
    [SET_LOGGED_IN](state, receiveData) {
        state.isLoggedIn = receiveData;
    }

}
