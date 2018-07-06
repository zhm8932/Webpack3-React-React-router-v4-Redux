
import {connect} from 'react-redux'
import {Route,Redirect} from 'react-router-dom';

class AuthorizedRoute extends React.Component{
	render(){
		const { component: Component, isAuthenticated, ...rest } = this.props;

		console.log("登录权限验证",isAuthenticated,Component)
		return(
			<Route {...rest} render={props => (
				isAuthenticated ? (
					<Component {...props}/>
				) : (
					<Redirect to={{
						pathname: '/login',
						state: { from: props.location }
					}}/>
				)
			)}/>
		)
	}
}
const mapStateToProps = state=>({
	isAuthenticated:state.users.login.isAuthenticated
})


export default connect(mapStateToProps)(AuthorizedRoute)