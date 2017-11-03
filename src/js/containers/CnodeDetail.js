/**
 * Created by haiming.zeng on 2017/10/27.
 */
import {connect} from 'react-redux'
import {getCnodeDetail} from '../actions'
import {formatDate} from '../libs/utils'
import ReplyList from '../components/cnode/ReplyList';

class CnodeDetail extends React.Component{
	componentDidMount(){
		console.log("id:",this.props.match.params.id,"this.props--CnodeDetail:",this.props)
		// this.props.getCnodeDetail(this.props.match.params.id)
		this.props.getCnodeDetail()
	}
	render(){
		console.log("this.props:",this.props)
		let {cnodeDetail} = this.props;
		console.log("cnodeDetail:",cnodeDetail)
		return(
			<section className="wrapper article">
				<header>
					<h1>{cnodeDetail.title}</h1>
					<p>发布日期：
						<time>{formatDate(cnodeDetail.create_at,'YYYY-MM-DD hh:mm')}</time>
					</p>
				</header>
				<article dangerouslySetInnerHTML={{__html:cnodeDetail.content}}/>
				<ReplyList replies={cnodeDetail.replies||[]}/>
			</section>
		)
	}
}

const mapStateToProps=(state)=>({
	cnodeDetail:state.cnode.cnodeDetail
})

// const mapDispatchToProps = (dispatch,ownProps)=>{
// 	console.log("ownProps:",ownProps)
// 	return {
// 		getCnodeDetail:()=>dispatch(getCnodeDetail(ownProps.match.params.id)),
// 		handleSubmit:function () {}
//
// 	}
// }

const mapDispatchToProps = (dispatch,ownProps)=>({
	getCnodeDetail:()=>dispatch(getCnodeDetail(ownProps.match.params.id)),
	handleSubmit:()=> {
		console.log("handleSubmit")
	}

})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CnodeDetail)