/**
 * Created by 91608 on 2017/11/4.
 */

import React, {Component, PropTypes} from 'react';
// import 'dialog.css';//引入样式文件 此处省略CSS Mouldes 或者 style in js的css模块化方案讨论
import '../../sass/includes/dialog.scss';
export default class Dialog extends Component {
	// static propTypes = {
	// 	actions: PropTypes.node,//接受一个react element或者react element的数组
	// 	actionsContainerClassName:PropTypes.string,//添加到action按钮的容器元素上面的class名
	// 	bodyClassName: PropTypes.string,//dialog的容器的class名
	// 	children: PropTypes.node,//dialog的主体.
	// 	className: PropTypes.string,//根容器class
	// 	contentClassName: PropTypes.string,//content的class
	// 	modal: PropTypes.bool,
	// 	//模态框
	// 	//这将导致用户必须使用dialog的action按钮之一才能逃离模态界面
	// 	//点击dialog主体部分之外将不会触发onRequestClose
	// 	onRequestClose: PropTypes.func,
	// 	//当dialog被在外面点击或者点击按钮时 发生的回调函数
	// 	//@param {bool} buttonClicked 将被传入，表示是否是按钮点击导致触发的回调.
	// 	open: PropTypes.bool.isRequired,//控制dialog是否显示
	// 	overlayClassName: PropTypes.string,//遮罩层的class
	// 	repositionOnUpdate: PropTypes.bool,//确定对话框的内容更新时是否应该重置位置
	// 	title: PropTypes.node,//dialog的标题，可以是数字、字符串、元素或者包含它们的数组
	// 	titleClassName: PropTypes.string,//title标题的class
	// };

	componentDidMount() {
		this.positionDialog();
		//给window全局绑定 resize和 keyup
		window.addEventListener('resize', this.handleResize);
		window.addEventListener('keyup', this.handleKeyUp);
	}

	componentDidUpdate() {
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
		this.props.onRequestClose && this.props.onRequestClose(buttonClicked);
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
		console.log("action:", actions);
		return (
			<div className="dialog-container">
				{open &&
				<div className="dialog-box">
					<div className="dialog">
						<div className="dialog-title">
							{title}
						</div>
						<div className="dialog-content">
							{children}
						</div>
						<div className="dialog-action">
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
		);
	}
}