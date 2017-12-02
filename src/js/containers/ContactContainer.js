/**
 * Created by haiming.zeng on 2017/10/31.
 */

import {connect} from 'react-redux'
import {getUserDetail,getTopicCollect} from '../actions'
import Contact from '../components/Contact';

const mapStateToProps = (state)=>{
	console.log("state.cnode:",state.cnode)
	return {
		userDetail:state.cnode.userDetail,
		topicCollect:state.cnode.topicCollect,
	}
}

const mapDispatchToProps=(dispatch,ownProps)=>({
	getUserDetail:()=>dispatch(getUserDetail(ownProps.match.params.id)),
	getTopicCollect:()=>dispatch(getTopicCollect(ownProps.match.params.id))
})

export default connect(mapStateToProps,mapDispatchToProps)(Contact)