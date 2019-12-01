<template>
	<v-list>
		<p>Note Id: {{noteId}}</p>
		<v-text-field autofocus label="Title" outlined counter="120" v-model="title"></v-text-field>
		<v-textarea outlined label="Your Note" auto-grow counter="40000" v-model="text"></v-textarea>
	</v-list>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
	name: "TextPad",
	computed: {
		text: {
			get: function () {
				return this.$store.state.text;
			},
			set: function (newValue) {
				this.$store.commit('replaceText', newValue);
			}
		},
		title: {
			get: function () {
				return this.$store.state.title;
			},
			set: function (newValue) {
				this.$store.commit('replaceTitle', newValue);
			}
		},
		noteId: {
			get: function () {
				return this.$store.state.id;
			},
		}
	}
}
</script>