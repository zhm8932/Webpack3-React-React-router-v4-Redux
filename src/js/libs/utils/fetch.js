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
	// console.log("query:",query)
	if(method=='GET'){
		url+=`?${query.slice(0,-1)}`
	}
	return fetch(url,{
		method,
		mode:mode,
		headers:{
			'Content-Type': 'application/json',
			'key':'71d7c958ddaade37861387ee208f2f67'
		}
		// body:JSON.stringify(data)
	}).then(response=>response.json())
}

export default fetchs