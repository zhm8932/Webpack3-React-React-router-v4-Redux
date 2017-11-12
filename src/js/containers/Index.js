/**
 * Created by haiming.zeng on 2017/10/27.
 */
import {connect} from 'react-redux';


const Index = ()=>(
	<div className="wrapper">
		<p>首页</p>
	</div>
)

function f(y) {
	return this.x+y
}
var o = {
	x:1
}
var g = f.bind(o)
console.log("g:",g)
export default Index