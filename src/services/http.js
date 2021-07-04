import axios from 'axios';
import { storage } from '../helpers/utils';

const instance = axios.create({
	baseURL: `https://sigviewauth.sigmoid.io/`,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});
instance.interceptors.request.use(
	function (config) {
		let token = storage.get('authToken', 'local');
		if (token) {
			config.headers['x-auth-token'] = token;
		}

		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);
instance.interceptors.response.use(function (response) {
	// if(Number(response.data.statusCode) ===200 || Number(response.data.status.statusCode) ===200){
	return response.data;
	// } else{
	//     Promise.reject(response.data)
	// }
});
export default instance;
