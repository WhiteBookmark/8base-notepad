import gql from 'graphql-tag';
/**
 * Query the current users details.
 */
export const CURRENT_USER_QUERY = gql`
	query {
		user {
			id
			email
		}
	}
`;
/**
 * Sign up a new user mutation.
 */
export const USER_SIGN_UP_MUTATION = gql`
	mutation UserSignUp($user: UserCreateInput!, $authProfileId: ID) {
		userSignUpWithToken(user: $user, authProfileId: $authProfileId) {
			id
			email
		}
	}
`;
/**
 * Note insertion query
 */
export const INSERT_NOTE = gql`
	mutation InsertNote($note: [String!], $title: [String!], $email: String!) {
		noteCreate(data: { note: $note, title: $title, userID: { connect: { email: $email } } }) {
			userID {
				email
			}
		}
	}
`;
/**
 * Get all notes
 */
export const GET_NOTES = gql`
	query GetNotes($email: String!) {
		notesList(filter: { userID: { email: { equals: $email } } }) {
			items {
				note
				id
				title
			}
		}
	}
`;
/**
 * Update a note
 */
export const UPDATE_NOTE = gql`
	mutation UpdateNote($note: [String!], $title: [String!], $id: ID!) {
		noteUpdate(data: { note: $note, title: $title }, filter: { id: $id }) {
			note
			title
		}
	}
`;
/**
 * Delete a note
 */
export const DELETE_NOTE = gql`
	mutation DeleteNote($id: ID!) {
		noteDelete(filter: { id: $id }) {
			success
		}
	}
`;
