<template>
	<div id="app" :class="{ 'hide-menu': !isMenuVisible || !user }">
		<Header title="K4Dev - Base de conhecimento" :hideToggle="!user" :hideUserDropdown="!user" />
		<Menu v-if="user" />
		<Loading v-if="validatingToken" />
		<Content v-else />
		<Footer />
	</div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import { baseApiUrl, userKey } from './global'

import Menu from './components/templates/Menu.vue'
import Header from './components/templates/Header.vue'
import Content from './components/templates/Content.vue'
import Footer from './components/templates/Footer.vue'
import Loading from './components/templates/Loading.vue'


export default {
	name: "App",
	components: {
		Menu,
		Header,
		Content,
		Footer,
		Loading
	},
	computed: mapState(['isMenuVisible', 'user']),
	data: function () {
		return {
			validatingToken: true
		}
	},
	methods: {
		async validateToken() {
			this.validatingToken = true
			const userData = JSON.parse(localStorage.getItem(userKey))
			this.$store.commit('setUser', null)

			if (!userData) {
				this.validatingToken = false
				this.$router.push({ name: 'auth' })
				return
			}

			const res = await axios.post(`${baseApiUrl}/validateToken`, userData)
			if (res.data.isValid) {
				this.$store.commit('setUser', userData)

				if (this.$mq === 'xs' || this.$mq === 'sm') {
					this.$store.commit('toggleMenu', false)
				}

			} else {
				localStorage.removeItem(userKey)
				this.$router.push({ name: 'auth' })
			}

			this.validatingToken = false
		}
	},
	created() {
		this.validateToken()
	},
}

</script>

<style>
* {
	font-family: "Lato", sans-serif;
}

body {
	margin: 0;
}

#app {
	--webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;

	height: 100vh;
	display: grid;
	grid-template-rows: 60px 1fr 40px;
	grid-template-columns: 300px 1fr;
	grid-template-areas:
		"header header"
		"menu content"
		"menu footer";
}

#app.hide-menu {
	grid-template-areas:
		"header header"
		"content content"
		"footer footer";
}
</style>