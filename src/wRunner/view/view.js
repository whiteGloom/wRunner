import makeEventModule from "@event";
import helperModule from "@helper";

const makeEvent = makeEventModule;
const helper = helperModule; 

class View {
	constructor() {
		// Defaults
		this.roots = document.body;
		this.divisionsCount = 5;
		this.valueNoteDisplay = true;
		this.valueNoteRangeMode = "separate";
		this.valueNoteRangeModeConstants = {
			separateValue: "separate",
			commonValue: "common"
		};
		this.theme = {
			value: "default",
			className: "theme",
			oldValue: null
		};
		this.direction = {
			value: "horizontal",
			className: "direction",
			oldValue: null
		};
		this.directionConstants = {
			horizontalValue: "horizontal",
			verticalValue: "vertical"
		};

		// Stable elements
		(this.base = document.createElement("div")).classList.add("wrunner");
		(this.outer = document.createElement("div")).classList.add("wrunner__outer");
		(this.path = document.createElement("div")).classList.add("wrunner__path");
		(this.pathPassed = document.createElement("div")).classList.add("wrunner__pathPassed");

		(this.handle = document.createElement("div")).classList.add("wrunner__handle");
		(this.handleMin = document.createElement("div")).classList.add("wrunner__handleMin");
		(this.handleMax = document.createElement("div")).classList.add("wrunner__handleMax");

		(this.valueNote = document.createElement("div")).classList.add("wrunner__valueNote");
		(this.valueNoteMin = document.createElement("div")).classList.add("wrunner__valueNoteMin");
		(this.valueNoteMax = document.createElement("div")).classList.add("wrunner__valueNoteMax");
		(this.valueNoteCommon = document.createElement("div")).classList.add("wrunner__valueNoteCommon");

		(this.divisions = document.createElement("div")).classList.add("wrunner__divisions");
		this.divisionsList = [];

		// Init
		this._buildBaseDOM();
		this._addEvents();
		this._addListenners();
	}

	updateDOM(type) {
		if(type.value === type.typeConstants.singleValue) {
			window.requestAnimationFrame(() => {
				this.handleMin.remove();
				this.handleMax.remove();
				this.valueNoteMin.remove();
				this.valueNoteMax.remove();
				this.valueNoteCommon.remove();

				this.path.appendChild(this.handle);
				this.outer.appendChild(this.valueNote);
			});
		}
		if(type.value === type.typeConstants.rangeValue) {
			window.requestAnimationFrame(() => {
				this.handle.remove();
				this.valueNote.remove();
	
				this.path.appendChild(this.handleMin);
				this.path.appendChild(this.handleMax);
				this.outer.appendChild(this.valueNoteMin);
				this.outer.appendChild(this.valueNoteMax);
				this.outer.appendChild(this.valueNoteCommon);
			});
		}
	}

	append() {
		window.requestAnimationFrame(() => {
			this.roots.appendChild(this.base)
		});
		return this.roots;
	}

	applyStyles() {
		var styles = [this.theme, this.direction];
		var els = [
			this.base, this.outer,
			this.path, this.pathPassed,
			this.divisions, this.handle,
			this.handleMin, this.handleMax,
			this.valueNote, this.valueNoteMin,
			this.valueNoteMax, this.valueNoteCommon
		].concat(this.divisionsList);

		window.requestAnimationFrame(() => {
			els.forEach(el => {
				for(var style in styles) {
					var name = el.classList[0],
						oldValue = styles[style].oldValue,
						value = styles[style].value;

					if (oldValue) el.classList.remove(name + "_" + styles[style].className + "_" + oldValue);
					el.classList.add(name + "_" + styles[style].className + "_" + value);
				}
			});
		});
	}

