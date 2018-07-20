"use strict";

//去左右空格
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
//jquery 插件
import './jqPlugins';

import tools from 'tools'
export const formatDate = tools.formatDate;
export const htmlEncode = tools.htmlEncode;
console.log("tools:",tools)
export function formatPassDate(str){

	var date = new Date(str);
	var time = new Date().getTime() - date.getTime(); //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
	if (time < 0) {
		return '';
	} else if (time / 1000 < 60) {
		return '刚刚';
	} else if ((time / 60000) < 60) {
		return parseInt((time / 60000)) + '分钟前';
	} else if ((time / 3600000) < 24) {
		return parseInt(time / 3600000) + '小时前';
	} else if ((time / 86400000) < 31) {
		return parseInt(time / 86400000) + '天前';
	} else if ((time / 2592000000) < 12) {
		return parseInt(time / 2592000000) + '月前';
	} else {
		return parseInt(time / 31536000000) + '年前';
	}
};

//获取字节长度
export function getLength(str) {
    var realLength = 0,charCode;
    for (let i = 0; i < str.length; i++)
    {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128)
            realLength += 0.5;
        else
            realLength += 1;
    }
    // console.log(realLength);
    return realLength;
}
//解析url为json
export function parseQueryString(str) {
    let search = str||window.location.search;
    // console.log("search:",search)
    search = search.substring(1);
    search = search?search.split('&'):[];
    let obj = {};
    search&&search.forEach(function (item,index) {
        let arr = item.split('=');
        // console.log("item:",item)
        obj[arr[0]]= htmlEncode(decodeURI(arr[1]))
    })
    // console.log("obj:",obj)
    return obj;
}
/**
 * 获得请求参数
 * @param url       请求路径
 * @param name      参数名
 * @returns {string}
 */
 export function getQueryString(url, name) {
    if (arguments.length === 0) {
        return false;
    } else if (arguments.length === 1) {
        name = url;
        url = location.href;
    }
    var search = /\?/.test(url) ? url.split('?')[1] : url;
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    return reg.test(search) ? RegExp.$2 : '';
}
//校验手机号是否合法
export function isTel(mobilenum){
    if(mobilenum == ""){
        return false;
    }
    var reg_phone=/^((13\d{9}$)|(15\d{9}$)|(18\d{9}$)|(14\d{9})$|(17\d{9})$)/;
    if(!reg_phone.exec(mobilenum)){
        return false;
    }
    return true;
}
//校验是否为空值
export function isEmpty(obj){
    var reg =/^\s*$/g;
    if(reg.test(obj) === false) {
        return  false;
    }
	if (obj === undefined || obj === null) {
		return true;
	}
    return true;
}
export function isCardNo(card) {
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if(reg.test(card) === false)
    {
        return  false;
    }
    return true;
}
//验证是否为汉字
export function isChinese(obj){
    // if((/^[\u4e00-\u9fa5]+/).test(obj)){
    //[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*
    if((/^[\u4e00-\u9fa5]+/).test(obj)){
        return true
    }
    return false;
}
//验证是否为2-20个汉字姓名
export function isChineseName(obj){
    if((/^[\u4E00-\u9FA5]{2,20}$/).test(obj)){
        return true
    }
    return false;
}
//是否为正整数
export function isPositiveNum(s){
    var re = /^[0-9]*[1-9][0-9]*$/ ;
    return re.test(s)
}
//是否为登录密码
export function isPassword(str) {
    // var reg = /^[a-zA-Z0-9]{8,20}$/;
    var str = str.trim();
    var reg = /[a-zA-Z]+(?=[0-9]+)|[0-9]+(?=[a-zA-Z]+)/g;
    return reg.test(str)&&str.length>=8&&str.length<=20;
}

//检查email邮箱
export function isEmail(str){
	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
	return reg.test(str);
}

//显示加载状态
export function isLoadings({ele='.list',show=true}={}) {
	let $ele = $(ele);
    let $uiLoadings = $ele.next('.ui-loadings');
    if($uiLoadings.length){
        if(show){
	        $uiLoadings.show();
        }else{
	        $uiLoadings.hide();
        }
    }else {
	    $ele.after('<div class="ui-loadings"></div>');
    }
}

export function initImgSize({ele=".list",rate}) {
	let $img= $(ele).find('.img img');
	// let viewWidth = $img.width();
	let viewWidth = $(ele).find('.img').width();
	let viewHeight;
	if(!$img.length){
		console.log("未找到图片")
		return false
	}
	//获取高度
	function getViewHeight(originRate) {
		if (!viewHeight){
			viewHeight = viewWidth/originRate;   //图片展示的高度
			// console.log("viewHeight:",viewHeight)
			return viewHeight;
		}
	}

	let originRate;  //第一种图尺寸的原始比例
	//默认比例
	if(rate){
		//设置图片的比例为默认比例
		originRate = rate;
	}
	$.each($img,function (index,item) {
		// 创建对象
		var img = new Image();
		// 改变图片的src
		img.src = $(this).attr("src");
		// console.log("img.src :",img.src);

		// 加载完成获取宽高
		img.onload = function(){
			// originRate = originRate?1: img.width/img.height;
			let width = img.width;
			let height = img.height;
			let rate = width/height;

			//获取图片展示高度
			//未获取比例时
			if(!originRate){
				originRate = width/height;
				// console.log("originRate:",originRate)
				//图片真实宽、高
				getViewHeight(originRate)

			}else{
				getViewHeight(originRate);
			}
			if(rate>=originRate){
				//宽度比例更大
				console.log(img.src, ":处理图片的宽度:",rate,viewHeight*rate,viewHeight);
				$(item).parent('.img').css({width:viewWidth,height:viewHeight});
				//图片左移动
				$(item).css({"margin-left":-Math.abs(viewHeight*rate-viewWidth)/2,height:viewHeight,width:viewHeight*rate});
			}else{
				console.log(img.src, ":处理图片的高度:",rate,viewHeight*rate,viewHeight);
				$(item).parent('.img').css({width:viewWidth,height:viewHeight});
				//图片上移动
				// $(item).css({"margin-top":-Math.abs(viewWidth/rate-viewHeight)/2})
			}
		};

	});
}
export function lazyload({ele='.list',rate=1}={}) {
    console.log("raterateraterate:",rate)
	$(ele).find('img').lazyload({
		effect: "fadeIn",
		load:function () {
			initImgSize({ele,rate});
		}
	});
}

export function isArray(arr) {
	return Object.prototype.toString.call(arr) === "[object Array]";
	// return typeof arr=='object'&&arr.constructor ==Array;
}
//是否对象
export function isObject(arr) {
	return Object.prototype.toString.call(arr) ==="[object Object]";
}
//常用方法
export const dialog = require('./dialog');
export const msg = require('./msg');
export const serialize = require('./serialize');
export const ajax = require('./ajax');
export const lodeMore = require('./lodeMore');
export const browser = require('./browser');
