/**
 * Created by haiming.zeng on 2017/10/27.
 */



/*
本质上是 JavaScript 普通对象
Action 描述当前发生的事情。改变 State 的唯一办法，就是使用 Action。它会运送数据到 Store
Action 是把数据从应用（译者注：这里之所以不叫 view 是因为这些数据有可能是服务器响应，
用户输入或其它非 view 的数据 ）传到 store 的有效载荷。
它是 store 数据的唯一来源。一般来说你会通过 store.dispatch() 将 action 传到 store。
* */

import * as types from '../constants/ActionTypes'
import fetchs,{CALL_API} from '../libs/utils/fetch';
import Cookies from 'js-cookie';
import {BrowserRouter} from 'react-router-dom';

console.log("CALL_API:",CALL_API)


export const login = (data)=>({
	type:'LOGIN',
	data
})
export const handleLogin = (data) => dispatch => {
	fetchs({
		url:'/users/login',
		method:'POST',
		data:data
	})
	.then(json => {
		console.log("jsonjsonjson:",json)
		dispatch(login(json))
		Cookies.set('token',json.token)
		BrowserRouter.push('/')
	})
}
const receiveProducts = products=>({
	type:types.RECEIVE_PRODUCTS,
	products:products
})
export const getAllProducts = () => dispatch => {
	fetch('/api/shop.json')
	.then(response => {
		return response.json()
	})
	.then(json => dispatch(receiveProducts(json)))
}

export const cnodeList = (json,params)=>({
	type:'CNODE_LIST',
	cnodeList:json.data,
	page:params.page
})
export const cnodeListMore = (json,data,cb)=>({
	type:'CNODE_LIST_MORE',
	cnodeList:json.data,
	page:data.page,
	cb:cb
})

export const cnodeDetail = (json)=>({
	type:'CNODE_DETAIL',
	cnodeDetail:json.data
})

export const getCnodeList = (data={})=>dispatch=>{
	console.log("getCnode:",data)
	dispatch({type:'REQUEST_CNODE_LIST',articleType:data.tab})
	fetchs({url:'https://cnodejs.org/api/v1/topics',data})
	.then(json=>{
		console.log("json223344:",json)
		dispatch(cnodeList(json,data))
	}).catch(function (json) {
		console.log("catch-json:",json)
		dispatch({type:'FAILURE_CNODE_LIST',articleType:data.tab})
	})
}

export const getCnodeListMore = (data={},cb)=>dispatch=>{
	console.log("getCnodeMore:",data)
	// dispatch({type:'REQUEST_CNODE_LIST'})
	fetchs({url:'https://cnodejs.org/api/v1/topics',data})
	.then(json=>{
		console.log("json2more99:",json)
		dispatch(cnodeListMore(json,data,cb))
	})
}
export const getDataStart = ()=>dispatch=>{
	dispatch({type:'REQUEST_CNODE_LIST',isEnd:false})
}
export const getCnodeDetail = (id)=>dispatch=>{
	console.log("idid:",id,"dispatch:",dispatch)
	fetchs({url:'https://cnodejs.org/api/v1/topic/'+id})
	.then(json=>{
		console.log("json2233:",json)
		dispatch(cnodeDetail(json))
	})
}

export const userDetail=json=>({
	type:'SUCCESS_USER_DETAIL',
	// userDetail:json,
	userDetail:{
		isFetching:false,
		json
	}
})
export const topicCollect=json=>({
	type:'SUCCESS_TOPIC_COLLECT',
	topicCollect:json
})
export const getUserDetail = id=>dispatch=>{
	dispatch({type:'REQUEST_USER_DETAIL'})
	fetchs({url:'https://cnodejs.org/api/v1/user/'+id})
	.then(json=>dispatch(userDetail(json)))
}

export const getTopicCollect = id => dispatch=>(
	fetchs({url:`https://cnodejs.org/api/v1/topic_collect/${id}`})
	.then(json=>dispatch(topicCollect(json)))
)

export const handleShow = (type,content='')=>({
	type:type,
	content
})
//显示
export const handleMsgShow = msg=>dispatch=>{
	console.log("msg23333333333333333:",msg)
	return dispatch(handleShow("MSG_SHOW",msg))
}
//隐藏
export const handleMsgHidden = ()=>dispatch=>{
	dispatch(handleShow("MSG_HIDE"))
}

