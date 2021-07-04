// Regural expression to verify a valid email address
const emailRgx =
	/^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

/**
 * Returns strings with spaces instead of underscores.
 *
 * @param {string} string which have unedrscores instead of spaces.
 * @return {string} String with underscores replaced with strings
 */

function convertUnderScoreToSpace(string) {
	return string.replace(/_/g, ' ');
}
/**
 * Return a Random color hexa code
 * @return {string} Random color code
 */

function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}
// Check if email address is valid
function isValidEmail(email) {
	return emailRgx.test(String(email).trim());
}

// Check if password have length of 5
function isValidPassword(pwd) {
	return pwd.length >= 5;
}

const storage = {
	get,
	set,
	unset,
};

export {
	storage,
	convertUnderScoreToSpace,
	getRandomColor,
	isValidEmail,
	isValidPassword,
};
