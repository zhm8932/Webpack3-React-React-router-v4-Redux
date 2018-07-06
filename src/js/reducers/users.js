import {combineReducers} from 'redux';
import Cookies from 'js-cookie';
let isAuthenticated = Cookies.get('token')||false;
const login = (state={username:'',password:'',isAuthenticated:isAuthenticated},action)=>{
	console.log("actionaction:",action)
	console.log("statestatestate:",state)
	switch (action.type){
		case 'LOGIN':
			return {...state,isAuthenticated:true,token:action.data.token}
		default :
			return state
	}
}
const forget = (state={username:'',password:'',status:'E01'},action)=>{
	switch (action.type){
		case 'FORGET':
			return action.json;
		default:
			return state
	}
}

export default combineReducers({login,forget})