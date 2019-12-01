<template>
	<v-list>
		<v-list-item v-for="button in buttons" :key="button.name">
			<v-btn
				large
				outlined
				block
				color="indigo"
				class="mt-2"
				@click="triggerClick(button.name)"
				:disabled="!button.active"
				:loading="button.loading"
			>
				<v-icon class="mr-1">{{button.icon}}</v-icon>
				<span>{{button.name}}</span>
			</v-btn>
		</v-list-item>
		<v-snackbar v-model="snackbar">
			{{ snackbarText }}
			<v-btn color="indigo" text @click="snackbar = false">Close</v-btn>
		</v-snackbar>
	</v-list>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { mdiPlus, mdiMinus, mdiUpdate, mdiFormatListBulletedSquare, mdiDatabasePlus } from '@mdi/js';
import graphqlClient from "@/utils/api";
import { INSERT_NOTE, GET_NOTES, UPDATE_NOTE, DELETE_NOTE } from "@/utils/graphql";

export default {
	name: "OperationControls",
	data: () => ({
		buttons: [
			{
				name: 'New',
				icon: mdiPlus,
				active: true,
				loading: false,
			},
			{
				name: 'Insert',
				icon: mdiDatabasePlus,
				active: true,
				loading: false,
			},
			{
				name: 'List All',
				icon: mdiFormatListBulletedSquare,
				active: true,
				loading: false,
			},
			{
				name: 'Update',
				icon: mdiUpdate,
				active: true,
				loading: false,
			},
			{
				name: 'Delete',
				icon: mdiMinus,
				active: true,
				loading: false,
			},
		],
		snackbar: false,
		snackbarText: '',
	}),
	methods: {
		triggerClick: function (operationCase) {
			switch (operationCase) {
				case 'New':
					this.new();
					break;
				case 'List All':
					this.listAll();
					break;
				case 'Insert':
					this.insert();
					break;
				case 'Update':
					this.update();
					break;
				case 'Delete':
					this.delete();
					break;
				default:
					break;
			}
		},
		new: function () {
			this.$store.commit('showPad');
			this.$store.commit('refreshNotepad');
		},
		listAll: function () {
			this.buttons.find(button => button.name == 'List All').active = false;
			this.buttons.find(button => button.name == 'List All').loading = true;
			this.$store.commit('hidePad');
			graphqlClient.query({ query: GET_NOTES, variables: { email: this.userData.user.email } })
				.then(response => {
					this.$store.commit('storeNoteList', response.data.notesList.items);
					this.snackbarText = "List updated";
					this.snackbar = true;
				})
				.catch(error => {
					this.snackbarText = error.toString();
					this.snackbar = true;
				})
				.finally(() => {
					this.buttons.find(button => button.name == 'List All').loading = false;
					this.buttons.find(button => button.name == 'List All').active = true;
				});
		},

		insert: function () {
			if (!this.noteText || !this.noteTitle) {
				this.snackbarText = "Nothing to insert";
				this.snackbar = true;
				return;
			}
			this.buttons.find(button => button.name == 'Insert').active = false;
			this.buttons.find(button => button.name == 'Insert').loading = true;

			graphqlClient.mutate({
				mutation: INSERT_NOTE,
				variables: {
					note: this.noteText,
					title: this.noteTitle,
					email: this.userData.user.email
				}
			})
				.then(resp => {
					this.user = resp.data.user;
					this.snackbarText = "New note inserted";
					this.snackbar = true;
					this.new();
				})
				.catch(error => {
					this.snackbarText = error.toString();
					this.snackbar = true;
				})
				.finally(() => {
					this.buttons.find(button => button.name == 'Insert').loading = false;
					this.buttons.find(button => button.name == 'Insert').active = true;
				});
		},
		update: function () {
			if (!this.noteId) {
				this.snackbarText = "Note doesn't exist, insert first";
				this.snackbar = true;
				return;
			}
			if (!this.noteText || !this.noteTitle) {
				this.snackbarText = "Note or title is empty";
				this.snackbar = true;
				return;
			}
			this.buttons.find(button => button.name == 'Update').active = false;
			this.buttons.find(button => button.name == 'Update').loading = true;

			graphqlClient.mutate({
				mutation: UPDATE_NOTE, variables: {
					id: this.noteId,
					note: this.noteText,
					title: this.noteTitle,
				}
			})
				.then(resp => {
					this.snackbarText = "Note updated";
					this.snackbar = true;
				})
				.catch(error => {
					this.snackbarText = error.toString();
					this.snackbar = true;
				})
				.finally(() => {
					this.buttons.find(button => button.name == 'Update').loading = false;
					this.buttons.find(button => button.name == 'Update').active = true;
				});
		},
		delete: function () {
			if (!this.noteId) {
				this.snackbarText = "Nothing to delete";
				this.snackbar = true;
				return;
			}

			this.buttons.find(button => button.name == 'Delete').active = false;
			this.buttons.find(button => button.name == 'Delete').loading = true;

			graphqlClient.mutate({
				mutation: DELETE_NOTE, variables: {
					id: this.noteId,
				}
			})
				.then(resp => {
					this.snackbarText = "Note deleted";
					this.snackbar = true;
					this.new();
				})
				.catch(error => {
					this.snackbarText = error.toString();
					this.snackbar = true;
				})
				.finally(() => {
					this.buttons.find(button => button.name == 'Delete').loading = false;
					this.buttons.find(button => button.name == 'Delete').active = true;
				});
		},
	},
	computed: {
		userData: {
			get: function () {
				return this.$store.state.userData;
			}
		},
		noteText: {
			get: function () {
				return this.$store.state.text;
			}
		},
		noteTitle: {
			get: function () {
				return this.$store.state.title;
			}
		},
		noteId: {
			get: function () {
				return this.$store.state.id;
			}
		}
	},
}
</script>
