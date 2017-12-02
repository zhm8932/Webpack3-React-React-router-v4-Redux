/**
 * Created by haiming.zeng on 2017/10/27.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducers'
import callApi from './middleware/callApi'

// import MainContainer from './containers/MainContainer'
import Routes from './routes'

import * as utils from './libs/utils';

console.log("utils:",utils)
console.log("htmlEncode:",utils.htmlEncode)
import {getAllProducts} from './actions';

// const middleware = [thunk];
const middleware = [thunk,callApi()];

if(process.env.NODE_ENV!=='production'){
	middleware.push(createLogger())
}
const store = createStore(
	reducer,
	applyMiddleware(...middleware)
)

console.log("store:",store)
console.log("state:",store.getState())
import 'sass/globals.scss';

// store.dispatch(getAllProducts())
ReactDOM.render(
	<Provider store={store}>
		<Routes/>
	</Provider>,
	document.getElementById('app')
)