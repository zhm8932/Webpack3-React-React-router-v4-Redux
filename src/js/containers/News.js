/**
 * Created by haiming.zeng on 2017/10/27.
 */
import '../../sass/news.scss'

import { getVisibleProducts,getProduct} from '../reducers/count'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';

import {getAllProducts,getUser} from '../actions';
class NewsList extends React.Component{
	componentDidMount(){
		console.log("count11333:",this.props)
		this.props.getAllProducts()
		// this.props.getUser()
	}
	render(){
		let {count} = this.props;
		return(
			<div>
				<div className="ads"><img src="/images/b-news.png"/></div>
				<section className="wrapper list-wrapper">
					<header>
						<h2>媒体采访</h2><a href="/news/list/14">查看更多>></a>
					</header>
					<div className="list clearfix">
						<ul>
							{count.map(item=>
								<li>
									<Link to={`/news/article/${item.id}`}>
										<div className="img"><img src={`/images/${item.src}`} alt="【理上网来•喜迎十九大】扶贫也创新！十八大以来年均减贫人数超1300万 获历史突破"/></div>
										<p>{item.name}</p>
									</Link>
								</li>
							)}
						</ul>
					</div>
				</section>
			</div>
		)
	}
}

const mapStateToProps = state=>({
	count:getVisibleProducts(state.count)
})
export default connect(
	mapStateToProps,
	{getAllProducts,getUser}
)(NewsList)