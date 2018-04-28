/**
 * Created by 91608 on 2017/11/4.
 */
import { combineReducers } from 'redux'
const msg = (state={show:false,content:''},action)=>{
	switch (action.type){
		case 'MSG_SHOW':
			return {
				show:true,
				iconLoading:true,
				content:action.content
			};
		case 'MSG_HIDE':
			return {
				...state,
				show:false,
				iconLoading:false
			};
		default:
			return state

	}
}

export default msg