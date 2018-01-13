/**
 * Created by 91608 on 2017/11/12.
 */
import {connect} from 'react-redux';
import {getMoviesList,getMovie} from '../actions';
import {Link} from 'react-router-dom';

class Movies extends React.Component{
	componentDidMount(){
		console.log("props:",this.props);
		// this.props.getMoviesList();
		this.props.getMovie({
			url:'/apis/v2/movie/in_theaters',
			data:{name:'123456'}
		});
	}
	render(){
		console.log("movie----:",this.props.moveList);
		let {subjects} = this.props.moveList;


		console.log("subjectsxxxxxxxxxxxx:",subjects);


		if(!subjects){
			return <div className="wrapper pd">数据加载中……</div>;
		}
		return(
			<div className="wrapper pd">
				<div className="list">
					<ul className="clearfix">
						{
							subjects.map(item=>(
								<li>
									<Link to={`/movies/article/${item.id}`}>
										<img className="img" src={item.images.small}/>
										<h4>{item.title}  【{item.year}】</h4>
										<p>{item.genres.join('-')}</p>
										<p>豆瓣评分：{item.rating.average}</p>
									</Link>
								</li>
							))
						}
					</ul>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state)=>({
	moveList:state.movies.moveList
});

export default connect(
	mapStateToProps,
	{getMoviesList,getMovie}
)(Movies);