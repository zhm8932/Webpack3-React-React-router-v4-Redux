/**
 * Created by haiming.zeng on 2017/10/30.
 */

import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getCnodeList} from '../actions'
class NavBar extends React.Component{
	render(){
		let {articleType,changeArticleType,articleTypeList} = this.props;
		var res = [];
		for(let key in articleTypeList){
			res.push(<a className={key==articleType?"active":''} key={key} onClick={(e)=>changeArticleType(key,e)}>{articleTypeList[key]}</a>)
		}
		return (
			<div className="nav-tab">
				{res}
			</div>
		)
	}
}

const mapDispatchToProps=(dispatch,ownProps)=>({
	changeArticleType:(tab)=>{
		console.log("修改分类:",tab)
		// this.scrollTop = 0;
		dispatch(getCnodeList({tab,page:1,limit:10}))
	}
})
export default connect(
	null,mapDispatchToProps
)(NavBar)