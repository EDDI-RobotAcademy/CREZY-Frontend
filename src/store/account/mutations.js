import {
    SET_ACCESS_TOKEN, SET_USER
} from './mutation-types'

export default {
    [SET_ACCESS_TOKEN] (state, receiveData) {
        state.accessToken = receiveData
    },
    [SET_USER] (state, receiveData) {
        state.user = receiveData
    },
   
}