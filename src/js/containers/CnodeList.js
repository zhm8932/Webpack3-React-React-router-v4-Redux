/**
 * Created by haiming.zeng on 2017/10/29.
 */
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getCnodeList,getCnodeListMore,getDataStart} from '../actions'
import {getScrollTop,getWindowHeight,getScrollHeight} from '../libs/utils/getSize';
import NavBar from '../components/NavBar';
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
		this.scrollTop=0;
		this.handleScroll = this.handleScroll.bind(this)
	}
	componentWillMount(){
		console.log("componentWillMount:")
	}
	componentDidMount(){
		console.log("componentDidMount 社区:",this.props,"this:",this)
		this.props.getCnodeList({
			page:1,
			limit:20,
			tab:'all'
		});
		const scrollEl = window;
		// console.log("this.refs.listBox:",this.refs.listBox)


		const scrollTop = getScrollTop();
		document.addEventListener('scroll',this.handleScroll);
		console.log("scrollTop3333333:",scrollTop,getWindowHeight())
		if(scrollTop){

			// window.scrollTo(0,scrollTop)
		}

		if (this.refs.listBox) {
			console.log("getScrollHeight:",getScrollHeight())
			console.log("getScrollTop:",getScrollTop())
			console.log("getWindowHeight:",getWindowHeight(),"this.windowHeight:",this.windowHeight,document.documentElement.clientHeight,"clientHeight:",document.body.clientHeight,"window.innerHeight:",window.innerHeight)
			// console.log("监听滚动scrollEl：",scrollEl,document.body.clientHeight)
			// console.log("网页可见区域高：",document.body.clientHeight,"document.body.offsetHeight:",document.body.offsetHeight)
			// console.log("screen：",document.body.scrollHeight,"window.screen:",window.screen)

			// this.refs.listBox.addEventListener('scroll',this.handleScroll)
		}
	}
	componentWillUnmount(){

		document.removeEventListener('scroll', this.handleScroll);
		this.scrollTop = getScrollTop();
		window.scrollTo(0,this.scrollTop)
	}
	componentWillReceiveProps(nextProps){
		console.log("nextProps222222222:",nextProps,getWindowHeight())

	}
	componentDidUpdate(){
		console.log("this.scrollTop--componentDidUpdate:",this.scrollTop)

		// this.scrollTop&&window.scrollTo(0,this.scrollTop)
	}
	handleScroll(event){
		// console.log("网页可见区域高222：",document.body.clientHeight,"document.body.offsetHeight:",document.body.offsetHeight)

		let offset
		const el = this.selfComponent
		// let scrollTop = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop
		// offset = this.calcTop(el) + el.offsetHeight - scrollTop - window.innerHeight

		this.windowHeight = getWindowHeight();

		const scrollTop = getScrollTop();
		const scrollHeight = getScrollHeight();
		// console.log("window.pageYOffset:",window.pageYOffset,"event",event)
		// console.log("window.pageYOffset:",window.pageYOffset,"windowHeight:",windowHeight)


		// console.log("getWindowHeight:",getWindowHeight())
		// console.log("getScrollTop:",getScrollTop(),"差值",scrollHeight-this.windowHeight-scrollTop)

		let {cnodeList} = this.props;
		const isBottom = (scrollTop + this.windowHeight >= scrollHeight-10)
		console.log('is bottom:' + isBottom,"scrollTop:",scrollTop,"scrollHeight：",scrollHeight,"windowHeight:",this.windowHeight,scrollHeight-scrollTop )

		if(isBottom){
			if(cnodeList.isEnd){
				this.props.getDataStart()
				console.log("加载下一页:",cnodeList.isEnd,"scrollTop：",scrollTop,"scrollHeight：",scrollHeight)
				this.props.getCnodeListMore({
					page:cnodeList.page+1,
					limit:20,
					tab:cnodeList.articleType
				});
				this.scrollTop = scrollTop;

			}
		}

	}
	render(){

		let {cnodeList,...props} = this.props;
		let {data} = cnodeList;

		console.log("cnode11111111111:",this.props);
		// props.ref = node => { this.selfComponent = node }
		return(
			<div className="wrapper list-wrapper">
				<NavBar getDataStart={props.getDataStart} getCnodeList={props.getCnodeList} articleType={cnodeList.articleType} articleTypeList={articleTypeList}/>
				<div className="lists">
					<ul>
						{data.map(item=>
							<li key={item.id}>
								<img src={item.author.avatar_url}/>
								<span title="回复数">{item.reply_count}/</span>
								<span title="点击数">{item.visit_count}</span>
								【{articleTypeList[item.tab]}】
								<Link to={'/cnode/article/'+item.id}>{item.title}</Link>
							</li>
						)}
					</ul>
				</div>
				<div className="list-footer">
					{cnodeList.isFetching?<p>加载中……</p>:''}
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
	{getCnodeList,getCnodeListMore,getDataStart,}
)(CnodeList)