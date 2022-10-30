<!-- eslint-disable no-undef -->
<template>
	<NavBar />
	<RouterView />
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
	components: {
		NavBar: NavBar,
	},
};
</script>
