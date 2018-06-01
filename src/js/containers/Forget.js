import {connect} from 'react-redux'
import * as utils from '../libs/utils';


import '../../sass/login.scss'
import Msg from '../components/Msg';
import {handleShow, handleMsgShow, cnodeListMore} from "../actions";
import {DatePicker,Button,Icon,Affix,BackTop,Radio,Select,Slider,Checkbox } from 'antd'
import fetchs from '../libs/utils/fetch';
import Forget from '../components/users/Forget';
const mapStateToProps = (state,ownProps)=>({
	login:state.users.login,
	forget:state.users.forget,
	msg:state.msg
})
const mapDispatchToProps = (dispatch,ownPorps)=>({
	handleMsgOk:()=>dispatch(handleShow('MSG_HIDE')),
	handleMsgShow:(msg)=>dispatch(handleShow("MSG_SHOW",msg)),
	handleSubmit(data,e){
		e.preventDefault();
		console.log("data::",data)
		console.log("propspropspropsprops：",this.props)
		console.log("thispropspropspropsprops：",this)
		let {forget} = this.props;
		if(utils.isEmpty(forget.username)){
			// return dispatch(handleShow("MSG_SHOW","请输入用户名"));
			return handleMsgShow("请输入用户名")(dispatch);
			// return this.props.handleMsgShow("请输入用户名");
		}
		if(!utils.isPassword(forget.password)){
			return this.props.handleMsgShow("请输入8-20位数字和字母的密码");
		}
		if(utils.isEmpty(forget.status)){
			return handleMsgShow("请选择学历")(dispatch)
		}
		fetchs({
			url:'/users/forget',
			method:'POST',
			data:data
		}).then(json=>{
			console.log("json:",json)
			this.props.history.push('/login')
		})
	}
})
export default connect(mapStateToProps,mapDispatchToProps)(Forget)