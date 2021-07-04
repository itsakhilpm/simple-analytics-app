const user = (state = { userAuthenticated: false }, action) => {
	switch (action.type) {
		case 'USER_LOGGED_IN':
			return {
				...state,
				userAuthenticated: action.payload.authorizationDone,
			};
		default:
			return state;
	}
};
export default user;
