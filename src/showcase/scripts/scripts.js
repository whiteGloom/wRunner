document.addEventListener("DOMContentLoaded", test);

function test() {
	var controllers = [];
	for (var i = 0; i < 4; i++) {
		var data = {};

		data["slider" + i + "Step"] = document.getElementById("slider" + i + "Step");
		data["slider" + i + "MinLimit"] = document.getElementById("slider" + i + "MinLimit");
		data["slider" + i + "MaxLimit"] = document.getElementById("slider" + i + "MaxLimit");
		data["slider" + i + "Value"] = document.getElementById("slider" + i + "Value");
		data["slider" + i + "MinValue"] = document.getElementById("slider" + i + "MinValue");
		data["slider" + i + "MaxValue"] = document.getElementById("slider" + i + "MaxValue");
		data["slider" + i + "Type"] = document.getElementById("slider" + i + "Type");
		data["slider" + i + "DivisionsCount"] = document.getElementById("slider" + i + "DivisionsCount");
		data["slider" + i + "ValueNoteDisplay"] = document.getElementById("slider" + i + "ValueNoteDisplay");
		data["slider" + i + "Roots"] = document.getElementById("slider" + i + "Roots");
		data["slider" + i + "Direction"] = document.getElementById("slider" + i + "Direction");

		controllers.push(data);
	}

	var sliders = [];
	function makeSlider(index, options, type) {
		var data = Object.assign(options, {

			onStepUpdate: function(step) {
				controllers[index]["slider" + index + "Step"].value = step;
			},

			onLimitsUpdate: function(limits) {
				controllers[index]["slider" + index + "MinLimit"].value = limits.minLimit;
				controllers[index]["slider" + index + "MaxLimit"].value = limits.maxLimit;
			},

			onValueUpdate: function(value) {
				if (value.value !== undefined) {
					controllers[index]["slider" + index + "Value"].value = value.value;
				}
				if (value.minValue && value.minValue !== undefined || value.maxValue && value.maxValue !== undefined) {
					controllers[index]["slider" + index + "MinValue"].value = value.minValue;
					controllers[index]["slider" + index + "MaxValue"].value = value.maxValue;
				}
			},

			onTypeUpdate: function(type) {
				controllers[index]["slider" + index + "Type"].value = type;
			},

			onDivisionsCountUpdate: function(count) {
				controllers[index]["slider" + index + "DivisionsCount"].value = count;
			},

			onValueNoteDisplayUpdate: function(value) {
				controllers[index]["slider" + index + "ValueNoteDisplay"].checked = value;
			},

			onRootsUpdate: function(roots) {
				var str = "#" + roots.id;
				for (var i = 0; i < roots.classList.length; i++) {
					str+= "." + roots.classList[i];
				}
				controllers[index]["slider" + index + "Roots"].value = str;
			},

			onStylesUpdate: function(styles) {
				controllers[index]["slider" + index + "Direction"].value = styles.direction.value;
			}
		});

		if (type == "native") {
			sliders[index] = window.wRunner(data);
		} else {
			sliders[index] = $("#exm" + index).wRunner(data);
		}

		controllers[index]["slider" + index + "Step"].addEventListener("input", function(e) {
			sliders[index].setStep(controllers[index]["slider" + index + "Step"].value);
		});

		controllers[index]["slider" + index + "MinLimit"].addEventListener("input", function(e) {
			sliders[index].setLimits({minLimit: controllers[index]["slider" + index + "MinLimit"].value});
		});

		controllers[index]["slider" + index + "MaxLimit"].addEventListener("input", function(e) {
			sliders[index].setLimits({maxLimit: controllers[index]["slider" + index + "MaxLimit"].value});
		});

		controllers[index]["slider" + index + "Value"].addEventListener("input", function(e) {
			sliders[index].setSingleValue(controllers[index]["slider" + index + "Value"].value);
		});

		controllers[index]["slider" + index + "MinValue"].addEventListener("input", function(e) {
			sliders[index].setRangeValue({minValue: controllers[index]["slider" + index + "MinValue"].value});
		});

		controllers[index]["slider" + index + "MaxValue"].addEventListener("input", function(e) {
			sliders[index].setRangeValue({maxValue: controllers[index]["slider" + index + "MaxValue"].value});
		});

		controllers[index]["slider" + index + "Type"].addEventListener("input", function(e) {
			sliders[index].setType(controllers[index]["slider" + index + "Type"].value);
		});

		controllers[index]["slider" + index + "DivisionsCount"].addEventListener("input", function(e) {
			sliders[index].setDivisionsCount(controllers[index]["slider" + index + "DivisionsCount"].value);
		});

		controllers[index]["slider" + index + "ValueNoteDisplay"].addEventListener("input", function(e) {
			sliders[index].setValueNoteDisplay(controllers[index]["slider" + index + "ValueNoteDisplay"].checked);
		});

		controllers[index]["slider" + index + "Direction"].addEventListener("input", function(e) {
			sliders[index].setStyles({direction: {value: controllers[index]["slider" + index + "Direction"].value}});
		});
	}

	makeSlider(0, {
		roots: document.getElementById("exm0")
	}, "native");

	makeSlider(1, {
		roots: document.getElementById("exm1"),
		styles: {
			direction: {
				value: "vertical"
			}
		},
		step: 5,
		type: "range"
	}, "native");

	makeSlider(2, {
		divisionsCount: 16,
		styles: {
			direction: {
				value: "vertical"
			}
		},
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