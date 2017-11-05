/**
 * Created by haiming.zeng on 2017/10/27.
 */
import * as types from '../constants/ActionTypes'
import fetchs from '../libs/utils/fetch';
const receiveProducts = products=>({
	type:types.RECEIVE_PRODUCTS,
	products:products
})
export const getAllProducts = () => dispatch => {
	fetch('../api/shop.json')
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