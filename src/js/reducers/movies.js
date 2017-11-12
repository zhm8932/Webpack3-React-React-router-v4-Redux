/**
 * Created by 91608 on 2017/11/12.
 */
import {combineReducers}  from 'redux'

const moveList = (state={},action)=>{
	switch (action.type){
		case 'MOVE_LIST':
			return action.json
		default:
			return state
	}
}

export default combineReducers({
	moveList
})