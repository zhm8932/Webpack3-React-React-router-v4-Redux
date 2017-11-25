/**
 * Created by haiming.zeng on 2017/10/27.
 */
import * as types from '../constants/ActionTypes'
import fetchs,{CALL_API} from '../libs/utils/fetch';

console.log("CALL_API:",CALL_API)
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

export const moviesList=json=>({
	type:'MOVE_LIST',
	// userDetail:json,
	json:json
})

export const getMoviesList = id=>dispatch=>{
	// dispatch({type:'REQUEST_USER_DETAIL'})
	// fetchs({url:'https://api.douban.com/v2/movie/in_theaters'})
	// 	.then(json=>dispatch(moviesList(json)))
	fetchs({url:'/apis/v2/movie/in_theaters',mode: "no-cors"})
	// fetchs({url:'/apis/v2/book/1220562',mode: "no-cors"})
	// fetchs({url:'/apis/comments'})
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
		// url: url,
		// url:'/apis/v2/movie/subject/2158490/comments',
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