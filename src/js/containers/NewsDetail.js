/**
 * Created by haiming.zeng on 2017/10/27.
 */
import {connect} from 'react-redux';
const NewsDetail = ({match,count})=>{
	let {id} = match.params;
	console.log("id22ssss:",id,"count:",count);
	let detail = count[id]||{};
	console.log("detail:",detail);
	return(
		<section className="wrapper article">
			<header>
				<h1>{detail.name}</h1>
				<p>发布日期：
					<time>2018-02-16</time>
				</p>
			</header>
			<article>
				<p>{detail.name}</p>
				<div className="img"><img src={`/images/${detail.src}`} alt={detail.name}/></div>
			</article>
			<div className="up-down">
				<p>
					<label>上一篇：</label><a href="/news/article/78">服务费</a>
				</p>
				<p>
					<label>下一篇：</label><span>没有了</span>
				</p>
			</div>
		</section>
	);
};

const mapStateToProps = state =>({
	count: state.count.byId
});
export default connect(mapStateToProps)(NewsDetail);