document.addEventListener("DOMContentLoaded", test);

function test() {
	makeSlider(0, {
		roots: document.getElementsByClassName("js-sample__instance")[0]
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

		var $controllersHolders = $($(".js-sample")[index]).find(".js-sample__parameterValue");
		var $stepController = $controllersHolders.eq(0).find("input"),
			$minLimitController = $controllersHolders.eq(1).find("input"),
			$maxLimitController = $controllersHolders.eq(2).find("input"),
			$typeControllers = [$controllersHolders.eq(3).find("input").eq(0), $controllersHolders.eq(3).find("input").eq(1)],
			$valueController = $controllersHolders.eq(4).find("input"),
			$minValueController = $controllersHolders.eq(5).find("input"),
			$maxValueController = $controllersHolders.eq(6).find("input"),
			$rootsController = $controllersHolders.eq(7).find("input"),
			$directionControllers = [$controllersHolders.eq(8).find("input").eq(0), $controllersHolders.eq(8).find("input").eq(1)],
			$valueNoteDisplayController = $controllersHolders.eq(9).find("input"),
			$divisionsCountController = $controllersHolders.eq(10).find("input");

		options = Object.assign(options, {
			onStepUpdate: function(step) {
				$stepController.val(step);
			},

			onLimitsUpdate: function(limits) {
				$minLimitController.val(limits.minLimit);
				$maxLimitController.val(limits.maxLimit);
			},

			onTypeUpdate: function(type) {
				if (type.value === $typeControllers[0].val()) {
					$typeControllers[0][0].checked = true;

					$minValueController.parent().parent().css("visibility", "hidden");
					$maxValueController.parent().parent().css("visibility", "hidden");
					$valueController.parent().parent().css("visibility", "visible");
				}
				if (type.value === $typeControllers[1].val()) {
					$typeControllers[1][0].checked = true;

					$valueController.parent().parent().css("visibility", "hidden");
					$minValueController.parent().parent().css("visibility", "visible");
					$maxValueController.parent().parent().css("visibility", "visible");
				}
			},

			onValueUpdate: function(value) {
				if (value.value !== undefined) {
					$valueController.val(value.value);
				}
				if (value.minValue && value.minValue !== undefined || value.maxValue && value.maxValue !== undefined) {
					$minValueController.val(value.minValue);
					$maxValueController.val(value.maxValue);
				}
			},

			onRootsUpdate: function(roots) {
				var $roots = $(roots);
				var str = "";
				for (var i = 0; i < $roots[0].classList.length; i++) {
					str+= "." + $roots[0].classList[i];
				}
				$rootsController.value = str;
			},

			onDirectionUpdate: function(direction) {
				if (direction.value === $directionControllers[0].val()) {
					$directionControllers[0][0].checked = true;
				}
				if (direction.value === $directionControllers[1].val()) {
					$directionControllers[1][0].checked = true;
				}
			},

			onValueNoteDisplayUpdate: function(value) {
				$valueNoteDisplayController[0].checked = value;
			},

			onDivisionsCountUpdate: function(count) {
				$divisionsCountController.val(count);
			}
		});


		// Creating sliders
		if (type == "native") {
			sliders[index] = window.wRunner(options);
		} else {
			sliders[index] = $($(".js-sample__instance")[index]).wRunner(options);
		}


		// Change slider parameters using conrtollers
		$stepController.on("focus", (e) => {
			var snapshot = $stepController.val();
			$stepController.on("keydown", keyPressHandler);
			$stepController.on("blur", () => {
				$stepController.off("keydown", keyPressHandler);
			});

			function keyPressHandler(e) {
				if (e.key === "Enter") {
					sliders[index].setStep($stepController.val());
					$stepController.blur();
				}
				if (e.key === "Escape") {
					$stepController.val(snapshot);
					$stepController.blur();
				}
			}
		});

		$minLimitController.on("focus", (e) => {
			var snapshot = $minLimitController.val();
			$minLimitController.on("keydown", keyPressHandler);
			$minLimitController.on("blur", () => {
				$minLimitController.off("keydown", keyPressHandler);
			});

			function keyPressHandler(e) {
				if (e.key === "Enter") {
					sliders[index].setLimits({minLimit: $minLimitController.val()});
					$minLimitController.blur();
				}
				if (e.key === "Escape") {
					$minLimitController.val(snapshot);
					$minLimitController.blur();
				}
			}
		});

		$maxLimitController.on("focus", (e) => {
			var snapshot = $maxLimitController.val();
			$maxLimitController.on("keydown", keyPressHandler);
			$maxLimitController.on("blur", () => {
				$maxLimitController.off("keydown", keyPressHandler);
			});

			function keyPressHandler(e) {
				if (e.key === "Enter") {
					sliders[index].setLimits({maxLimit: $maxLimitController.val()});
					$maxLimitController.blur();
				}
				if (e.key === "Escape") {
					$maxLimitController.val(snapshot);
					$maxLimitController.blur();
				}
			}
		});

		$typeControllers[0].on("input", (e) => {
			sliders[index].setType($typeControllers[0].val());
		});

		$typeControllers[1].on("input", (e) => {
			sliders[index].setType($typeControllers[1].val());
		});

		$valueController.on("focus", (e) => {
			var snapshot = $valueController.val();
			$valueController.on("keydown", keyPressHandler);
			$valueController.on("blur", () => {
				$valueController.off("keydown", keyPressHandler);
			});

			function keyPressHandler(e) {
				if (e.key === "Enter") {
					sliders[index].setSingleValue($valueController.val());
					$valueController.blur();
				}
				if (e.key === "Escape") {
					$valueController.val(snapshot);
					$valueController.blur();
				}
			}
		});

		$minValueController.on("focus", (e) => {
			var snapshot = $minValueController.val();
			$minValueController.on("keydown", keyPressHandler);
			$minValueController.on("blur", () => {
				$minValueController.off("keydown", keyPressHandler);
			});

			function keyPressHandler(e) {
				if (e.key === "Enter") {
					sliders[index].setRangeValue({minValue: $minValueController.val()});
					$minValueController.blur();
				}
				if (e.key === "Escape") {
					$minValueController.val(snapshot);
					$minValueController.blur();
				}
			}
		});

		$maxValueController.on("focus", (e) => {
			var snapshot = $maxValueController.val();
			$maxValueController.on("keydown", keyPressHandler);
			$maxValueController.on("blur", () => {
				$maxValueController.off("keydown", keyPressHandler);
			});

			function keyPressHandler(e) {
				if (e.key === "Enter") {
					sliders[index].setRangeValue({maxValue: $maxValueController.val()});
					$maxValueController.blur();
				}
				if (e.key === "Escape") {
					$maxValueController.val(snapshot);
					$maxValueController.blur();
				}
			}
		});

		$directionControllers[0].on("input", (e) => {
			sliders[index].setDirection($directionControllers[0].val());
		});

		$directionControllers[1].on("input", (e) => {
			sliders[index].setDirection($directionControllers[1].val());
		});

		$valueNoteDisplayController.on("input", (e) => {
			sliders[index].setValueNoteDisplay($valueNoteDisplayController[0].checked);
		});

		$divisionsCountController.on("focus", (e) => {
			var snapshot = $divisionsCountController.val();
			$divisionsCountController.on("keydown", keyPressHandler);
			$divisionsCountController.on("blur", () => {
				$divisionsCountController.off("keydown", keyPressHandler);
			});

			function keyPressHandler(e) {
				if (e.key === "Enter") {
					sliders[index].setDivisionsCount($divisionsCountController.val());
					$divisionsCountController.blur();
				}
				if (e.key === "Escape") {
					$divisionsCountController.val(snapshot);
					$divisionsCountController.blur();
				}
			}
		});
	}
}