document.addEventListener("DOMContentLoaded", test);

function test() {
	var sliderOne = wRunnerNative({
		roots: document.getElementById('exm1'),
	});

	var sliderTwo = wRunnerNative({
		roots: document.getElementById('exm2'),
		styles: {
			direction: {
				value: 'vertical'
			}
		},
		step: 5,
		type: 'range'
	});

	var sliderThree = $('#exm3').wRunner({
		roots: document.getElementById('exm2'),
		styles: {
			direction: {
				value: 'vertical'
			}
		},
		step: 5,
		type: 'range'
	});

	var sliderThree = $('#exm4').wRunner({
		divisionsCount: 2,
		type: 'range'
	});

	// Для проверок.
	setTimeout(() => {
	}, 3000)
};