	drawValue(value, limits, type) {
		var pathScale, selected = value.selected;
		var direction = this.direction.value,
			directionConstants = this.directionConstants;

		if (type.value === type.typeConstants.singleValue) window.requestAnimationFrame(drawSingleValue.bind(this));

		if (type.value === type.typeConstants.rangeValue) window.requestAnimationFrame(drawRangeValue.bind(this));


		function drawSingleValue() {
			var valueNoteScale;
			var clearList = [
				this.pathPassed, this.handle, this.valueNote
			];

			this.valueNote.innerHTML = value.value;


			if(direction === directionConstants.horizontalValue) {
				clearList.forEach(el => {
					if (el.style.top !== "") el.style.top = "";
					if (el.style.left !== "") el.style.left = "";
					if (el.style.height !== "") el.style.height = "";
				});

				// Passed path
				this.pathPassed.style.width = selected + "%";

				// Handle
				this.handle.style.left = selected + "%";

				pathScale = this.path.offsetWidth; valueNoteScale = this.valueNote.offsetWidth;

				this.valueNote.style.left = (pathScale * selected / 100 - valueNoteScale / 2) / pathScale * 100 + "%";
			}

			if(direction === directionConstants.verticalValue) {
				clearList.forEach(el => {
					if (el.style.top !== "") el.style.top = "";
					if (el.style.left !== "") el.style.left = "";
					if (el.style.width !== "") el.style.width = "";
				});

				// Passed path
				this.pathPassed.style.height = selected + "%";

				// Handle
				this.handle.style.top = 100 - selected + "%";

				pathScale = this.path.offsetHeight;	valueNoteScale = this.valueNote.offsetHeight;

				this.valueNote.style.top = 100 - (pathScale * selected / 100 + valueNoteScale / 2) / pathScale * 100 + "%";
			}
		}

		function drawRangeValue() {
			var valueNoteMinScale, valueNoteMaxScale, valueNoteCommonScale, maxPos, minPos, commonPos;
			var start = (value.minValue - limits.minLimit) / limits.valuesCount * 100;
			var clearList = [
				this.pathPassed,
				this.handleMin, this.handleMax,
				this.valueNoteMin, this.valueNoteMax, this.valueNoteCommon
			];

			this.valueNoteMin.innerHTML = value.minValue;
			this.valueNoteMax.innerHTML = value.maxValue;

			if(direction === directionConstants.horizontalValue) {
				clearList.forEach(el => {
					if (el.style.top !== "") el.style.top = "";
					if (el.style.height !== "") el.style.height = "";
				});

				this.valueNoteCommon.innerHTML = value.minValue + " - " + value.maxValue;

				// Passed path
				this.pathPassed.style.width = selected + "%";
				this.pathPassed.style.left = start + "%";

				// Handle
				this.handleMin.style.left = start + "%";
				this.handleMax.style.left = start + selected +"%";

				pathScale = this.path.offsetWidth;
				valueNoteMinScale = this.valueNoteMin.offsetWidth;
				valueNoteMaxScale = this.valueNoteMax.offsetWidth;
				valueNoteCommonScale = this.valueNoteCommon.offsetWidth;

				minPos = (pathScale * start / 100 - valueNoteMinScale / 2);
				maxPos = (pathScale * (start + selected) / 100 - valueNoteMaxScale / 2);
				commonPos = (pathScale * (start + selected / 2) / 100 - valueNoteCommonScale / 2);

				this.valueNoteMin.style.left = minPos / pathScale * 100 + "%";
				this.valueNoteMax.style.left = maxPos / pathScale * 100 + "%";
				this.valueNoteCommon.style.left = commonPos / pathScale * 100 + "%";

				// valueNoteRangeMode
				checkValueNoteRangeMode.call(this, minPos, maxPos, valueNoteMinScale, valueNoteMaxScale);
			}

			if(direction === directionConstants.verticalValue) {
				clearList.forEach(el => {
					if (el.style.left !== "") el.style.left = "";
					if (el.style.width !== "") el.style.width = "";
				});

				this.valueNoteCommon.innerHTML = value.maxValue + "<br>|<br>" + value.minValue;

				// Passed path
				this.pathPassed.style.height = selected + "%";
				this.pathPassed.style.top = 100 - selected - start + "%";

				// Handle
				this.handleMax.style.top = 100 - start - selected + "%";
				this.handleMin.style.top = 100 - start  +"%";

				pathScale = this.path.offsetHeight;
				valueNoteMinScale = this.valueNoteMin.offsetHeight;
				valueNoteMaxScale = this.valueNoteMax.offsetHeight;
				valueNoteCommonScale = this.valueNoteCommon.offsetHeight;

				minPos = (pathScale * start / 100 + valueNoteMinScale / 2);
				maxPos = (pathScale * (start + selected) / 100 + valueNoteMaxScale / 2);
				commonPos = (pathScale * (start + selected / 2) / 100 + valueNoteCommonScale / 2);

				this.valueNoteMin.style.top = 100 - minPos / pathScale * 100 + "%";
				this.valueNoteMax.style.top = 100 - maxPos / pathScale * 100 + "%";
				this.valueNoteCommon.style.top = 100 - commonPos / pathScale * 100 + "%";

				// valueNoteRangeMode
				checkValueNoteRangeMode.call(this, minPos, maxPos, valueNoteMinScale, valueNoteMaxScale);
			}

			function checkValueNoteRangeMode(minPos, maxPos, minScale, maxScale) {
				if(maxPos - minPos >= (minScale + maxScale) / 2) {
					if(this.valueNoteRangeMode !== this.valueNoteRangeModeConstants.separateValue) {
						this.valueNoteRangeMode = this.valueNoteRangeModeConstants.separateValue;
						this.valueNoteRangeModeUpdateEvent.trigger(this.valueNoteRangeMode);
					}
				} else {
					if(this.valueNoteRangeMode !== this.valueNoteRangeModeConstants.commonValue) {
						this.valueNoteRangeMode = this.valueNoteRangeModeConstants.commonValue;
						this.valueNoteRangeModeUpdateEvent.trigger(this.valueNoteRangeMode);
					}
				}
			}
		}
	}

