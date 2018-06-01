import {combineReducers} from 'redux';

const login = (state={username:'',password:''},action)=>{
	switch (action.type){
		case 'LOGIN':
			return action.json
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