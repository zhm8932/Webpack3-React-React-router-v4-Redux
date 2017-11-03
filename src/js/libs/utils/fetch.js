/**
 * Created by haiming.zeng on 2017/10/29.
 */
import 'whatwg-fetch'

const fetchs = ({url,method='GET',data={}})=>{
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
		headers:{
			'Content-Type': 'application/json'
		},
		// body:JSON.stringify(data)
	}).then(response=>response.json())
}

export default fetchs