/**
 * Created by 91608 on 2017/9/17.
 */
import * as utils from 'libs/utils';
import '../../sass/abouts.scss';

$(function () {
	let $introduce = $('.introduce');
	let $tit = $('.tit');
	let $body = $(window);

	$introduce.on('mouseover','.hd span',function () {
		$(this).addClass('on').siblings().removeClass('on')
		let index = $(this).index();
		$introduce.find('.bd aside').eq(index).show().siblings().hide();

	});
	let topHeight = $('.ads').outerHeight(true)+$('.header').outerHeight(true);
	let $header = $('.about').find('header');
	let titHeight = $tit.height();
	$tit.on('click','span',function () {
		$(this).addClass('on').siblings().removeClass('on');
		let curType = $(this).data('type');
		let offsetTop = '';
		$.each($header,function (index,item) {
			let id = $(item).attr('id');
			if(id==curType){
				offsetTop = $(item).offset().top;
			}
		});
		$('body,html').scrollTop(offsetTop-titHeight/2);
	})

	//固定子菜单
	$(window).scroll(function () {
		let scrollTop = $body.scrollTop();
		if(scrollTop>=topHeight){
			$tit.addClass('fixed')
			$header.each((index,item)=>{
				let itemOffsetTop = $(item).offset().top;
				let id = $(item).attr('id');
				if(scrollTop>=itemOffsetTop-titHeight){
					$tit.find('span[data-type='+id+']').addClass('on').siblings().removeClass('on');
				}
			})
		}else{
			$tit.removeClass('fixed')
		}
	})
})