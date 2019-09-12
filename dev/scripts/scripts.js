document.addEventListener("DOMContentLoaded", test);

function test() {
	var sliderOne = wRunner({
		roots: document.getElementById('exm1'),
	});

	var sliderTwo = wRunner({
		roots: document.getElementById('exm2'),
		styles: {
			direction: {
				value: 'vertical'
			}
		},
		step: 5,
		type: 'range'
	});

	// Для проверок.
	setTimeout(() => {
	}, 3000)
};