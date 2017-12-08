/**
 * Created by haiming.zeng on 2017/10/27.
 */
import {connect} from 'react-redux';
import fetchs from '../libs/utils/fetch';
import * as utils from '../libs/utils';

const Index = ()=>(
	<div className="wrapper">
		<p>首页</p>
		<div>
			随着 Node.js v8 的发布，Node.js 已原生支持 async/await 函数，Web 框架 Koa 也随之发布了 Koa 2 正式版，支持 async/await 中间件，为处理异步回调带来了极大的方便。

			既然 Koa 2 已经支持 async/await 中间件了，为什么不直接用 Koa，而还要去改造 Express 让其支持 async/await 中间件呢？因为 Koa 2 正式版发布才不久，而很多老项目用的都还是 Express，不可能将其推倒用 Koa 重写，这样成本太高，但又想用到新语法带来的便利，那就只能对 Express 进行改造了，而且这种改造必须是对业务无侵入的，不然会带来很多的麻烦。
		</div>
	</div>
)

function f(y) {
	console.log("y:",y,"this:",this)
	return this.x+y
}
function f1(x,y) {
	console.log("x:",x,"y:",y,)
	return x+y
}
function f2(y,{z}) {
	console.log("z:",z,"y:",y,"this:",this)
	return this.x+y+z
}
var o = {
	x:10
}
var g = f.bind(o)
var g1 = f1.bind(null,5)
var g2 = f2.bind({x:3,m:1},5)
console.log("g:",g(3))
console.log("g1:",g1(7))
console.log("g2:",g2({z:7}))

let s1 = Symbol()
let s2 = Symbol()
console.log("s1:",s1,"s2:",s2,s1==s2,s1===s2)

o[s1] = 'sss1';
o[s2] = 'sss2';

let o2 = {
	[s1]: 'ssss1',
	[s2]: 'ssss2'
}
console.log("o:",o,o[s1]==o[s2])
console.log("o2:",o2)

function test() {
	let obj1 = {a:0,b:{c:0},[Symbol('dd')]:1};
	let obj2 = Object.assign({},obj1);
	console.log("obj1:",obj1)
	console.log("obj2:",obj2)

	obj1.a = 1;
	console.log("obj1:",obj1)
	console.log("obj1:",JSON.stringify(obj1))
	console.log("obj2:",JSON.stringify(obj2))

	obj2.a = 2;
	console.log("obj1:",JSON.stringify(obj1))
	console.log("obj2:",JSON.stringify(obj2))

	obj2.b.c = 3;

	console.log("obj1:",JSON.stringify(obj1))
	console.log("obj2:",JSON.stringify(obj2))
	console.log("obj2:",obj2)
	let obj3 = ''
}

// test()

async function getTopic(data) {
	console.log("data：",data)
	let result = await fetchs({url:'https://cnodejs.org/api/v1/topics',data})
	console.log("result:",result,utils)
	if(result.code==200){

	}else{
		console.log("result.message:",result.message)
		utils.msg({title:result.message,delayTime:5000})
	}

}
getTopic({
	page:1,
	limits:20,
	tab:'all'
})
export default Index