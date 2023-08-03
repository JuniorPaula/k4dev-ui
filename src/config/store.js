import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex)

export default new vuex.Store({
    state: {
        isMenuVisible: true,
        user: {
            name: 'Usuário Mock',
            email: 'mock@k4dev.com'
        }
    },
    mutations: {
        toggleMenu(state, isVisible) {
            if (isVisible === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = isVisible
            }
        }

    }
})