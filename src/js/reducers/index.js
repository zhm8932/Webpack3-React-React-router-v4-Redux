/**
 * Created by haiming.zeng on 2017/10/27.
 */
import {combineReducers} from 'redux';
import cart from './cart';
import count from './count';
import cnode from './cnode';

export default combineReducers({
	cart,
	count,
	cnode
})