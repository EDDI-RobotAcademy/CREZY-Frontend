import {
    SET_ACCESS_TOKEN
} from './mutation-types'

export default {
    [SET_ACCESS_TOKEN] (state, receiveData) {
        state.accessToken = receiveData
    },
   
}