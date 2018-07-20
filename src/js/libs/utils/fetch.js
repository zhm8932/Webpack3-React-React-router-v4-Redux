/**
 * Created by haiming.zeng on 2017/10/29.
 */
import 'whatwg-fetch'

export const CALL_API = Symbol('Call API')

const fetchs = ({url,method='GET',mode='',data={}})=>{
	let query = '';
	for (let i in data) {
		query += `${i}=${data[i]}&`;
	}
	method = method.toUpperCase();
	// console.log("query:",query)
	if(method==='GET'){
		url+=`?${query.slice(0,-1)}`
	}
	let options = {
		method,
		mode: mode,
		headers: {
			'Content-Type': 'application/json',
			'key': '71d7c958ddaade37861387ee208f2f67'
		}
	};
	if (method === 'GET') {
		url += `?${query.slice(0, -1)}`;
	}else{
		options.body = JSON.stringify(data);
	}
	return fetch(url, options).then(response => response.json());
};

export default fetchs