//电影列表
export const moviesList=json=>({
	type:'MOVE_LIST',
	json:json
})

//获取电影列表
export const getMoviesList = id=>dispatch=>{
	fetchs({url:'/apis/v2/movie/in_theaters',mode: "no-cors"})
		.then(json=>dispatch(moviesList(json)))

	//fetchs({url:'/movies/list'}).then(json=>dispatch(moviesList(json)))
}

export const MOVIE_REQUEST = 'MOVIE_REQUEST';
export const MOVIE_SUCCESS = 'MOVIE_SUCCESS';
export const MOVIE_FAILURE = 'MOVIE_FAILURE';

const fetchMovie = (url,data) => ({
	[CALL_API]: {
		types: [ MOVIE_REQUEST, MOVIE_SUCCESS, MOVIE_FAILURE ],
		url,
		mode: "no-cors",
		data:data
	}
})

export const getMovie =({url,data})=>dispatch=>{
	console.log("data----------:",data)
	console.log("fetchMovie(url,data)----------:",fetchMovie(url,data))
	return dispatch(fetchMovie(url,data))
}

export const MOVIE_ARTICLE_REQUEST = 'MOVIE_ARTICLE_REQUEST';
export const MOVIE_ARTICLE_SUCCESS = 'MOVIE_ARTICLE_SUCCESS';
export const MOVIE_ARTICLE_FAILURE = 'MOVIE_ARTICLE_FAILURE';

const fetchMovieArticle = ({url,data}) => ({
	[CALL_API]: {
		types: [ MOVIE_ARTICLE_REQUEST, MOVIE_ARTICLE_SUCCESS, MOVIE_ARTICLE_FAILURE ],
		url:url,
		mode: "no-cors",
		// data:data
	}
})

export const getMovieArticle =({url,data})=>dispatch=>{
	console.log("data----------:",data)
	return dispatch(fetchMovieArticle({url,data}))
}

export const MOVIE_COMMENTS_REQUEST = 'MOVIE_COMMENTS_REQUEST';
export const MOVIE_COMMENTS_SUCCESS = 'MOVIE_COMMENTS_SUCCESS';
export const MOVIE_COMMENTS_FAILURE = 'MOVIE_COMMENTS_FAILURE';

const fetchMovieComments = (url,data) => ({
	[CALL_API]: {
		types: [ MOVIE_COMMENTS_REQUEST, MOVIE_COMMENTS_SUCCESS, MOVIE_COMMENTS_FAILURE ],
		url:'/apis/v2/movie/subject/2158490/comments',
		mode: "no-cors",
		data:data
	}
})

export const getMovieComments =({url,data})=>dispatch=>{
	console.log("data----------:",data)
	return dispatch(fetchMovieComments(url,data))
}


export const BOOKS_CAT_REQUEST = 'BOOKS_CAT_REQUEST';
export const BOOKS_CAT_SUCCESS = 'BOOKS_CAT_SUCCESS';
export const BOOKS_CAT_FAILURE = 'BOOKS_CAT_FAILURE';

const fetchBooksCat = (url,data) => ({
	[CALL_API]: {
		types: [ BOOKS_CAT_REQUEST, BOOKS_CAT_SUCCESS, BOOKS_CAT_FAILURE ],
		url:url,
		mode: "no-cors",
		data:data
	}
})

export const getBooksCat =({url,data})=>dispatch=>{
	console.log("data----------:",data)
	return dispatch(fetchBooksCat(url,data))
}

export const BOOKS_LIST_REQUEST = 'BOOKS_LIST_REQUEST';
export const BOOKS_LIST_SUCCESS = 'BOOKS_LIST_SUCCESS';
export const BOOKS_LIST_FAILURE = 'BOOKS_LIST_FAILURE';

const fetchBooks = (url,data) => ({
	[CALL_API]: {
		types: [ BOOKS_LIST_REQUEST, BOOKS_LIST_SUCCESS, BOOKS_LIST_FAILURE ],
		url:url,
		mode: "no-cors",
		data:data
	}
})

export const getBooks =({url,data})=>dispatch=>{
	console.log("data----------:",data)
	return dispatch(fetchBooks(url,data))
}
