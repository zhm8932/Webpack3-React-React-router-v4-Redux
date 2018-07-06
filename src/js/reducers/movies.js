/**
 * Created by 91608 on 2017/11/12.
 */
import {combineReducers}  from 'redux'

const moveList = (state={},action)=>{
	switch (action.type){
		case 'MOVIE_SUCCESS':
			return action.json
		default:
			return state
	}
}

const moveArticle = (state={},action)=>{
	console.log("actionactionaction:",action)
	switch (action.type){
		case 'MOVIE_ARTICLE_SUCCESS':
			return action.json
		default:
			return state
	}
}
const moveComments = (state={},action)=>{
	switch (action.type){
		case 'MOVIE_COMMENTS_SUCCESS':
			return action.json
		default:
			return state
	}
}
export default combineReducers({
	moveList,
	moveArticle,
	moveComments
})