/**
 * Created by 91608 on 2017/9/17.
 */
import '../sass/index.scss';
//
import * as utils from './libs/utils';
import 'slides';
$(function () {

	function initTouchSlider({width,height}) {
		var myslides =  $('.banner').slidesjs({
			width: width,
			height: height,
			navigation: false,
			play: {
				active: false,
				auto: true,
				interval: 6000,
				swap: true,
				hoverPause: true
			},
			effect: {
				slide: {
					speed: 1000
				}
			},
			callback: {
				complete: function (number,self) {
					self.play();
				}
			}

		});
	}
	if($('.banner').find('a').length){
		initTouchSlider({width:1920,height:680})
	}


	$('.advantage').on('mouseover','.hd span',function () {
		let index = $(this).index();
		$(this).addClass('on').siblings().removeClass('on')
		$('.advantage').find('.bd p').eq(index).show().siblings().hide();
	})
})