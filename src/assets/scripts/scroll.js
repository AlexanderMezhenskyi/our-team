(() => {
	let smoothScrollTo = (function () {
		let timer, start, factor;
		return function (target, duration) {
			let offset = window.pageYOffset;
			let delta  = target - window.pageYOffset;
			duration = duration || 1000;
			start = Date.now();
			factor = 0;
			if( timer ) {
				clearInterval(timer);
			}
			function step() {
				let y;
				factor = (Date.now() - start) / duration;
				if( factor >= 1 ) {
					clearInterval(timer);
					factor = 1;
				}
				y = factor * delta + offset;
				window.scrollBy(0, y - window.pageYOffset);
			}
			timer = setInterval(step, 10);
			return timer;
		};
	}());
	document.addEventListener('DOMContentLoaded', () => {
		document.querySelectorAll('.ma-menu__link').forEach((scrollLink) => {
			scrollLink.addEventListener('click', (event) => {
				let anchor = scrollLink.getAttribute('href');
				let anchorTo = document.querySelector(anchor);
				event.preventDefault();
				smoothScrollTo(anchorTo.offsetTop, 1000);
			});
		})
	});
})();