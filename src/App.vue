<template>
	<div id="app">
		<Header title="K4Dev - Base de conhecimento" :hideToggle="false" />
		<Menu />
		<Content />
		<Footer />
	</div>
</template>

<script>
import Menu from './components/templates/Menu.vue'
import Header from './components/templates/Header.vue'
import Content from './components/templates/Content.vue'
import Footer from './components/templates/Footer.vue'


export default {
	name: "App",
	components: {
		Menu,
		Header,
		Content,
		Footer
	}
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

</style>