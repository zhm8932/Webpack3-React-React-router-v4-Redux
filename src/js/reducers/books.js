/**
 * Created by 91608 on 2017/11/12.
 */
import {combineReducers}  from 'redux';

const bookCat = (state={},action)=>{
	switch (action.type){
		case 'BOOKS_CAT_SUCCESS':
			return action.json;
		default:
			return state;
	}
};

const bookList = (state={},action)=>{
	switch (action.type){
		case 'BOOKS_LIST_SUCCESS':
			return action.json;
		default:
			return state;
	}
};

export default combineReducers({
	bookCat,
	bookList
});
