import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Checkbox,Modal,Col, TimePicker, Select, Cascader, InputNumber} from 'antd';
const FormItem = Form.Item;
const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 5 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 12 },
	},
};

import '../../sass/login.scss';

class Register extends React.Component{
	static PropTypes = {
		userName:PropTypes.string.required,
		password:PropTypes.string
	};
	handleSubmit = (e) => {
		e.preventDefault();

		this.props.form.validateFields((err, values) => {
			console.log("err:",err,"values:",values)
			if (!err) {
				console.log('Received values of form: ', values);
			}else{
				for(let key in err){
					let errors = err[key].errors;
					console.log("errors:",errors,"")
					if(errors.length){
						let error = errors[0];
						Modal.warning({
							title: '温馨提示',
							// iconType:'',
							content: (
								<div>
									<p>{error.message}</p>
								</div>
							),
							okText:'确认',
							cancelText:'取消',
							onOk() {},
						});
						break;
					}
				}
			}
		});
	}
	componentDidMount(){

	}
	render(){
		console.log("this.props:",this.props)
		// const { getFieldDecorator } = this.props.form;

		const { form: { getFieldDecorator } } = this.props
		return(
			<div className='wrapper'>
				<div className='form-list'>
					<h2>注册</h2>
					<Form onSubmit={this.handleSubmit} className="login-form">
						<FormItem>
							{
								getFieldDecorator('userName', {rules: [{ required: true, message: '请输入用户名' }]})
								(<Input prefix={<Icon type="user"/>} placeholder="用户名" />)
							}
						</FormItem>
						<FormItem>
							{getFieldDecorator('password', {
								rules: [{ required: true, message: '请输入密码'},{pattern:/[a-zA-Z]+(?=[0-9]+)|[0-9]+(?=[a-zA-Z]+)/g,message: '密码不合规则'},{min:8,message:'请输入8-20位'},{max:20,message:'请输入8-20位'}],
							})(
								<Input prefix={<Icon type="lock" />} type="password" placeholder="密码" />
							)}
						</FormItem>
						<FormItem>
							{getFieldDecorator('remember', {
								valuePropName: 'checked',
								initialValue: true,
							})(
								<Checkbox>记住</Checkbox>
							)}
							<a className="login-form-forgot" href="">忘记密码</a>
							<Button type="primary" htmlType="submit" className="btn submit-btn">
								注册
							</Button>
							Or <a href="/login">登录</a>
						</FormItem>

						<FormItem
							{...formItemLayout}
							label="邮箱"
							hasFeedback
							validateStatus="warning"
							help="请输入正确的邮箱"
						>
							<Input placeholder="请输入邮箱" id="error" />
						</FormItem>

					</Form>
				</div>
			</div>
		)
	}
}

const WrappedRegistrationForm = Form.create()(Register);
export default connect()(WrappedRegistrationForm);