<template>
	<!-- Authenticated home view -->
	<div v-if="authenticated">
		<v-container fluid>
			<v-row>
				<v-col>
					<text-pad v-if="activePad === 1"></text-pad>
					<notes-list v-else></notes-list>
				</v-col>

				<v-col cols="2">
					<operation-controls></operation-controls>
				</v-col>
			</v-row>
		</v-container>
	</div>

	<h1 v-else>You need to login!</h1>
</template>

<script>
/* Import packages */
import { mapGetters } from "vuex";
import graphqlClient from "@/utils/api";
import { CURRENT_USER_QUERY as query } from "@/utils/graphql";
import OperationControls from '@/components/OperationControls';
import TextPad from '@/components/TextPad';
import NotesList from '@/components/NotesList';

export default {
	name: "home",
	components: {
		OperationControls,
		TextPad,
		NotesList,
	},
	/**
	 * Use state getters and actions to manage display
	 * of baords are reflect mutations.
	 */
	computed: {
		prettifyResp() {
			return JSON.stringify(this.data, undefined, 2);
		},
		...mapGetters(["authenticated"]),
		activePad() {
			return this.$store.state.activePad;
		},
	},
	mounted() {
		if (this.authenticated) {
			graphqlClient.query({ query }).then(resp => (
				this.$store.commit('userData', resp.data)));
		}
	}
};
</script>
