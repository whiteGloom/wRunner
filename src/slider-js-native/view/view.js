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

		// Path handles
		(this.handle = document.createElement("div")).classList.add("wrunner__handle");
		(this.handleMin = document.createElement("div")).classList.add("wrunner__handle");
		(this.handleMax = document.createElement("div")).classList.add("wrunner__handle");

		// Path values
		(this.valueNote = document.createElement("div")).classList.add("wrunner__valueNote");
		(this.valueNoteMin = document.createElement("div")).classList.add("wrunner__valueNote");
		(this.valueNoteMax = document.createElement("div")).classList.add("wrunner__valueNote");

		(this.divisions = document.createElement("div")).classList.add("wrunner__divisions");
		this.divisionsList = [];

		this.base.appendChild(this.outer);
		this.addEvents();
		this.addListenners();
	}

	addEvents() {
		this.UIMouseActionEvent = makeEvent();
		this.directionUpdateEvent = makeEvent();
		this.themeUpdateEvent = makeEvent();
		this.stylesAppliedEvent = makeEvent();
		this.valueNoteDisplayUpdateEvent = makeEvent();
		this.rootsUpdateEvent = makeEvent();
		this.divisionsCountUpdateEvent = makeEvent();
		this.valueNoteDisplayAppliedEvent = makeEvent();
	}

	addListenners() {
		this.path.addEventListener("mousedown", this.mouseAction.bind(this));
	}

	updateDOM(type) {
		this.path.innerHTML = "";
		this.outer.innerHTML = "";

		this.outer.appendChild(this.path);
		this.path.appendChild(this.pathPassed);
		this.outer.appendChild(this.divisions);

		if(type.type == type.typeConstants.singleValue) {
			this.path.appendChild(this.handle);
			this.outer.appendChild(this.valueNote);
		}
		if(type.type == type.typeConstants.rangeValue) {
			this.path.appendChild(this.handleMin);
			this.path.appendChild(this.handleMax);
			this.outer.appendChild(this.valueNoteMin);
			this.outer.appendChild(this.valueNoteMax);
		}
	}

	mouseAction(eventDown) {
		var	dragged = false;
		var handlerBind = handler.bind(this),
			upBind = mouseUp.bind(this);

		// The handler that indicates that the handle has been dragged.
		document.body.addEventListener("mousemove", () => dragged = true, {once: true});

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
			if (dragged) return;
			if (target == this.handle || target == this.handleMin || target == this.handleMax) return;

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

			// If the dragg is out of slider's range, the function stops.
			if (pos < min - 10 || pos > max + 10) return;

			if(direction === directionConstants.horizontalValue) {
				this.UIMouseActionEvent.trigger((pos - min) / scale * 100);
			}
			if(direction === directionConstants.verticalValue) {
				this.UIMouseActionEvent.trigger(100 - (pos - min) / scale * 100);
			}
		}
	}

	append() {
		this.roots.appendChild(this.base);
		return this.roots;
	}

	setRoots(roots) {
		if (!helper.isDOMEl(roots)) return;
		this.roots = roots;

		this.rootsUpdateEvent.trigger(this.roots);
		return this.roots;
	}

	getRoots() {
		return this.roots;
	}

	setDivisionsCount(count, auto) {
		if (!helper.isNumber(count) || count < 0) return;

		count = Math.round(+count);

		if (count == 1) {
			count++;
			if (!auto) console.log("Count was increased by one, cause it may not be equal to one.");
		}
		this.divisionsCount = +count;

		this.divisionsCountUpdateEvent.trigger(this.divisionsCount);
		return this.divisionsCount;
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

	getDivisionsCount() {
		return this.divisionsCount;
	}

	drawValue(value, limits, currentType) {
		var pathScale, valueNoteScale, valueNoteMinScale, valueNoteMaxScale;
		var selected = value.selected;
		
		var direction = this.direction.value,
			directionConstants = this.directionConstants;
		var type = currentType.type,
			typeConstants = currentType.typeConstants;

		var clearList = [
			this.pathPassed, this.handle,
			this.handleMin, this.handleMax,
			this.valueNote, this.valueNoteMin,
			this.valueNoteMax
		];

		for (var i = 0; i < clearList.length; i++) {
			clearList[i].style.cssText = "";
		}

		if(type == typeConstants.singleValue) {
			this.valueNote.innerHTML = value.value;

			if(direction == directionConstants.horizontalValue) {
				// Passed path
				this.pathPassed.style.width = selected + "%";

				// Handle
				this.handle.style.left = selected + "%";

				pathScale = this.path.offsetWidth; valueNoteScale = this.valueNote.offsetWidth;

				this.valueNote.style.left = (pathScale * selected / 100 - valueNoteScale / 2) / pathScale * 100 + "%";
			}

			if(direction == directionConstants.verticalValue) {
				// Passed path
				this.pathPassed.style.height = selected + "%";

				// Handle
				this.handle.style.top = 100 - selected + "%";

				pathScale = this.path.offsetHeight;	valueNoteScale = this.valueNote.offsetHeight;

				this.valueNote.style.top = 100 - (pathScale * selected / 100 + valueNoteScale / 2) / pathScale * 100 + "%";
			}
		}

		if (type == typeConstants.rangeValue) {
			var start = (value.minValue - limits.minLimit) / limits.valuesCount * 100;

			this.valueNoteMin.innerHTML = value.minValue;
			this.valueNoteMax.innerHTML = value.maxValue;

			if(direction == directionConstants.horizontalValue) {

				// Passed path
				this.pathPassed.style.width = selected + "%";
				this.pathPassed.style.left = start + "%";

				// Handle
				this.handleMin.style.left = start + "%";
				this.handleMax.style.left = start + selected +"%";

				pathScale = this.path.offsetWidth;
				valueNoteMinScale = this.valueNoteMin.offsetWidth; valueNoteMaxScale = this.valueNoteMax.offsetWidth;

				this.valueNoteMin.style.left = (pathScale * start / 100 - valueNoteMinScale / 2) / pathScale * 100 + "%";
				this.valueNoteMax.style.left = (pathScale * (start + selected) / 100 - valueNoteMaxScale / 2) / pathScale * 100 + "%";
			}

			if(direction == directionConstants.verticalValue) {
				this.pathPassed.style.height = selected + "%";
				this.pathPassed.style.top = 100 - selected - start + "%";

				// Handle
				this.handleMax.style.top = 100 - start - selected + "%";
				this.handleMin.style.top = 100 - start  +"%";

				pathScale = this.path.offsetHeight;
				valueNoteMinScale = this.valueNoteMin.offsetHeight; valueNoteMaxScale = this.valueNoteMax.offsetHeight;

				this.valueNoteMin.style.top = 100 - (pathScale * start / 100 + valueNoteMinScale / 2) / pathScale * 100 + "%";
				this.valueNoteMax.style.top = 100 - (pathScale * (start + selected) / 100 + valueNoteMaxScale / 2) / pathScale * 100 + "%";
			}
		}

		return value;
	}

	setTheme(newTheme) {
		if (typeof newTheme !== "string") return;

		this.theme.oldValue = this.theme.value;
		this.theme.value = newTheme;

		this.themeUpdateEvent.trigger(this.theme.value);
		return this.theme.value;
	}

	getTheme() {
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

	getDirection() {
		return {
			value: this.direction.value,
			constants: Object.assign({}, this.directionConstants)
		};
	}

	applyStyles() {
		var styles = [this.theme, this.direction];
		var els = [
			this.base, this.outer,
			this.path, this.pathPassed,
			this.divisions, this.handle,
			this.handleMin, this.handleMax,
			this.valueNote, this.valueNoteMin,
			this.valueNoteMax
		].concat(this.divisionsList);

		for (var i = 0; i < els.length; i++) {
			var el = els[i];

			for(var style in styles) {
				var mark = els[i].classList[0],
					oldValue = styles[style].oldValue,
					value = styles[style].value;

				if (oldValue) el.classList.remove(mark + "_" + styles[style].className + "_" + oldValue);
				el.classList.add(mark + "_" + styles[style].className + "_" + value);
			}
		}

		this.stylesAppliedEvent.trigger(Object.assign({}, this.styles));
		return Object.assign({}, this.styles);
	}

	setValueNoteDisplay(value) {
		if (typeof value !== "boolean") return;
		this.valueNoteDisplay = value;

		this.valueNoteDisplayUpdateEvent.trigger(this.valueNoteDisplay);
		return this.valueNoteDisplay;
	}

	applyValueNoteDisplay() {
		var els = [this.valueNote, this.valueNoteMin, this.valueNoteMax];

		for (var i = 0; i < els.length; i++) {
			var mark = els[i].classList[0];

			els[i].classList.remove(mark + "_display_" + (!this.valueNoteDisplay ? "visible" : "hidden"));
			els[i].classList.add(mark + "_display_" + (this.valueNoteDisplay ? "visible" : "hidden"));
		}

		this.valueNoteDisplayAppliedEvent.trigger(this.valueNoteDisplay);
		return this.valueNoteDisplay;
	}

	getValueNoteDisplay() {
		return this.valueNoteDisplay;
	}
}

export default View;