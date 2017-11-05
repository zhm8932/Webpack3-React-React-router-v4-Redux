/**
 * Created by 91608 on 2017/11/4.
 */
import { combineReducers } from 'redux'
const dialog = (state=false,action)=>{
	switch (action.type){
		case 'DIALOG_SHOW':
			return true;
		case 'DIALOG_HIDE':
			return false;
		default:
			return false

	}
}

export default combineReducers({show:dialog})