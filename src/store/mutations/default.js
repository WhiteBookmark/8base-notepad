const defaultMutations = {
	replaceText(state, newValue) {
		state.text = newValue;
	},
	replaceTitle(state, newValue) {
		state.title = newValue;
	},
	showPad(state) {
		state.activePad = 1;
	},
	hidePad(state) {
		state.activePad = 0;
	},
	userData(state, data) {
		state.userData = data;
	},
	insertNote(state, data) {
		state.userData = data;
	},
	storeNoteList(state, data) {
		state.notes = data;
	},
	prepareNoteForModification(state, data) {
		state.id = data.id;
		state.title = data.title;
		state.text = data.note;
		state.activePad = 1;
	},
	refreshNotepad(state) {
		state.id = '';
		state.title = '';
		state.text = '';
	},
};

export default defaultMutations;
