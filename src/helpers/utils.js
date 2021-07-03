function getLocalStorage(name) {
	if (typeof Storage !== 'undefined') {
		return localStorage.getItem(name);
	}
}

function set(name, value, type, expiry) {
	switch (type) {
		case 'local':
			const val =
				typeof value !== 'object' ? value : JSON.stringify(value);
			localStorage.setItem(name, val);
			break;
		default:
			break;
	}
}

function unset(name, type) {
	if (type === 'local') {
		localStorage.removeItem(name);
	}
}

const get = (name, type, serverCookies = null) => {
	switch (type) {
		case 'local':
			return getLocalStorage(name);
		default:
			break;
	}
};
function convertUnderScoreToSpace(string) {
	return string.replace(/_/g, ' ');;
}
const storage = {
	get,
	set,
	unset,
};

export { storage, convertUnderScoreToSpace };
