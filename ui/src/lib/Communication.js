
const isDebug = process.env.VUE_APP_ENV == "development";
const baseURL = isDebug ? 'http://localhost:3000' : "";
import axios from "axios";

export default class Communication {

	static call(api, operation, params)
	{
		return new Promise(function(resolve, reject) {

			const url = baseURL + "/api/" + api + "/" + operation;

			axios.post(url, params, {
				withCredentials: isDebug
			}).then(data => {
				resolve(data.data);
			})
			.catch(function (error) {
				reject(error.response.data);
			});

		});

	}
}

  
