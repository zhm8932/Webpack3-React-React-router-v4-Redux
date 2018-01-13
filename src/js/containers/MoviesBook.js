/**
 * Created by 91608 on 2017/11/12.
 */
import {connect} from 'react-redux'
import {getBooks} from '../actions';
import {Link} from 'react-router-dom'
import '../../sass/movies.scss';
import SimpleSlider from '../components/SimpleSlider'
import appKey from '../libs/utils/appKey';

console.log("appKey:",appKey)

@connect(
	(state) => ({
		bookList:state.books.bookList
	}),
	{getBooks}
)

export default class MovieArticle extends React.Component{
	componentDidMount(){
		let {id} = this.props.match.params;
		console.log("props::::",this.props,"id111111111:",id);
		this.props.getBooks({
			url:'/juhe/goodbook/query',
			data:{key:appKey.book,catalog_id:id,rn:10}
		});
	}
	render(){
		console.log("moveArticle----:",this.props.moveArticle)
		let {bookList:json} = this.props
		console.log("json:",json)


		if(!json.reason){
			return <div className="wrapper pd">数据加载中……</div>
		}
		let {data} = json.result;
		return(
			<div className="wrapper pd clearfix movie-article">
				{data.map(item=>{
					let online = item.online?item.online.split(' '):[];
					online = online.map(item=>item.split(":http"))
					console.log("online:",online)
					return (
						<div className="block clearfix">
							<h2>{item.title}({item.catalog})</h2>
							<dl className="article">
								<dt>
									<img src={item.img} alt={item.title}/>
								</dt>
								<dd>
									<p><label>类型：</label>{item.sub1}</p>
									<p><label>制片国家/地区：</label>{item.tags}</p>
									<p><label>阅读量：</label>{item.reading}</p>
									<p><label>出版时间：</label>{item.bytime}</p>
									<p><label>在线购买：</label>
										{online.length&&online.map(arr=>(
											<a target="_blank" href={`http${arr[1]}`}>{arr[0]}</a>
										))}
									</p>
								</dd>
							</dl>
							<div className="clearfix"></div>
							<div className="summary clearfix">
								<h3>{item.title}的剧情简介· · · · · ·</h3>
								<p>{item.sub2.length>200?item.sub2.substring(0,200)+"· · · · · ·":item.sub2}</p>
							</div>
						</div>
					)
				})}

			</div>
		)
	}
}
