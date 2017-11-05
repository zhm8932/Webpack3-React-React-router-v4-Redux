/**
 * Created by haiming.zeng on 2017/10/31.
 */

import {
	BrowserRouter as Router,
	Route,
	Link,
	NavLink
} from 'react-router-dom';
import Index from './Index'
import About from './About'
import News from './News'
import NewsDetail from './NewsDetail'
import CnodeList from './CnodeList'
import CnodeDetail from './CnodeDetail'
import UserContainer from './UserContainer'
import ContactContainer from './ContactContainer'

import fetchs from '../libs/utils/fetch';

import {getCnode} from '../actions'

// fetchs({url:'https://cnodejs.org/api/v1/topics'})
// .then(json=>{
// 	console.log("json:",json)
// 	getCnode()
// })

const Main = ()=>(
	<Router>
		<div>
			<header className="header">
				<div className="wrapper clearfix">
					<Link to="/" title="首页" className="logo">首页</Link>
					<nav className="nav">
						<NavLink exact to="/" activeClassName="on">首页</NavLink>
						<NavLink to="/about" activeClassName="on">关于我们</NavLink>
						<NavLink to="/news" activeClassName="on">企业动态</NavLink>
						<NavLink to="/cnode" activeClassName="on">cnode社区</NavLink>
						<NavLink to="/contacts" activeClassName="on">联系我们</NavLink>
					</nav>
				</div>
			</header>
			<Route exact path="/" component={Index}/>
			<Route path="/about" component={About}/>
			<Route exact path="/news" component={News}/>
			<Route path="/news/article/:id" component={NewsDetail}/>
			<Route exact path="/cnode" component={CnodeList}/>
			<Route path="/cnode/article/:id" component={CnodeDetail}/>
			<Route path="/user/:id" component={UserContainer}/>
			<Route path="/contacts" component={ContactContainer}/>
		</div>
	</Router>
)


export default Main