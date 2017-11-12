/**
 * Created by 91608 on 2017/11/12.
 */
import {connect} from 'react-redux'
import {getMoviesList} from '../actions';

class Movies extends React.Component{
	componentDidMount(){
		console.log("props:",this.props);
		this.props.getMoviesList();
	}
	render(){
		return(
			<div>豆瓣电影</div>
		)
	}
}

const mapStateToProps = (state)=>({
	moveList:state.movies
})

export default connect(
	mapStateToProps,
	{getMoviesList}
)(Movies)