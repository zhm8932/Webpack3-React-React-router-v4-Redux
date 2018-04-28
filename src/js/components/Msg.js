/**
 * Created by 91608 on 2017/11/4.
 */
import PropTypes from 'prop-types'
import React, { Component } from 'react'
// import 'dialog.css';//引入样式文件 此处省略CSS Mouldes 或者 style in js的css模块化方案讨论
import '../../sass/includes/dialog.scss'
export default class Dialog extends Component {
	static PropTypes = {
		okText:PropTypes.string,
		bOkBtn:PropTypes.bool,
		handleMsgOk:PropTypes.func.isRequired,
		actions:PropTypes.element,
		delayTime:PropTypes.number
	}
	static defaultProps = {
		okText:'确认',
		bOkBtn:true,
		delayTime:3000
	}
	componentDidMount() {
		//给window全局绑定 resize和 keyup
		window.addEventListener('resize', this.handleResize);
		window.addEventListener('keyup', this.handleKeyUp);



	}
	componentDidUpdate() {
		console.log("componentDidUpdate")
		//弹框显示时、并且没有关闭按钮，自动隐藏弹框
		if(this.props.open&&!this.props.bOkBtn){
			console.log("自动隐藏")
			setTimeout(()=>this.props.handleMsgOk(),this.props.delayTime)
		}

	}

	componentDidUnmount(){
		window.removeEventListener('resize', this.handleResize);
		window.removeEventListener('keyup', this.handleKeyUp);
	}

	requestClose(buttonClicked) { //buttonClicked 标示触发关闭弹窗的是否为按钮
		if(!buttonClicked && this.props.modal){
			return; //如果不是按钮触发close同时dialog是模态框，就return
		}
		this.props.onRequestClose && this.props.onRequestClose(buttonClicked)
	}

	handleClickOverlay = () => { //箭头函数避免this错误
		// this.requestClose(false);
		this.props.handleMsgOk && this.props.handleMsgOk()
	}
	handleKeyUp = (event) => {
		if(!this.props.open){
			return;
		}
		if(event.keyCode==27){ //esc的keyCode码
			this.requestClose(false);
		}
	}
	handleResize = () => {
		if(!this.props.open){
			return;
		}
		this.positionDialog();
	}
	render(){
		const {title, children, actions, open ,modal,handleMsgOk,bOkBtn,okText} = this.props;
		console.log("this.props-MSG:",this.props)
		console.log("bOkBtn:",bOkBtn)
		return (
			<div className="msg-wrapper">
				{open &&
				<div className="msg-box">
					<div className="msg-title">
						{title}
					</div>
					<div className="msg-content">
						{children}
					</div>
					{
						bOkBtn
						?<div className="msg-action"><button className="ok" onClick={handleMsgOk}>{this.props.okText}</button></div>
						:actions&&<div className="msg-action">{actions}</div>
					}

				</div>
				}
				{open &&
					<div className={`overlay ${modal?'transparent':''}`}
						onClick={this.handleClickOverlay}
					>
					</div>
				}
			</div>
		)
	}
}