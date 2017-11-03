/**
 * Created by haiming.zeng on 2017/9/20.
 */
import '../sass/jops.scss';
import * as utils from './libs/utils'
$(function () {

	$('.select-box').select();
	let $jopList = $('.jop-list');
	$jopList.on('click','.tbody dt',function () {
		let $self = $(this);
		let id = $self.data('id');
		$self.addClass('on');
		$self.next().slideToggle().parents().siblings("dl").find('dd').slideUp();
		let jobIntro = $self.next('dd').text();
		if(jobIntro.trim()==''){
			getJopDetail($self,{jobId:id})
		}
	})

	let $position = $('.position');
	let $tbody = $('.tbody');

	function initData() {
		let jobCatId = $position.find('.on').attr('data-jobCatId'),
			cityCode = $('.citys-box').find('.active').data('code')||'',
			provinceCode = $('.provinces-box').find('.active').data('code')||'';
		return {jobCatId,cityCode,provinceCode}
	}

	$position.on('click','.cat',function () {
		$(this).addClass('on').siblings().removeClass('on');
		let jobCatId = $(this).attr('data-jobCatId');
		$.cookie('jobCatId',jobCatId)  //缓存职位id
		let {cityCode,provinceCode} = initData();
		getJopList({jobCatId,cityCode,provinceCode});
	})

	$tbody.on('click','.pagination a',function (e) {
		e.preventDefault();
		let page = $(this).data('page');
		let {jobCatId,cityCode,provinceCode} = initData();
		let data = {
			jobCatId,
			pageNo:page,
			cityCode,
			provinceCode
		}
		getJopList(data)

	})

	function getJopList(data) {
		utils.ajax({
			method:'GET',
			url:'/getJopList',
			data,
			beforeSend(){
				utils.isLoadings({ele:'.tbody'});
				$tbody.html('')
			}
		}).then(function (json) {
			console.log("json:",json)
			utils.isLoadings({ele:'.tbody',show:false});
			let template = require('views/jops/common/jop_list');
			$tbody.html(template(json));
		})
	}

	function getJopDetail($self,data) {
		utils.ajax({
			method:'GET',
			url:'/getJopDetail',
			data,
		}).then(function (json) {
			let jobIntro = ''
			if(json.success){
				jobIntro = json.data.jobIntro
			}
			$self.next('dd').html(jobIntro)
		})
	}

	$tbody.on('change','.pageNo',function () {
		let page = $(this).val();
		let pageCount = $(".pagination").data('pagecount');
		let {jobCatId,cityCode,provinceCode} = initData();

		if(isNaN(page)){
			throw new Error("页面必须为数字")
		}else{
			page = page>=pageCount?pageCount:page;
		}
		let data = {
			jobCatId:jobCatId,
			cityCode,
			provinceCode,
			pageNo:page
		}
		getJopList(data)
	});
	function getAllProvinces() {
		utils.ajax({
			url:'/getAllProvinces'
		}).then(function (json) {
			console.log("json:",json)
			let {data} = json;
			let html = '<li class="option">全部</li>';
			data.forEach((item)=>{
				html+= `<li class="option" data-code=${item.areaCode}>${item.areaName}</li>`
			})
			$('.provinces-box').find('.options').html(html);
		})
	}


	function getCitys({code}) {
		utils.ajax({
			url:'/getCitys',
			data:{code}
		}).then(function (json) {
			let {data} = json;
			let html = '<li class="option">全部</li>';
			data.forEach((item)=>{
				html+= `<li class="option" data-code=${item.areaCode}>${item.areaName}</li>`
			})
			$('.citys-box').find('.options').html(html);
			$('.citys-box').find('.text').html("城市选择")
		})
	}
	getAllProvinces();

	$('body').on('click','.provinces-box .option',function () {
		let code = $(this).data('code');
		console.log("code:",code,$position.find('on').attr('data-jobCatId'))
		let {jobCatId} = initData();
		let data = {
			jobCatId,
			provinceCode:code
		}
		getCitys({code})
		getJopList(data)
	})
	$('body').on('click','.citys-box .option',function () {
		let code = $(this).data('code');
		let {jobCatId,provinceCode} = initData();
		let data = {
			jobCatId,
			cityCode:code,
			provinceCode,
		}
		getJopList(data)
	})

})