	applyValueNoteDisplay() {
		var notes = [this.valueNote, this.valueNoteMin, this.valueNoteMax, this.valueNoteCommon];

		if (this.valueNoteDisplay === false) {
			window.requestAnimationFrame(hideNotes.bind(this));
		}

		if (this.valueNoteDisplay === true) {
			window.requestAnimationFrame(showSingleDisplay.bind(this));
			window.requestAnimationFrame(showRangeDisplay.bind(this));
		}

		function hideNotes() {
			notes.forEach(el => {
				var mark = el.classList[0];

				if (el.classList.contains(mark + "_display_visible")) {
					el.classList.remove(mark + "_display_visible");
				}
				if (!el.classList.contains(mark + "_display_hidden")) {
					el.classList.add(mark + "_display_hidden");
				}
			});
		}

		function showSingleDisplay() {
			var notesSingle = [this.valueNote];

			notesSingle.forEach(el => {
				var mark = el.classList[0];

				if (el.classList.contains(mark + "_display_hidden")) {
					el.classList.remove(mark + "_display_hidden");
				}
				if (!el.classList.contains(mark + "_display_visible")) {
					el.classList.add(mark + "_display_visible");
				}
			});
		}

		function showRangeDisplay() {
			var notesSeparate = [this.valueNoteMin, this.valueNoteMax];
			var notesCommon = [this.valueNoteCommon];

			// Separate
			if (this.valueNoteRangeMode === this.valueNoteRangeModeConstants.separateValue) {
				// Set to visible
				notesSeparate.forEach(el => {
					var mark = el.classList[0];

					if (el.classList.contains(mark + "_display_hidden")) {
						el.classList.remove(mark + "_display_hidden");
					}
					if (!el.classList.contains(mark + "_display_visible")) {
						el.classList.add(mark + "_display_visible");
					}
				});
				// Set to hidden
				notesCommon.forEach(el => {
					var mark = el.classList[0];

					if (el.classList.contains(mark + "_display_visible")) {
						el.classList.remove(mark + "_display_visible");
					}
					if (!el.classList.contains(mark + "_display_hidden")) {
						el.classList.add(mark + "_display_hidden");
					}
				});
			}

			// Common
			if (this.valueNoteRangeMode === this.valueNoteRangeModeConstants.commonValue) {
				// Set to visible
				notesCommon.forEach(el => {
					var mark = el.classList[0];

					if (el.classList.contains(mark + "_display_hidden")) {
						el.classList.remove(mark + "_display_hidden");
					}
					if (!el.classList.contains(mark + "_display_visible")) {
						el.classList.add(mark + "_display_visible");
					}
				});
				// Set to hidden
				notesSeparate.forEach(el => {
					var mark = el.classList[0];

					if (el.classList.contains(mark + "_display_visible")) {
						el.classList.remove(mark + "_display_visible");
					}
					if (!el.classList.contains(mark + "_display_hidden")) {
						el.classList.add(mark + "_display_hidden");
					}
				});
			}
		}
	}

	generateDivisions() {
		this.divisions.innerHTML = "";
		this.divisionsList.length = 0;

		for(var i = this.divisionsCount; i > 0; i--) {
			var instance = document.createElement("div");
			instance.classList.add("wrunner__division");
			
			this.divisionsList.push(instance);
			this.divisions.appendChild(instance);
		}
	}

	setRoots(newRoots) {
		if (!helper.isDOMEl(newRoots)) return;
		this.roots = newRoots;

		this.rootsUpdateEvent.trigger(this.roots);
		return this.roots;
	}

