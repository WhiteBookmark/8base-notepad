<template>
	<v-app>
		<vuetify-navbar></vuetify-navbar>

		<hr />

		<v-content>
			<router-view />
		</v-content>

		<v-footer color="indigo" app>
			<span class="white--text">&copy; 2019</span>
		</v-footer>
	</v-app>
</template>

<script>
import VuetifyNavbar from '@/components/VuetifyNavbar';

export default {
	name: "app",

	components: {
		VuetifyNavbar
	}
}
</script>
