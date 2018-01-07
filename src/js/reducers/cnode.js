/**
 * Created by haiming.zeng on 2017/10/29.
 */

import { combineReducers } from 'redux';
const cnodeList = (state = {data:[],isFetching:false,isEnd:true,page:1,articleType:'all'},action)=>{
	// console.log("statestate:",state,"action:",action)
	switch (action.type){
		case 'REQUEST_CNODE_LIST':
			return {
				...state,
				isFetching:true,
				isEnd:action.isEnd||false,
				page:state.page,
				articleType:action.articleType||state.articleType
			};
		case 'CNODE_LIST':
			return {
				...state,
				data:action.cnodeList||[],
				isFetching:false,
				isEnd:true,
				page:action.page||state.page,
				articleType:action.articleType||state.articleType
			};
		case 'CNODE_LIST_MORE':
			return {
				// data:[...state.data,...action.cnodeList],
				data:state.data.concat(action.cnodeList),
				isFetching:false,
				isEnd:true,
				page:action.page||state.page,
				articleType:action.articleType||state.articleType
				// page,
				// articleType
			};
		case 'CHANGE_ARTICLE_TYPE':
			return action.cnodeList||[];
		default:
			return state;
	}
};
const cnodeDetail = (state={},action)=>{
	// console.log("state222:",state,"action3334:",action)
	// console.log("action-cnodeDetail:",action)
	switch (action.type){
		case 'CNODE_DETAIL':
			return action.cnodeDetail||{};
		default:
			return state;
	}
};

const userDetail = (state={isFetching:false,json:{}},action)=>{
	switch (action.type){
		case 'REQUEST_USER_DETAIL':
			return {
				isFetching:true,
				json:state
			};
		case 'SUCCESS_USER_DETAIL':
			return {
				isFetching:false,
				json:action.userDetail.json
			};
		case 'FAILUR_USER_DETAIL':
			return action.userDetail.json;
		default :
			return action.userDetail||state;
	}
};
const topicCollect = (state={isFetching:false,json:{}},action)=>{
	switch (action.type){
		case 'REQUEST_TOPIC_COLLECT':
			return {
				isFetching:true,
				json:state
			};
		case 'SUCCESS_TOPIC_COLLECT':
			return {
				isFetching:false,
				json:action.topicCollect.json
			};
		case 'FAILUR_TOPIC_COLLECT':
			return action.topicCollect;
		default :
			return action.topicCollect||state;
	}
};
export default combineReducers({
	cnodeList,
	cnodeDetail,
	userDetail,
	topicCollect,
	list:function () {
		return [];
	}
});