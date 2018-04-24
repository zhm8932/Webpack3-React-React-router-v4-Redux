import {connect} from 'react-redux';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

import '../../sass/login.scss';

class Register extends React.Component{
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			console.log("err:",err,"values:",values)
			if (!err) {
				console.log('Received values of form: ', values);
			}
		});
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
							{getFieldDecorator('userName', {
								rules: [{ required: true, message: '请输入用户名' }],
							})(
								<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
							)}
						</FormItem>
						<FormItem>
							{getFieldDecorator('password', {
								rules: [{ required: true, message: '请输入密码'},{pattern:/[a-zA-Z]+(?=[0-9]+)|[0-9]+(?=[a-zA-Z]+)/g,message: '密码不合规则'},{min:8,message:'请输入8-20位'},{max:20,message:'请输入8-20位'}],
							})(
								<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
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
					</Form>
				</div>
			</div>
		)
	}
}

const WrappedRegistrationForm = Form.create()(Register);
export default connect()(WrappedRegistrationForm);