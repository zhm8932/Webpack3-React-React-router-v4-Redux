/**
 * Created by haiming.zeng on 2017/10/27.
 */
import {combineReducers} from 'redux';
import cart from './cart';
import count from './count';
import cnode from './cnode';
import dialog from './dialog';
import msg from './msg';
import movies from './movies';
import books from './books';

export default combineReducers({
	cart,
	count,
	cnode,
	dialog,
	msg,
	movies,
	books
});