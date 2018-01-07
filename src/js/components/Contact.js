import Tloader from 'react-touch-loader';
import '../../sass/contact.scss';
import {getWindowHeight} from '../libs/utils/getSize';
class Contact extends React.Component {
	constructor() {
		super();
		this.state = {
			canRefreshResolve: 1,
			listLen: 0,
			hasMore: 0,
			initializing: 1,
			refreshedAt: Date.now()
		};
	}

	refresh(resolve, reject) {
		setTimeout(() => {
			if (!this.state.canRefreshResolve) return reject();

			this.setState({
				listLen: 9,
				hasMore: 1,
				refreshedAt: Date.now()
			});
			resolve();
		}, 2e3);
	}

	loadMore(resolve) {
		setTimeout(() => {
			var l = this.state.listLen + 9;

			this.setState({
				listLen: l,
				hasMore: l > 0 && l < 50
			});

			resolve();
		}, 2e3);
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				listLen: 9,
				hasMore: 1,
				initializing: 2 // initialized
			}, function () {

			});
		}, 2e3);
	}

	componentDidUpdate() {

	}

	toggleCanRefresh() {
		this.setState({canRefreshResolve: !this.state.canRefreshResolve});
	}

	render() {
		var {listLen, hasMore, initializing, refreshedAt} = this.state;
		var list = [];

		if (listLen) {
			for (var i = 0; i < listLen; i++) {
				list.push(
					<li key={i}>
						<p>{i}</p>
					</li>
				);
			}
		}
		return (
			<div className="view" ref='view-box'>
				<h1>react-touch-loader {refreshedAt.toString().substr(7)}</h1>

				<Tloader className="main"
						 onRefresh={(resolve, reject) => this.refresh(resolve, reject)}
						 onLoadMore={(resolve) => this.loadMore(resolve)}
						 hasMore={hasMore}
						 initializing={initializing}>
					<ul>{list}</ul>
				</Tloader>
			</div>
		);
	}
}

export default Contact;