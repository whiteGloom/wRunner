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

		(this.handle = document.createElement("div")).classList.add("wrunner__handle");
		(this.handleMin = document.createElement("div")).classList.add("wrunner__handle");
		(this.handleMax = document.createElement("div")).classList.add("wrunner__handle");

		(this.valueNote = document.createElement("div")).classList.add("wrunner__valueNote");
		(this.valueNoteMin = document.createElement("div")).classList.add("wrunner__valueNote");
		(this.valueNoteMax = document.createElement("div")).classList.add("wrunner__valueNote");

		(this.divisions = document.createElement("div")).classList.add("wrunner__divisions");
		this.divisionsList = [];

		// Init
		this._buildBaseDOM();
		this._addEvents();
		this._addListenners();
	}

	updateDOM(type) {
		if(type.value === type.typeConstants.singleValue) {
			this.handleMin.remove();
			this.handleMax.remove();
			this.valueNoteMin.remove();
			this.valueNoteMax.remove();

			this.path.appendChild(this.handle);
			this.outer.appendChild(this.valueNote);
		}
		if(type.value === type.typeConstants.rangeValue) {
			this.handle.remove();
			this.valueNote.remove();

			this.path.appendChild(this.handleMin);
			this.path.appendChild(this.handleMax);
			this.outer.appendChild(this.valueNoteMin);
			this.outer.appendChild(this.valueNoteMax);
		}
	}

	append() {
		this.roots.appendChild(this.base);
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
			this.valueNoteMax
		].concat(this.divisionsList);

		els.forEach((el) => {
			for(var style in styles) {
				var name = el.classList[0],
					oldValue = styles[style].oldValue,
					value = styles[style].value;

				if (oldValue) el.classList.remove(name + "_" + styles[style].className + "_" + oldValue);
				el.classList.add(name + "_" + styles[style].className + "_" + value);
			}
		});
	}

	drawValue(value, limits, currentType) {
		var pathScale, selected = value.selected;
		var direction = this.direction.value,
			directionConstants = this.directionConstants;
		var type = currentType.value,
			typeConstants = currentType.typeConstants;

		var clearList = [
			this.pathPassed, this.handle,
			this.handleMin, this.handleMax,
			this.valueNote, this.valueNoteMin,
			this.valueNoteMax
		];

		clearList.forEach((el) => {
			el.style.cssText = "";
		});

		if(type === typeConstants.singleValue) {
			var valueNoteScale;

			this.valueNote.innerHTML = value.value;

			if(direction === directionConstants.horizontalValue) {
				// Passed path
				this.pathPassed.style.width = selected + "%";

				// Handle
				this.handle.style.left = selected + "%";

				pathScale = this.path.offsetWidth; valueNoteScale = this.valueNote.offsetWidth;

				this.valueNote.style.left = (pathScale * selected / 100 - valueNoteScale / 2) / pathScale * 100 + "%";
			}

			if(direction === directionConstants.verticalValue) {
				// Passed path
				this.pathPassed.style.height = selected + "%";

				// Handle
				this.handle.style.top = 100 - selected + "%";

				pathScale = this.path.offsetHeight;	valueNoteScale = this.valueNote.offsetHeight;

				this.valueNote.style.top = 100 - (pathScale * selected / 100 + valueNoteScale / 2) / pathScale * 100 + "%";
			}
		}

		if (type === typeConstants.rangeValue) {
			var valueNoteMinScale, valueNoteMaxScale;
			var start = (value.minValue - limits.minLimit) / limits.valuesCount * 100;

			this.valueNoteMin.innerHTML = value.minValue;
			this.valueNoteMax.innerHTML = value.maxValue;

			if(direction === directionConstants.horizontalValue) {

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

			if(direction === directionConstants.verticalValue) {
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
	}

	applyValueNoteDisplay() {
		var els = [this.valueNote, this.valueNoteMin, this.valueNoteMax];

		els.forEach((el) => {
			var mark = el.classList[0];

			el.classList.remove(mark + "_display_" + (!this.valueNoteDisplay ? "visible" : "hidden"));
			el.classList.add(mark + "_display_" + (this.valueNoteDisplay ? "visible" : "hidden"));
		});
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
		this.divisionsCountUpdateEvent = makeEvent();
	}

	_addListenners() {
		this.path.addEventListener("mousedown", this._mouseDownActionHandler.bind(this));
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