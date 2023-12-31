import Vue from 'vue'

export const userKey = '__k4dev_user'
export const baseApiUrl = process.env.VUE_APP_ROOT_API

export function showError(error) {
    if (error && error.response && error.response.data) {
        Vue.toasted.global.defaultError({ msg: error.response.data })
    } else if (typeof error === 'string') {
        Vue.toasted.global.defaultError({ msg: error })
    } else {
        Vue.toasted.global.defaultError()
    }
}