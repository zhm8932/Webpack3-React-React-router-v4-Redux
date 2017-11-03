/**
 * Created by haiming.zeng on 2017/9/20.
 */
import '../sass/contacts.scss';
import * as utils from './libs/utils'
import 'slides';

$(function () {

	$("#partner").slidesjs({
		width: 940,
		height: 198,
		navigation: false,
		pagination: false,
	});

	let $form = $('.form');
	//提交留言
	$form.on('click','.submit-btn',function () {

		let imgCode = $.cookie('imgCode');
		let $self = $(this);
		let serialize = utils.serialize();

		if(!serialize.verifyCode){
			return handleMessage({name:'verifyCode',message:'请输入验证码'})
		}
		if(!serialize.custName){
			return handleMessage({name:'custName',message:'请输入您的称呼'})
		}else if(serialize.custName.length>8){
			return handleMessage({name:'custName',message:'输入的字符超出限制，请重新输入'})
		}
		if(!serialize.cellphone){
			return handleMessage({name:'cellphone',message:'请输入您的手机号码'})
		}else if(!utils.isTel(serialize.cellphone)){
			return handleMessage({name:'cellphone',message:'手机号码格式有误，请重新输入'})
		}
		if(!serialize.email){
			return handleMessage({name:'email',message:'请输入联系邮箱'});
			// return utils.msg({title:'请输入联系邮箱'})
		}else if(!utils.isEmail(serialize.email)){
			return handleMessage({name:'email',message:'邮箱格式有误，请重新输入'})
		}
		if(serialize.content.length>200){
			return handleMessage({name:'content',message:'输入的字符超出限制，请重新输入'})
		}

		utils.ajax({
			url:'/saveCustomerNote',
			method:'POST',
			data:serialize,
			$self,
			beforeSend(){
				$self.disable('<i class="ui-loadings"></i>提交中')
			}
		}).then(function (json) {
			$self.enable("提交")
			if(json.success){
				utils.msg({title:"留言成功"})
				utils.serialize('.form',true);
				getCaptcha();
			}else{
				utils.msg({title:json.msg||json.message})
				getCaptcha();
			}
		}).catch(function (err) {
			console.log("err:",err)
		})

	})

	function getCaptcha() {
		// $('.verifyCode').attr('src',captchaPath+"?__="+Date.now()+"")
		utils.ajax({
			url:'/getCaptcha',
			method:'POST'
		}).then(function (json) {
			let {data,success} = json;
			if(success){
				$('.verifyCode').attr('src','data:image/png;base64,'+data.bytes)
				$('.imageCaptchaId').val(data.imageCaptchaId);
			}
		})
	}
	getCaptcha();
	$('.verifyCode').click(function () {
		getCaptcha();
	})
	function handleMessage({name,message}) {
		let $name = $form.find('input[name='+name+']')
		let $p =  $name.next('p');
		if(!$p.length){
			$name.after(`<p>*${message}</p>`)
		}else{
			$p.html(message)
		}
		return false
	}

	$('body').on('keydown','input',function () {
		$(this).next('p').remove()
	})
	if($("#allmap").length){
		initBMap();
	}
	function initBMap() {
		// 百度地图API功能
		var mp = new BMap.Map("allmap");
		var point = new BMap.Point(114.072527,22.544801);
		mp.centerAndZoom(point, 20);
		// mp.enableScrollWheelZoom();

		// 复杂的自定义覆盖物
		function ComplexCustomOverlay(point, text, mouseoverText){
			this._point = point;
			this._text = text;
			this._overText = mouseoverText;
		}
		ComplexCustomOverlay.prototype = new BMap.Overlay();
		ComplexCustomOverlay.prototype.initialize = function(map){
			this._map = map;
			var div = this._div = document.createElement("div");
			div.style.position = "absolute";
			div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
			div.style.backgroundColor = "#ff6555";
			div.style.border = "1px solid #ff6555";
			div.style.color = "white";
			div.style.height = "48px";
			// div.style.padding = "2px";
			// div.style.lineHeight = "20px";
			// div.style.whiteSpace = "nowrap";
			div.style.MozUserSelect = "none";
			div.style.fontSize = "16px"
			// div.style.padding = "12px"
			div.className='BMap_tips';
			var span = this._span = document.createElement("span");
			div.appendChild(span);
			span.appendChild(document.createTextNode(this._text));
			var that = this;

			var arrow = this._arrow = document.createElement("div");
			// arrow.style.background = "url(http://map.baidu.com/fwmap/upload/r/map/fwmap/static/house/images/label.png) no-repeat";
			arrow.style.background = "url(/images/map-arrow.png) no-repeat";
			arrow.style.position = "absolute";
			arrow.style.width = "23px";
			arrow.style.height = "30px";
			arrow.style.top = "60px";
			arrow.style.left = "10px";
			arrow.style.overflow = "hidden";
			arrow.className='BMap_arrow';
			div.appendChild(arrow);

			div.onmouseover = function(){
				this.style.backgroundColor = "#ff6555";
				this.style.borderColor = "#0000ff";
				this.getElementsByTagName("span")[0].innerHTML = that._overText;
				// arrow.style.backgroundPosition = "0px -20px";
			}

			div.onmouseout = function(){
				this.style.backgroundColor = "#ff6555";
				this.style.borderColor = "#ff6555";
				this.getElementsByTagName("span")[0].innerHTML = that._text;
				arrow.style.backgroundPosition = "0px 0px";
			}

			mp.getPanes().labelPane.appendChild(div);

			return div;
		}
		ComplexCustomOverlay.prototype.draw = function(){
			var map = this._map;
			var pixel = map.pointToOverlayPixel(this._point);
			this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
			this._div.style.top  = pixel.y - 115 + "px";
		}
		var txt = "深圳市明日科技咨询有限责任公司", mouseoverTxt = txt +"总部" ;

		var myCompOverlay = new ComplexCustomOverlay(point, mouseoverTxt,mouseoverTxt);

		mp.addOverlay(myCompOverlay);

		var marker = new BMap.Marker(point);// 创建标注
		mp.addOverlay(marker);             // 将标注添加到地图中
		marker.disableDragging();
		// marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
	}

})