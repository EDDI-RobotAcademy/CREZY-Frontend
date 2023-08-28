import {
    SET_USER
} from './mutation-types'

export default {
    [SET_USER] (state, receiveData) {
        state.user = receiveData
    },
   
}