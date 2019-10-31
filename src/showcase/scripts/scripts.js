document.addEventListener("DOMContentLoaded", test);

function test() {
	makeSlider(0, {
		roots: document.getElementsByClassName("js-sample__instance")[0],
	}, "native");

	makeSlider(1, {
		roots: document.getElementsByClassName("js-sample__instance")[1],
		direction: "vertical",
		step: 5,
		type: "range"
	}, "native");

	makeSlider(2, {
		divisionsCount: 16,
		direction: "vertical",
		step: 5,
		type: "range"
	});

	makeSlider(3, {
		valueNoteDisplay: false,
		divisionsCount: 0
	});

	// Для проверок.
	setTimeout(() => {
	}, 3000);


	function makeSlider(index, options, type) {
		var sliders = [];

		var controllersHolders = document
			.getElementsByClassName("js-sample")[index]
			.getElementsByClassName("js-sample__parameterValue");
		var stepController = controllersHolders[0].children[0],
			minLimitController = controllersHolders[1].children[0],
			maxLimitController = controllersHolders[2].children[0],
			typeControllers = controllersHolders[3].children,
			valueController = controllersHolders[4].children[0],
			minValueController = controllersHolders[5].children[0],
			maxValueController = controllersHolders[6].children[0],
			rootsController = controllersHolders[7].children[0],
			directionControllers = controllersHolders[8].children,
			valueNoteDisplayController = controllersHolders[9].children[0],
			divisionsCountController = controllersHolders[10].children[0];

		options = Object.assign(options, {
			onStepUpdate: function(step) {
				stepController.value = step;
			},

			onLimitsUpdate: function(limits) {
				minLimitController.value = limits.minLimit;
				maxLimitController.value = limits.maxLimit;
			},

			onValueUpdate: function(value) {
				if (value.value !== undefined) {
					valueController.value = value.value;
				}
				if (value.minValue && value.minValue !== undefined || value.maxValue && value.maxValue !== undefined) {
					minValueController.value = value.minValue;
					maxValueController.value = value.maxValue;
				}
			},

			onTypeUpdate: function(type) {
				if (type.value === typeControllers[0].children[0].value) {
					typeControllers[0].children[0].checked = true;

					minValueController.parentNode.parentNode.style.visibility = "hidden";
					maxValueController.parentNode.parentNode.style.visibility = "hidden";
					valueController.parentNode.parentNode.style.visibility = "visible";
				}
				if (type.value === typeControllers[1].children[0].value) {
					typeControllers[1].children[0].checked = true;

					valueController.parentNode.parentNode.style.visibility = "hidden";
					minValueController.parentNode.parentNode.style.visibility = "visible";
					maxValueController.parentNode.parentNode.style.visibility = "visible";
				}
			},

			onDivisionsCountUpdate: function(count) {
				divisionsCountController.value = count;
			},

			onValueNoteDisplayUpdate: function(value) {
				valueNoteDisplayController.checked = value;
			},

			onRootsUpdate: function(roots) {
				$roots = $(roots);
				var str = "";
				for (var i = 0; i < $roots[0].classList.length; i++) {
					str+= "." + $roots[0].classList[i];
				}
				rootsController.value = str;
			},

			onDirectionUpdate: function(direction) {
				if (direction.value === directionControllers[0].children[0].value) {
					directionControllers[0].children[0].checked = true;
				}
				if (direction.value === directionControllers[1].children[0].value) {
					directionControllers[1].children[0].checked = true;
				}
			}
		});


		// Creating sliders
		if (type == "native") {
			sliders[index] = window.wRunner(options);
		} else {
			sliders[index] = $($(".js-sample__instance")[index]).wRunner(options);
		}


		// Change slider parameters using conrtollers
		stepController.addEventListener("focus", (e) => {
			var snapshot = stepController.value;
			stepController.addEventListener("keydown", keyPressHandler);
			stepController.addEventListener("blur", () => {
				stepController.removeEventListener("keydown", keyPressHandler);
			});

			function keyPressHandler(e) {
				if (e.key === "Enter") {
					sliders[index].setStep(stepController.value);
					stepController.blur();
				}
				if (e.key === "Escape") {
					stepController.value = snapshot;
					stepController.blur();
				}
			}
		});

		minLimitController.addEventListener("focus", (e) => {
			var snapshot = minLimitController.value;
			minLimitController.addEventListener("keydown", keyPressHandler);
			minLimitController.addEventListener("blur", () => {
				minLimitController.removeEventListener("keydown", keyPressHandler);
			});

			function keyPressHandler(e) {
				if (e.key === "Enter") {
					sliders[index].setLimits({minLimit: minLimitController.value});
					minLimitController.blur();
				}
				if (e.key === "Escape") {
					minLimitController.value = snapshot;
					minLimitController.blur();
				}
			}
		});

		maxLimitController.addEventListener("focus", (e) => {
			var snapshot = maxLimitController.value;
			maxLimitController.addEventListener("keydown", keyPressHandler);
			maxLimitController.addEventListener("blur", () => {
				maxLimitController.removeEventListener("keydown", keyPressHandler);
			});

			function keyPressHandler(e) {
				if (e.key === "Enter") {
					sliders[index].setLimits({maxLimit: maxLimitController.value});
					maxLimitController.blur();
				}
				if (e.key === "Escape") {
					maxLimitController.value = snapshot;
					maxLimitController.blur();
				}
			}
		});

		valueController.addEventListener("focus", (e) => {
			var snapshot = valueController.value;
			valueController.addEventListener("keydown", keyPressHandler);
			valueController.addEventListener("blur", () => {
				valueController.removeEventListener("keydown", keyPressHandler);
			});

			function keyPressHandler(e) {
				if (e.key === "Enter") {
					sliders[index].setSingleValue(valueController.value);
					valueController.blur();
				}
				if (e.key === "Escape") {
					valueController.value = snapshot;
					valueController.blur();
				}
			}
		});

		minValueController.addEventListener("focus", (e) => {
			var snapshot = minValueController.value;
			minValueController.addEventListener("keydown", keyPressHandler);
			minValueController.addEventListener("blur", () => {
				minValueController.removeEventListener("keydown", keyPressHandler);
			});

			function keyPressHandler(e) {
				if (e.key === "Enter") {
					sliders[index].setRangeValue({minValue: minValueController.value});
					minValueController.blur();
				}
				if (e.key === "Escape") {
					minValueController.value = snapshot;
					minValueController.blur();
				}
			}
		});

		maxValueController.addEventListener("focus", (e) => {
			var snapshot = maxValueController.value;
			maxValueController.addEventListener("keydown", keyPressHandler);
			maxValueController.addEventListener("blur", () => {
				maxValueController.removeEventListener("keydown", keyPressHandler);
			});

			function keyPressHandler(e) {
				if (e.key === "Enter") {
					sliders[index].setRangeValue({maxValue: maxValueController.value});
					maxValueController.blur();
				}
				if (e.key === "Escape") {
					maxValueController.value = snapshot;
					maxValueController.blur();
				}
			}
		});

		typeControllers[0].children[0].addEventListener("click", (e) => {
			sliders[index].setType(typeControllers[0].children[0].value);
		});

		typeControllers[1].children[0].addEventListener("click", (e) => {
			sliders[index].setType(typeControllers[1].children[0].value);
		});

		divisionsCountController.addEventListener("focus", (e) => {
			var snapshot = divisionsCountController.value;
			divisionsCountController.addEventListener("keydown", keyPressHandler);
			divisionsCountController.addEventListener("blur", () => {
				divisionsCountController.removeEventListener("keydown", keyPressHandler);
			});

			function keyPressHandler(e) {
				if (e.key === "Enter") {
					sliders[index].setDivisionsCount(divisionsCountController.value);
					divisionsCountController.blur();
				}
				if (e.key === "Escape") {
					divisionsCountController.value = snapshot;
					divisionsCountController.blur();
				}
			}
		});

		valueNoteDisplayController.addEventListener("input", (e) => {
			sliders[index].setValueNoteDisplay(valueNoteDisplayController.checked);
		});

		directionControllers[0].children[0].addEventListener("click", (e) => {
			sliders[index].setDirection(directionControllers[0].children[0].value);
		});

		directionControllers[1].children[0].addEventListener("click", (e) => {
			sliders[index].setDirection(directionControllers[1].children[0].value);
		});
	}
}