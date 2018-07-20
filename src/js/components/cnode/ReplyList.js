/**
 * Created by haiming.zeng on 2017/10/31.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

export default class ReplyList extends React.Component{
	// static PropTypes={
	// 	replies:PropTypes.number.isRequired,
	// 	onTodoClick: PropTypes.func.isRequired
	// }
	render(){
		let {replies} = this.props;
		console.log("replies:",replies);
		if(replies.length){
			return (
				<div className="reply-box">
					<h2>回复</h2>
					<ul>
						{replies.map(item=>
							<li>
								<Link to={`/user/${item.author.loginname}`}><img className="avatar" src={item.author.avatar_url}/></Link>
								<p>{item.author.loginname}</p>
								<div className="content" dangerouslySetInnerHTML={{__html:item.content}}></div>
							</li>
						)}
					</ul>
				</div>
			);
		}else{
			return null;
		}

	}
}

ReplyList.PropTypes = {
	replies:PropTypes.number.isRequired,
	onTodoClick: PropTypes.func.isRequired
};