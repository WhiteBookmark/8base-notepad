<template>
	<v-list>
		<v-list-item-group color="indigo">
			<v-list-item v-for="note in notes" :key="note.id" @click="noteUpdation(note)">
				<v-list-item-content>
					<v-list-item-title>
						<i>{{note.title}}</i>
					</v-list-item-title>
					{{note.note}}
				</v-list-item-content>
			</v-list-item>
		</v-list-item-group>
	</v-list>
</template>

<script>
export default {
	name: "NotesList",
	methods: {
		noteUpdation: function (note) {
			this.$store.commit('prepareNoteForModification', note);
		}
	},
	computed: {
		noteText: {
			get: function () {
				return this.$store.state.text;
			}
		},
		notes: {
			get: function () {
				return this.$store.state.notes;
			}
		}
	}
}
</script>