/**
 * Created by haiming.zeng on 2017/11/3.
 */
//滚动条在Y轴上滚动的距离
export function getScrollTop() {
	let bodyScrollTop = 0,
		documentScrollTop = 0;
	// console.log("window.pageYOffset:",window.pageYOffset)

	if (document.body) {
		bodyScrollTop = document.body.scrollTop;
	}
	if (document.documentElement) {
		documentScrollTop = document.body.scrollTop;
	}
	// console.log("bodyScrollTop:",bodyScrollTop,"documentScrollTop:",documentScrollTop)
	// console.log("document.body.clientHeight:",document.body.clientHeight,"document.documentElement.clientHeight:",document.documentElement.clientHeight)
	if (window.pageYOffset) {
		return window.pageYOffset;
	}
	return (bodyScrollTop - documentScrollTop > 0) ?
		bodyScrollTop :
		documentScrollTop;
}

//文档的总高度
export function getScrollHeight() {
	return document.documentElement.scrollTop == 0 ?
		document.body.scrollHeight :
		document.documentElement.scrollHeight;
}

//浏览器窗口高度
export const getWindowHeight = () => (
	window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
	// document.documentElement.scrollTop==0?
	// 	document.body.clientHeight:
	// 	document.documentElement.clientHeight
);