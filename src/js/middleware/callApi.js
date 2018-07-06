/**
 * Created by haiming.zeng on 2017/11/13.
 */

import fetchs,{CALL_API} from '../libs/utils/fetch';

const defaults = {
	level: `log`,
	logger: console,
	logErrors: true,
	collapsed: undefined,
	predicate: undefined,
	duration: false,
	timestamp: true,
	stateTransformer: state => state,
	actionTransformer: action => action,
	errorTransformer: error => error,
	colors: {
		title: () => `inherit`,
		prevState: () => `#9E9E9E`,
		action: () => `#03A9F4`,
		nextState: () => `#4CAF50`,
		error: () => `#F20404`,
	},
	diff: false,
	diffPredicate: undefined,

	// Deprecated options
	transformer: undefined,
};


function callApi(options={}) {
	const loggerOptions = {
		...defaults,
		...options
	}

	console.log("自定义中间件");

	return ({getState})=>next=>action=>{
		console.log("getState111:",getState)
		console.log("next2222222:",next)
		console.log("action33333:",action)

		console.log("CALL_API:",CALL_API)

		const callAPI = action[CALL_API];
		console.log("callAPI:",callAPI)

		//获取action对象
		const actionWidth = data=>{
			const finalAction = Object.assign({},action,data)
			console.log("actionWidth---data:",data)
			console.log("finalAction---data:",finalAction)

			delete finalAction[CALL_API];
			return finalAction
		}

		console.log("actionWidth:",actionWidth())
		//next 相当于dispatch
		if(!callAPI){
			console.log("没有callAPI");
			return next(actionWidth())
		}else{
			const {types,url,data,mode} = callAPI;

			const [requestType,successType,failurType] = types;
			next(actionWidth({type:requestType}))
			return fetchs({url:url,data:data,mode})
			.then(json=>{
				console.log("json223344:",json)
				next(actionWidth({
					json,
					type:successType
				}))
			}).catch(error=>{
				next(actionWidth({
					error:error.message,
					type:failurType
				}))
			})
		}



	}
}

export default callApi