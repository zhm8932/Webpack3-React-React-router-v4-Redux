/**
 * Created by haiming.zeng on 2017/10/27.
 */
import {connect} from 'react-redux'
import {getCnodeDetail,handleShow} from '../actions'
import {formatDate} from '../libs/utils'
import ReplyList from '../components/cnode/ReplyList';

import Dialog from '../components/Dialog';
import Msg from '../components/Msg';

class CnodeDetail extends React.Component{
	componentDidMount(){
		console.log("id:",this.props.match.params.id,"this.props--CnodeDetail:",this.props)
		// this.props.getCnodeDetail(this.props.match.params.id)
		this.props.getCnodeDetail()
	}
	render(){
		console.log("this.props:",this.props)
		let {cnodeDetail,dialog,msg} = this.props;
		console.log("cnodeDetail:",cnodeDetail)
		return(
			<section className="wrapper article">
				<header>
					<h1>{cnodeDetail.title}</h1>
					<p>发布日期：
						<time>{formatDate(cnodeDetail.create_at,'YYYY-MM-DD hh:mm')}</time>
					</p>
					<div><span onClick={this.props.handleCollect}>收藏</span></div>
				</header>
				<article dangerouslySetInnerHTML={{__html:cnodeDetail.content}}/>
				<ReplyList replies={cnodeDetail.replies||[]}/>
				<Dialog
					title="Dialog对话框Demo"
					open={dialog.show}
					modal={false}
					actions={<div><button className="cancel" onClick={this.props.handleCancle}>取消</button><button onClick={this.props.handleSubmit}>确认</button></div>}
					onRequestClose={this.props.onRequestClose}
				>
					<p>Dialog内容内容内容内容内容内容内容内容内容内容内容内容</p>
					<p>Dialog内容</p>
					<p>Dialog内容</p>
					<p>Dialog内容</p>
					<p>Dialog内容</p>
					<p>Dialog内容</p>
					<p>Dialog内容</p>
					<p>Dialog内容</p>
				</Dialog>
				<Msg
					open={msg.show}
					modal={false}
					actions={<button className="cancel" onClick={this.props.handleMsgCancle}>知道了</button>}

					handleMsgCancle={this.props.handleMsgCancle}
				>
					{this.props.msg.content}
				</Msg>
			</section>
		)
	}
}

const mapStateToProps=(state)=>({
	cnodeDetail:state.cnode.cnodeDetail,
	dialog:state.dialog,
	msg:state.msg,
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
	handleCollect:()=>dispatch(handleShow('DIALOG_SHOW')),
	onRequestClose:()=>dispatch(handleShow('DIALOG_HIDE')),
	handleCancle:()=>{
		console.log("取消")
		dispatch(handleShow('HIDE'))
	},
	handleMsgCancle:()=>dispatch(handleShow('MSG_HIDE')),
	handleSubmit:()=> {
		console.log("handleSubmit")
		return dispatch(handleShow('MSG_SHOW','收藏成功！'))
	}

})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CnodeDetail)