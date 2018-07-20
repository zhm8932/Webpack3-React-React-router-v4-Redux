/**
 * Created by haiming.zeng on 2017/10/30.
 */

import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
class NavBar extends React.Component {
	changeArticleType(tab) {
		console.log("修改分类:", tab);
		this.props.getDataStart();
		this.props.getCnodeList({tab, page: 1, limit: 10});
	}

	render() {
		console.log("111111111:", this.props);
		let {articleType, changeArticleType, articleTypeList, getDataStart} = this.props;
		var nav = [];
		for (let key in articleTypeList) {
			nav.push(<a className={key == articleType ? "active" : ''} key={key} onClick={(e) => this.changeArticleType(key, e)}>{articleTypeList[key]}</a>);
		}
		return (
			<div className="nav-tab">
				{nav}
			</div>
		);
	}
}

// const mapDispatchToProps=(dispatch,ownProps)=>({
// 	changeArticleType:(tab)=>{
// 		console.log("修改分类:",tab)
// 		// this.scrollTop = 0;
// 		dispatch(getCnodeList({tab,page:1,limit:10}))
// 	}
// })
// export default connect(
// 	null,mapDispatchToProps
// )(NavBar)

export default NavBar;