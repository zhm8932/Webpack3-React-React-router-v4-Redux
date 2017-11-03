/**
 * Created by haiming.zeng on 2017/10/29.
 */
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import fetchs from '../libs/utils/fetch';
import {getCnodeList,getCnodeListMore,getDataStart} from '../actions'

import {getScrollTop,getWindowHeight,getScrollHeight} from '../libs/utils/getSize';
import NavBar from './NavBar';
const articleTypeList={
	'all': '全部',
	'good': '精华',
	'job': '招聘',
	'share':'分享',
	'ask':'问答'



}

class CnodeList extends React.Component{
	constructor(props){
		super(props);
		// console.log("this:",this)
		// this.scrollTop=110;
		this.handleScroll = this.handleScroll.bind(this)
	}
	componentDidMount(){
		console.log("componentDidMount 社区:",this.props,"this.refs.listBox:",this.refs.listBox)
		this.props.getCnodeList({
			page:1,
			limit:10,
			tab:'all'
		});
		const scrollEl = window;
		// console.log("this.refs.listBox:",this.refs.listBox)
		// document.addEventListener('scroll',this.handleScroll)

		this.windowHeight = getWindowHeight();
		document.addEventListener('scroll',this.handleScroll)

		if (this.refs.listBox) {
			console.log("getScrollHeight:",getScrollHeight())
			console.log("getScrollTop:",getScrollTop())
			console.log("getWindowHeight:",getWindowHeight(),"this.windowHeight:",this.windowHeight)
			// console.log("监听滚动scrollEl：",scrollEl,document.body.clientHeight)
			// console.log("网页可见区域高：",document.body.clientHeight,"document.body.offsetHeight:",document.body.offsetHeight)
			// console.log("screen：",document.body.scrollHeight,"window.screen:",window.screen)

			// this.refs.listBox.addEventListener('scroll',this.handleScroll)
		}
	}
	componentWillUnmount(){
		// document.removeEventListener('scroll', this.handleScroll);
	}
	handleScroll(event){
		// console.log("网页可见区域高222：",document.body.clientHeight,"document.body.offsetHeight:",document.body.offsetHeight)

		let offset
		const el = this.selfComponent
		// let scrollTop = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop
		// offset = this.calcTop(el) + el.offsetHeight - scrollTop - window.innerHeight

		const scrollTop = getScrollTop();
		const scrollHeight = getScrollHeight();
		// console.log("window.pageYOffset:",window.pageYOffset,"event",event)
		// console.log("window.pageYOffset:",window.pageYOffset,"windowHeight:",windowHeight)
		const clientHeight = event.target.clientHeight
		// const scrollHeight = event.target.scrollHeight
		// const scrollTop = event.target.scrollTop
		const isBottom = (clientHeight + scrollTop === scrollHeight)

		// console.log("getScrollHeight:",getScrollHeight())
		// console.log("getScrollTop:",getScrollTop(),"差值",scrollHeight-this.windowHeight-scrollTop)

		let {cnodeList} = this.props;
		if(scrollTop>=scrollHeight-this.windowHeight){
			console.log("加载下一页:",cnodeList.isEnd)
			this.props.getDataStart()
			if(!cnodeList.isEnd){
				this.props.getCnodeListMore({
					page:2,
					limit:10,
					tab:'all'
				});
			}
		}

		// console.log("网页正文全文高：",document.documentElement.clientHeight,document.body.clientHeight,document.documentElement.scrollTop)
		// console.log('is bottom:' + isBottom,"scrollTop:",scrollTop,"clientHeight：",clientHeight )
	}
	render(){
		console.log("cnode:",this.props);
		let {cnodeList,...props} = this.props;
		let {data} = cnodeList;
		props.ref = node => { this.selfComponent = node }

		return(
			<div className="wrapper list-wrapper" ref='listBox' >
				<NavBar articleType={cnodeList.articleType} articleTypeList={articleTypeList}/>
				<div className="lists">
					{
						cnodeList.isFetching?
							<p>加载中……</p>:
							<ul>
								{data.map(item=>
									<li>
										<img src={item.author.avatar_url}/>
										<span title="回复数">{item.reply_count}/</span>
										<span title="点击数">{item.visit_count}</span>
										【{articleTypeList[item.tab]}】
										<Link to={'/cnode/article/'+item.id}>{item.title}</Link>
									</li>
								)}
							</ul>
					}
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state)=>{
	return {
		cnodeList:state.cnode.cnodeList,
	}
}
export default connect(
	mapStateToProps,
	{getCnodeList,getCnodeListMore,getDataStart}
)(CnodeList)