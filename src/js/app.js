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

import MainContainer from './containers/MainContainer'

import {getAllProducts} from './actions';

const middleware = [thunk];

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
		<MainContainer/>
	</Provider>,
	document.getElementById('app')
)