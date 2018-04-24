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

var o3 = {
	name:"张三",
	age:'25',
	phone:'13588889999'
}
let map = new Map();
map.set("name","李四")
map.set("age","22")

console.log("o3:",o3);
for(let [key,value] of map){
	console.log("key:",key,"value:",value)
}

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

let str = 'hello world';
console.log("str1:",str.startsWith('he'),str.startsWith('wor'))
console.log("str2:",str.includes('he'),str.includes('wor'))




export default Index