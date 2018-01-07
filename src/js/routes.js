/**
 * Created by haiming.zeng on 2017/12/2.
 */
/**
 * Created by haiming.zeng on 2017/10/31.
 */

import Bundle from './libs/Bundle';
import {
	BrowserRouter as Router,
	Route,
	Link,
	NavLink
} from 'react-router-dom';
import Index from './containers/Index';
import About from './containers/About';
import News from './containers/News';
import NewsDetail from './containers/NewsDetail';
import CnodeList from './containers/CnodeList';
import CnodeDetail from './containers/CnodeDetail';
// import CnodeDetail from './CnodeDetail'
import UserContainer from './containers/UserContainer';
import ContactContainer from './containers/ContactContainer';
import Movies from './containers/Movies';
import MoviesArticle from './containers/MoviesArticle';
import MoviesBook from './containers/MoviesBook';

const lazyLoadComponent = (comp) => (props) => (
	<Bundle load={comp}>
		{(Container) => <Container {...props}/>}
	</Bundle>
);

const Routes = ()=>(
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
);

export default Routes;