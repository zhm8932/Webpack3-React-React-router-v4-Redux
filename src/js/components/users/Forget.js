import 'sass/login.scss'
import Msg from '../../components/Msg';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Checkbox,Modal, Select,} from 'antd';
import * as utils from "../../libs/utils";

class Forget extends React.Component{
	constructor(props){
		super(props);
		this.onChange = this.onChange.bind(this);
	}
	onChange(event){
		console.log("event:",event.target.value,this.props.forget)

		let {name,value} = event.target;
		console.log("name:",name,"value:",value)
		this.props.forget[name]=value;
	}
	handleSubmit(e){
		e.preventDefault();
		console.log("forget::",this.props.forget)
		let {forget} = this.props;
		if(utils.isEmpty(forget.username)){
			return this.props.handleMsgShow("请输入用户名");
		}
		if(!utils.isPassword(forget.password)){
			return this.props.handleMsgShow("请输入8-20位数字和字母的密码");
		}
	}
	enterIconLoading = (data,e) => {
		// this.props.handleSubmit(data,e);
		this.setState({ iconLoading: true });
	}
	render(){
		let {msg,forget} = this.props;
		console.log("msg:",msg);
		return (
			<div className="wrapper">
				<form className="form-list">
					<h2>找回密码</h2>
					<ul>
						<li>
							<Input prefix={<Icon type="user"/>} name="username" onChange={this.onChange} placeholder="请输入用户名" />
						</li>
						<li>
							<Input prefix={<Icon type="password"/>} name="password" onChange={this.onChange} placeholder="请输入密码"/>
						</li>
						<li>
							<select defaultValue={forget.status} name="status" placeholder="请选择学历" onChange={this.onChange}>
								<option value=""></option>
								<option value="E01">初中</option>
								<option value="E02" >高中</option>
								<option value="E03">大专</option>
								<option value="E04">本科</option>
							</select>
						</li>
					</ul>
					<div className="submit-box">
						{/*<button type="submit" onClick={this.props.handleSubmit.bind(this,this.props.login)} className="btn" >登录</button>*/}
						<Button type="primary submit-btn" onClick={this.props.handleSubmit.bind(this,this.props.forget)}>
							找回密码
						</Button>
					</div>
				</form>
				<Msg
					open={msg.show}
					modal={false}
					bOkBtn={true}
					okText="知道了"
					handleMsgOk={this.props.handleMsgOk}
				>
					{this.props.msg.content}
				</Msg>
			</div>
		)
	}
}

export default Forget