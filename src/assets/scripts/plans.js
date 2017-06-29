$(document).ready(function () {
	$('.ma-plan__btn--basic').hover(function () {
		$('.ma-plan__title--basic').toggleClass('ma-plan-active');
	});
});

$(document).ready(function () {
	$('.ma-plan__btn--pro').hover(function () {
		$('.ma-plan__title--pro').toggleClass('ma-plan-active');
	});
});

$(document).ready(function () {
	$('.ma-plan__btn--premium').hover(function () {
		$('.ma-plan__title--premium').toggleClass('ma-plan-active');
	});
});