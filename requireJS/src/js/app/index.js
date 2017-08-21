define(['jquery', 'com/carousel', 'com/gotop', 'com/waterfall'], 
	function($, Carousel, GoTop, WaterFall) {
		Carousel.init($('.carousel'));
		new GoTop();
		new WaterFall();
	}
);