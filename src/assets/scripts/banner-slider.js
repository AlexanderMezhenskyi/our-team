$(document).ready(function () {
	$('.ma-slider').slick({
		slidesToShow:1,
		slidesToScroll: 1,
		dots: false,
		arrows: true,
		infinite: true,
		adaptiveHeight: true,
		responsive: [
			{
				breakpoint: 570,
				settings: {
					arrows: false
				}
			}]
	});
});