/**
 * Created by 91608 on 2017/11/4.
 */

import React, {Component, PropTypes} from 'react'
// import 'dialog.css';//引入样式文件 此处省略CSS Mouldes 或者 style in js的css模块化方案讨论
import '../../sass/includes/dialog.scss'
export default class Dialog extends Component {

	componentDidMount() {
		this.positionDialog();
		//给window全局绑定 resize和 keyup
		window.addEventListener('resize', this.handleResize);
		window.addEventListener('keyup', this.handleKeyUp);
		setTimeout(() => this.props.handleMsgCancle(), 5000)
	}

	componentDidUpdate() {
		console.log("componentDidUpdate")
		this.positionDialog();

	}

	componentDidUnmount() {
		window.removeEventListener('resize', this.handleResize);
		window.removeEventListener('keyup', this.handleKeyUp);
	}

	positionDialog() {
		//doSomeThing 来重置Dilog的位置和最大高度限制等
		//关键代码是fingDOM()/this.refs/DOM的高度API等 此细节不深入了
	}

	requestClose(buttonClicked) { //buttonClicked 标示触发关闭弹窗的是否为按钮
		if (!buttonClicked && this.props.modal) {
			return; //如果不是按钮触发close同时dialog是模态框，就return
		}
		this.props.onRequestClose && this.props.onRequestClose(buttonClicked)
	}

	handleClickOverlay = () => { //箭头函数避免this错误
		this.requestClose(false);
	}
	handleKeyUp = (event) => {
		if (!this.props.open) {
			return;
		}
		if (event.keyCode == 27) { //esc的keyCode码
			this.requestClose(false);
		}
	}
	handleResize = () => {
		if (!this.props.open) {
			return;
		}
		this.positionDialog();
	}

	render() {
		const {title, children, actions, open, modal} = this.props;
		console.log("this.props-MSG:", this.props)
		return (
			<div className="msg-container">
				{open &&
				<div className="msg-box">
					<div className="msg">
						<div className="msg-title">
							{title}
						</div>
						<div className="msg-content">
							{children}
						</div>
						<div className="msg-action">
							{actions}
						</div>
					</div>
				</div>
				}
				{open &&
				<div className={`overlay ${modal ? 'transparent' : ''}`}
					 onClick={this.handleClickOverlay}
				></div>
				}
			</div>
		)
	}
}