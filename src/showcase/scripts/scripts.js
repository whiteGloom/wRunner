document.addEventListener("DOMContentLoaded", test);

function test() {
	var sliders = [];
	function makeSlider(index, options, type) {
		var block = document.getElementsByClassName("js-sample")[index];
		var controllers = {};
		controllers["sliderStep"] = block.getElementsByClassName("js-sample__parameterValue")[0].children[0];
		controllers["sliderMinLimit"] = block.getElementsByClassName("js-sample__parameterValue")[1].children[0];
		controllers["sliderMaxLimit"] = block.getElementsByClassName("js-sample__parameterValue")[2].children[0];
		controllers["sliderValue"] = block.getElementsByClassName("js-sample__parameterValue")[3].children[0];
		controllers["sliderMinValue"] = block.getElementsByClassName("js-sample__parameterValue")[4].children[0];
		controllers["sliderMaxValue"] = block.getElementsByClassName("js-sample__parameterValue")[5].children[0];
		controllers["sliderType"] = block.getElementsByClassName("js-sample__parameterValue")[6].children[0];
		controllers["sliderDivisionsCount"] = block.getElementsByClassName("js-sample__parameterValue")[7].children[0];
		controllers["sliderValueNoteDisplay"] = block.getElementsByClassName("js-sample__parameterValue")[8].children[0];
		controllers["sliderRoots"] = block.getElementsByClassName("js-sample__parameterValue")[9].children[0];
		controllers["sliderDirection"] = block.getElementsByClassName("js-sample__parameterValue")[10].children[0];

		var data = Object.assign(options, {
			onStepUpdate: function(step) {
				controllers["sliderStep"].value = step;
			},

			onLimitsUpdate: function(limits) {
				controllers["sliderMinLimit"].value = limits.minLimit;
				controllers["sliderMaxLimit"].value = limits.maxLimit;
			},

			onValueUpdate: function(value) {
				if (value.value !== undefined) {
					controllers["sliderValue"].value = value.value;
				}
				if (value.minValue && value.minValue !== undefined || value.maxValue && value.maxValue !== undefined) {
					controllers["sliderMinValue"].value = value.minValue;
					controllers["sliderMaxValue"].value = value.maxValue;
				}
			},

			onTypeUpdate: function(type) {
				controllers["sliderType"].value = type.type;
			},

			onDivisionsCountUpdate: function(count) {
				controllers["sliderDivisionsCount"].value = count;
			},

			onValueNoteDisplayUpdate: function(value) {
				controllers["sliderValueNoteDisplay"].checked = value;
			},

			onRootsUpdate: function(roots) {
				roots = $(roots)[0];
				var str = "#" + roots.id;
				for (var i = 0; i < roots.classList.length; i++) {
					str+= "." + roots.classList[i];
				}
				controllers["sliderRoots"].value = str;
			},

			onDirectionUpdate: function(direction) {
				controllers["sliderDirection"].value = direction.value;
			}
		});

		if (type == "native") {
			sliders[index] = window.wRunner(options);
		} else {
			sliders[index] = $($(".js-sample__instance")[index]).wRunner(options);
		}


		controllers["sliderStep"].addEventListener("input", function(e) {
			sliders[index].setStep(controllers["sliderStep"].value);
		});

		controllers["sliderMinLimit"].addEventListener("input", function(e) {
			sliders[index].setLimits({minLimit: controllers["sliderMinLimit"].value});
		});

		controllers["sliderMaxLimit"].addEventListener("input", function(e) {
			sliders[index].setLimits({maxLimit: controllers["sliderMaxLimit"].value});
		});

		controllers["sliderValue"].addEventListener("input", function(e) {
			sliders[index].setSingleValue(controllers["sliderValue"].value);
		});

		controllers["sliderMinValue"].addEventListener("input", function(e) {
			sliders[index].setRangeValue({minValue: controllers["sliderMinValue"].value});
		});

		controllers["sliderMaxValue"].addEventListener("input", function(e) {
			sliders[index].setRangeValue({maxValue: controllers["sliderMaxValue"].value});
		});

		controllers["sliderType"].addEventListener("input", function(e) {
			sliders[index].setType(controllers["sliderType"].value);
		});

		controllers["sliderDivisionsCount"].addEventListener("input", function(e) {
			sliders[index].setDivisionsCount(controllers["sliderDivisionsCount"].value);
		});

		controllers["sliderValueNoteDisplay"].addEventListener("input", function(e) {
			sliders[index].setValueNoteDisplay(controllers["sliderValueNoteDisplay"].checked);
		});

		controllers["sliderDirection"].addEventListener("input", function(e) {
			sliders[index].setDirection(controllers["sliderDirection"].value);
		});
	}

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
}