	setDivisionsCount(newCount, auto) {
		if (!helper.isNumber(newCount) || newCount < 0) return;

		newCount = Math.round(+newCount);

		if (newCount === 1) {
			newCount++;
			if (!auto) console.log("Count was increased by one, cause it may not be equal to one.");
		}
		this.divisionsCount = +newCount;

		this.divisionsCountUpdateEvent.trigger(this.divisionsCount);
		return this.divisionsCount;
	}

	setTheme(newTheme) {
		if (typeof newTheme !== "string") return;

		this.theme.oldValue = this.theme.value;
		this.theme.value = newTheme;

		this.themeUpdateEvent.trigger(this.theme.value);
		return this.theme.value;
	}

	setDirection(newDirection) {
		if (typeof newDirection !== "string") return;

		for (var constant in this.directionConstants) {
			if (newDirection === this.directionConstants[constant]) {
				this.direction.oldValue = this.direction.value;
				this.direction.value = newDirection;

				this.directionUpdateEvent.trigger({
					value: this.direction.value,
					constants: Object.assign({}, this.directionConstants)
				});
				return {
					value: this.direction.value,
					constants: Object.assign({}, this.directionConstants)
				};
			}
		}
	}

	setValueNoteDisplay(newValue) {
		if (typeof newValue !== "boolean") return;
		this.valueNoteDisplay = newValue;

		this.valueNoteDisplayUpdateEvent.trigger(this.valueNoteDisplay);
		return this.valueNoteDisplay;
	}

	getRoots() {
		return this.roots;
	}

	getTheme() {
		return this.theme.value;
	}

	getDirection() {
		return {
			value: this.direction.value,
			constants: Object.assign({}, this.directionConstants)
		};
	}

	getValueNoteDisplay() {
		return this.valueNoteDisplay;
	}

	getDivisionsCount() {
		return this.divisionsCount;
	}

	_buildBaseDOM() {
		this.base.appendChild(this.outer);
		this.outer.appendChild(this.path);
		this.path.appendChild(this.pathPassed);
		this.outer.appendChild(this.divisions);
	}

	_addEvents() {
		this.UIMouseActionEvent = makeEvent();
		this.rootsUpdateEvent = makeEvent();
		this.themeUpdateEvent = makeEvent();
		this.directionUpdateEvent = makeEvent();
		this.valueNoteDisplayUpdateEvent = makeEvent();
		this.valueNoteRangeModeUpdateEvent = makeEvent();
		this.divisionsCountUpdateEvent = makeEvent();
		this.windowResizeEvent = makeEvent();
	}

	_addListenners() {
		this.path.addEventListener("mousedown", this._mouseDownActionHandler.bind(this));
		window.addEventListener("resize", this.windowResizeEvent.trigger)
	}

	_mouseDownActionHandler(eventDown) {
		if (eventDown.button !== 0) return;

		var	wasDragged = false;
		var handlerBind = handler.bind(this),
			upBind = mouseUp.bind(this);

		// The handler that indicates that the handle has been dragged.
		document.body.addEventListener("mousemove", () => wasDragged = true, {once: true});

		// The handler that called when mouse button released.
		document.body.addEventListener("mousemove", handlerBind);

		// The handler that called when mouse moved, while button pressed.
		document.body.addEventListener("mouseup", upBind, {once: true});


		// Handlers
		function mouseUp(eventUp) {
			var target = eventUp.target;

			// Removing move bind.
			document.body.removeEventListener("mousemove", handlerBind);

			// If handle was dragged, stop the function.
			if (wasDragged) return;
			if (target === this.handle || target === this.handleMin || target === this.handleMax) return;

			// Else trigger a click.
			handlerBind(eventUp);
		}

		function handler(event) {
			var scale, min, max, pos;
			var direction = this.direction.value,
				directionConstants = this.directionConstants;

			if(direction === directionConstants.horizontalValue) {
				scale = this.path.offsetWidth;
				min = this.path.getBoundingClientRect().left;
				pos = event.clientX;
			}
			if(direction === directionConstants.verticalValue) {
				scale = this.path.offsetHeight;
				min = this.path.getBoundingClientRect().top;
				pos = event.clientY;
			}

			max = min + scale;

			// If the dragging is out of slider's range, the function stops.
			if (pos < min - 10 || pos > max + 10) return;

			if(direction === directionConstants.horizontalValue) {
				this.UIMouseActionEvent.trigger((pos - min) / scale * 100);
			}
			if(direction === directionConstants.verticalValue) {
				this.UIMouseActionEvent.trigger(100 - (pos - min) / scale * 100);
			}
		}
	}
}

export default View;