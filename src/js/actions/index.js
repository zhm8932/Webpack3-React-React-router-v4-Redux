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

export const moviesList=json=>({
	type:'MOVE_LIST',
	// userDetail:json,
	json:json
})

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

export const MOVIE_ARTICLE_REQUEST = 'MOVIE_ARTICLE_REQUEST';
export const MOVIE_ARTICLE_SUCCESS = 'MOVIE_ARTICLE_SUCCESS';
export const MOVIE_ARTICLE_FAILURE = 'MOVIE_ARTICLE_FAILURE';

const fetchMovieArticle = ({url,data}) => ({
	[CALL_API]: {
		types: [ MOVIE_ARTICLE_REQUEST, MOVIE_ARTICLE_SUCCESS, MOVIE_ARTICLE_FAILURE ],
		url:url,
		mode: "no-cors",
		data:data
	}
})

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
