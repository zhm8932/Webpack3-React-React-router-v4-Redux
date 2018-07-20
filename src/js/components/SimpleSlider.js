/**
 * Created by haiming.zeng on 2017/11/20.
 */

import Slider from 'react-slick';
console.log("Slider:", Slider);

import '../../sass/includes/slick.scss';
import '../../sass/includes/slick-theme.scss';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

class SimpleSlider extends React.Component {
	render() {
		var settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1
		};
		// return (
		// 	<h1>SimpleSlider</h1>
		// )
		return (
			<Slider {...settings}>
				<div><img src={require('../../images/b-about.png')}/></div>
				<div><img src={require('../../images/b-contact.png')}/></div>
				<div><img src={require('../../images/b-jop.png')}/></div>
			</Slider>
		);
	}
}

export default SimpleSlider;