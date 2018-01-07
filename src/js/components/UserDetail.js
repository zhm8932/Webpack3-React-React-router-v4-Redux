/**
 * Created by haiming.zeng on 2017/10/31.
 */

import {formatDate, formatPassDate} from '../libs/utils'
import {Link} from 'react-router-dom';
class UserDetail extends React.Component {
	componentDidMount() {
		this.props.getUserDetail();
		this.props.getTopicCollect();
	}

	shouldComponentUpdate(nextProps, nextState) {
		//如果是刷新页面时就在此页面，加载一次数据
		console.log("nextProps:", nextProps, "nextState:", nextState)
		return this.props.userDetail.isFetching && !nextProps.isFetching
	}

	componentWillReceiveProps(nextProps) {
		console.log("this-Props:", nextProps.match.params.id, this.props.match.params.id)
		if (nextProps.match.params.id !== this.props.match.params.id) {
			console.log("99999999999")
			this.props.getUserDetail();
			this.props.getTopicCollect();
		}
	}

	render() {
		console.log("this.props333333333:", this.props)
		let {json, isFetching} = this.props.userDetail;
		let {topicCollect, userDetail} = this.props;
		// console.log("topicCollect:",topicCollect)
		// console.log("userDetail:",userDetail)
		if (isFetching) {
			return (
				<div>数据请求中……</div>
			)
		}
		console.log("jsonjson:", json.success, json)
		if (!json.success) {
			return (
				<div></div>
			)
		}
		let {data} = json;
		return (
			<div className="wrapper">
				<div className="pd">
					<img className="avatar" src={data.avatar_url} alt=""/>
					<h2>{data.loginname}</h2>
					<time>{formatDate(data.create_at, 'YYYY-MM-DD hh:mm:ss')}</time>
					<p>积分：{data.score}</p>
					<p>{data.recent_topics.length}个话题收藏</p>
				</div>
				{
					data.recent_topics.length ?
						<div className="panel-list">
							<h2 className="tit">最近创建的话题</h2>
							<ul>
								{data.recent_topics.map(item =>
									<li>
										<img className="avatar" src={item.author.avatar_url}/>
										<Link to={'/cnode/article/' + item.id}>{item.title}</Link>
										<time>{formatPassDate(item.last_reply_at)}</time>
									</li>
								)}
							</ul>
						</div> :
						''
				}

				<div className="panel-list">
					<h2 className="tit">最近参与的话题</h2>
					<ul>
						{data.recent_replies.map(item =>
							<li>
								<Link to={`/user/${item.author.loginname}`} className="avatar"><img
									src={item.author.avatar_url}/></Link>
								<Link to={'/cnode/article/' + item.id}>{item.title}</Link>
								<time>{formatPassDate(item.last_reply_at)}</time>
							</li>
						)}
					</ul>
				</div>
			</div>
		)
	}
}

export default UserDetail