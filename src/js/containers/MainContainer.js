/**
 * Created by haiming.zeng on 2017/10/31.
 */

import Bundle from '../libs/Bundle';
import {
	BrowserRouter as Router,
	Route,
	Link,
	NavLink
} from 'react-router-dom';
import Index from './Index.bundle'
import About from './About.bundle'
import News from './News.bundle'
import NewsDetail from './NewsDetail.bundle'
import CnodeList from './CnodeList.bundle'
import CnodeDetail from './CnodeDetail.bundle'
// import CnodeDetail from './CnodeDetail'
import UserContainer from './UserContainer.bundle'
import ContactContainer from './ContactContainer.bundle'
import Movies from './Movies.bundle'
import MoviesArticle from './MoviesArticle.bundle'
import MoviesBook from './MoviesBook.bundle'

const lazyLoadComponent = (comp) => (props) => (
	<Bundle load={comp}>
		{(Container) => <Container {...props}/>}
	</Bundle>
)


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
						<NavLink to="/movies" activeClassName="on">豆瓣电影</NavLink>
					</nav>
				</div>
			</header>
			<Route exact path="/" component={lazyLoadComponent(Index)}/>
			<Route path="/about" component={lazyLoadComponent(About)}/>
			<Route exact path="/news" component={lazyLoadComponent(News)}/>
			<Route path="/news/article/:id" component={lazyLoadComponent(NewsDetail)}/>
			<Route exact path="/cnode" component={lazyLoadComponent(CnodeList)}/>
			<Route path="/cnode/article/:id" component={lazyLoadComponent(CnodeDetail)}/>
			<Route path="/user/:id" component={lazyLoadComponent(UserContainer)}/>
			<Route path="/contacts" component={lazyLoadComponent(ContactContainer)}/>
			<Route exact path="/movies" component={lazyLoadComponent(Movies)}/>
			<Route path="/movies/article/:id" component={lazyLoadComponent(MoviesArticle)}/>
			<Route path="/movies/book/:id" component={lazyLoadComponent(MoviesBook)}/>
		</div>
	</Router>
)


export default Main