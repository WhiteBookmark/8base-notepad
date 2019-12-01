<template>
	<v-app-bar app color="indigo" dark>
		<v-toolbar-title>VueJS ❤️ 8base</v-toolbar-title>

		<v-spacer></v-spacer>

		<v-btn
			large
			text
			v-for="navigation in navigations"
			:to="navigation.destination"
			:key="navigation.name"
		>{{navigation.name}}</v-btn>
		<!-- Display SignIn/SignOut btn dynamically -->
		<v-btn large text @click="authBtn.fn">{{authBtn.txt}}</v-btn>
	</v-app-bar>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
	name: "VuetifyNavbar",
	data: () => ({
		navigations: [
			{
				name: 'Home',
				destination: '/'
			},
			{
				name: 'About',
				destination: '/about'
			},
			{
				name: 'Profile',
				destination: '/profile'
			},

		]
	}),

	computed: {
		/**
		 * Manage the state of the auth button
		 * in the nav.
		 */
		authBtn() {
			return this.authenticated ? {
				txt: 'Sign Out',
				fn: this.logout
			} : {
					txt: 'Sign In',
					fn: this.login
				}
		},

		...mapGetters(["authenticated"])
	},
	/**
	 * Use state getters and actions to manage display
	 * of baords are reflect mutations.
	 */
	methods: mapActions(["login", "logout"])
}
</script>
