import {connect} from 'react-redux'
import * as utils from '../libs/utils';


import '../../sass/login.scss'
import Msg from '../components/Msg';
import {handleShow} from "../actions";
import {DatePicker,Button,Icon,Affix,BackTop,Radio,Select,Slider,Checkbox } from 'antd'
const {RangePicker} = DatePicker;
const RadioButton = Radio.Button;

class Login extends React.Component{
	constructor(props){
		super(props);
		console.log("login:",this.props.login)
		this.state={
			sex:2
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}
	handleSubmit(e){
		e.preventDefault();
		console.log("login::",this.props.login)
		let {login} = this.props;
		if(utils.isEmpty(login.username)){
			return this.props.handleMsgShow("请输入用户名");
		}
		if(!utils.isPassword(login.password)){
			return this.props.handleMsgShow("请输入8-20位数字和字母的密码");
		}

	}
	onChange(event){

		console.log("event:",event.target.value)
		// console.log("key：",key,"value:",value,value.target)
		let {name,value} = event.target;
		console.log("name:",name,"value:",value)
		this.props.login[name]=value;
	}
	handleChange=(event)=>{

		console.log("event:",event.target.value)
		// console.log("key：",key,"value:",value,value.target)
		let {name,value} = event.target;
		console.log("name:",name,"value:",value,this.state)
		this.setState({
			[name]:value
		})
	}
	handleDate(date,dateString){
		console.log("date:",date,"dateString:",dateString)
	}
	// enterIconLoading(){
	// 	this.setState({iconLoading:true})
	// }
	enterIconLoading = (e) => {
		this.handleSubmit(e);
		this.setState({ iconLoading: true });
	}
	render(){
		let {msg} = this.props;
		console.log("msg:",msg);
		const options = [
			{ label: 'Apple', value: 'Apple' },
			{ label: 'Pear', value: 'Pear' },
			{ label: 'Orange', value: 'Orange' },
		];
		return (
			<div className="wrapper">
				<form className="form-list">
					<Affix>
						<h2>登录</h2>
					</Affix>
					<ul>
						<li>
							<input type='text' name="username" onChange={this.onChange} placeholder="请输入用户名"/>
						</li>
						<li>
							<input type="text" name="password" onChange={this.onChange} placeholder="请输入密码"/>
						</li>
						<li>
							<DatePicker name="date" onChange={this.handleDate}/>
						</li>
						<li><RangePicker format="YYYY-MM-DD HH:mm" onChange={this.handleDate}/></li>
						<li>
							<select name="status" onChange={this.onChange}>
								<option value="E01">初中</option>
								<option value="E02">高中</option>
								<option selected value="E03">大专</option>
								<option value="E04">本科</option>
							</select>
							<i className="iconfont icon-arrow-bottom"></i>
							<Icon type='loading'/>
							<Icon type='question-circle'/>
						</li>
						<li>
							<Select name='status' defaultValue="lucy" style={{ width: 120 }} onChange={this.handleChange}>
								<Option value="jack">Jack</Option>
								<Option value="lucy">Lucy</Option>
								<Option value="disabled" disabled>Disabled</Option>
								<Option value="Yiminghe">yiminghe</Option>
							</Select>
						</li>
						<li>
							<Button type="primary">Primary</Button>
							<Button type="Default">Default</Button>
							<Button type="dashed">Dashed</Button>
							<Button type="danger">Danger</Button>
						</li>
						<li>
							<Radio.Group name='sex' onChange={this.handleChange}  value={this.state.sex} >
								<Radio name='sex' value={1}>男</Radio>
								<Radio name='sex' value={2}>女</Radio>
							</Radio.Group>
						</li>
						<li>
							<Radio.Group defaultValue="a" size="small">
								<RadioButton value="a">Hangzhou</RadioButton>
								<RadioButton value="b">Shanghai</RadioButton>
								<RadioButton value="c">Beijing</RadioButton>
								<RadioButton value="d">Chengdu</RadioButton>
							</Radio.Group>
						</li>
						<li>
							<Checkbox.Group options={options} defaultValue={['Apple']} />
						</li>
						<li>
							<Slider defaultValue={30}/>
						</li>
					</ul>
					<div className="submit-box">
						<button type="submit" onClick={this.handleSubmit} className="btn" >登录</button>
						<Button type="primary" loading={msg.iconLoading} onClick={this.enterIconLoading}>
							Click me!
						</Button>
					</div>
				</form>
				<Msg
					open={msg.show}
					modal={false}
					bOkBtn={true}
					okText="知道了"
					handleMsgOk={this.props.handleMsgOk}
					// actions={<button className="cancel" onClick={this.props.handleMsgOk}>知道了</button>}
				>
					{this.props.msg.content}
				</Msg>
				<div>
					<BackTop>
						<div className="ant-back-top-inner">UP!!!!!</div>
					</BackTop>
					Scroll down to see the bottom-right
					<strong style={{ color: 'rgba(64, 64, 64, 0.6)' }}> gray </strong>
					button.
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state)=>({
	login:state.users.login,
	msg:state.msg
})
const mapDispatchToProps = (dispatch,ownPorps)=>({
	handleMsgOk:()=>dispatch(handleShow('MSG_HIDE')),
	handleMsgShow:(msg)=>dispatch(handleShow("MSG_SHOW",msg))
})
export default connect(mapStateToProps,mapDispatchToProps)(Login)