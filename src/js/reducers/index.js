/**
 * Created by haiming.zeng on 2017/10/27.
 */

/*
Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。
这种 State 的计算过程就叫做 Reducer;
Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State
Reducers 指定了应用状态的变化如何响应 actions 并发送到 store 的，
记住 actions 只是描述了有事情发生了这一事实，并没有描述应用如何更新 state。
* */

/*
* combineReducers用于Reducer 的拆分。
* 定义各个子 Reducer 函数，然后用这个方法，将它们合成一个大的 Reducer
* */
import {combineReducers} from 'redux';
import cart from './cart';
import count from './count';
import cnode from './cnode';
import dialog from './dialog';
import msg from './msg';
import movies from './movies';
import books from './books';
import users from './users';

export default combineReducers({
	cart,
	count,
	cnode,
	dialog,
	msg,
	movies,
	books,
	users
})