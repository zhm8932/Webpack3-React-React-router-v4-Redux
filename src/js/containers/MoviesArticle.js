/**
 * Created by 91608 on 2017/11/12.
 */
import {connect} from 'react-redux';
import {getMovieArticle,getBooksCat} from '../actions';
import {Link} from 'react-router-dom';
import '../../sass/movies.scss';
import SimpleSlider from '../components/SimpleSlider';
import appKey from '../libs/utils/appKey';

console.log("appKey:",appKey);

class MovieArticle extends React.Component{
	componentDidMount(){

		let {id} = this.props.match.params;
		// this.props.getMoviesList();
		console.log("props::::",this.props,"id111111111:",id);
		this.props.getMovieArticle({
			url:`/apis/v2/movie/subject/${id}`
			// data:{name:'123456'}
		});
		this.props.getBooksCat({
			url:'/juhe/goodbook/catalog',
			data:{key:appKey.book}
		});
	}
	renderBooks(){
		let {moveArticle,bookCat} = this.props;
		if(bookCat.resultcode=='200'){
			return (
				<div>
					<ul>
						{bookCat.result.map(item=>(
							<li>
								<Link to={`/movies/book/${item.id}`}>
									{item.catalog}
								</Link>
							</li>
						))}</ul>
				</div>
			);
		}else{
			return (
				<div>
					<h4>{bookCat.reason}</h4>
					<p>{bookCat.error_code}</p>
				</div>
			);
		}
	}
	render(){
		console.log("moveArticle----:",this.props.moveArticle);
		let {moveArticle,bookCat} = this.props;


		if(!moveArticle.id){
			return <div className="wrapper pd">数据加载中……</div>;
		}
		let {casts,directors} = moveArticle;
		return(
			<div className="wrapper pd clearfix movie-article">
				<SimpleSlider></SimpleSlider>
				<h2>{moveArticle.title}({moveArticle.year})</h2>
				<dl className="article">
					<dt>
						<img src={moveArticle.images.small} alt={moveArticle.title}/>
					</dt>
					<dd>
						<p><label>导演:</label>{moveArticle.directors[0].name}</p>
						<p><label>编剧:</label>{directors.map(item=>item.name+'/')}</p>
						<p><label>主演:</label>{casts.map(item=>item.name+'/')}</p>
						<p><label>类型:</label>{moveArticle.genres.join('/')}</p>
						<p><label>制片国家/地区:</label>{moveArticle.countries.join('/')}</p>
						<p><label>语言:</label>{moveArticle.languages}</p>
						<p><label>上映日期:</label>{moveArticle.title}</p>
						<p><label>片长:</label>{moveArticle.durations}</p>
						<p><label>又名:</label>{moveArticle.aka.join('/')}</p>
					</dd>
				</dl>
				<div className="clearfix"></div>
				<div className="summary clearfix">
					<h3>{moveArticle.title}的剧情简介· · · · · ·</h3>
					<p>{moveArticle.summary.length>200?moveArticle.summary.substring(0,200)+"· · · · · ·":moveArticle.summary}</p>
				</div>
				<div className="casts clearfix">
					<h3>{moveArticle.title}的的影人· · · · · ·</h3>
					<p>{moveArticle.casts.map(item=>(
						<figure>
							{/*<img src={item.avatars.medium} alt=""/>*/}
							<h4>{item.name}</h4>
						</figure>
					))}</p>
				</div>
				<h3>图书电商数据· · · · · ·</h3>
				{this.renderBooks()}
			</div>
		);
	}
}

const mapStateToProps = (state)=>({
	moveArticle:state.movies.moveArticle,
	bookCat:state.books.bookCat
});

export default connect(
	mapStateToProps,
	{getMovieArticle,getBooksCat}
)(MovieArticle);