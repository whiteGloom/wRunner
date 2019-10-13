import makeEventModule from "@event";
import helperModule from "@helper";

const makeEvent = makeEventModule;
const helper = helperModule; 

function View() {
	// Defaults
	this.roots = document.body;
	this.divisionsCount = 5;
	this.valueNoteDisplay = true;
	this.styles = {
		theme: {
			value: "default",
			className: "theme",
			oldValue: null
		},
		
		direction: {
			value: "horizontal",
			className: "direction",
			oldValue: null
		}
	};
	this.stylesConstants = {
		direction: {
			horizontalValue: "horizontal", 
			verticalValue: "vertical"
		}
	};

	// Lists of els
	this.stableElsList = [];
	this.divisionsList = [];
	this.els = [];

	// Stable elements
	// Base
	this.base = document.createElement("div");
	this.stableElsList.push(this.base);

	// Outer
	this.outer = document.createElement("div");
	this.stableElsList.push(this.outer);

	// Path
	this.path = document.createElement("div");
	this.stableElsList.push(this.path);

	// Passed path
	this.pathPassed = document.createElement("div");
	this.stableElsList.push(this.pathPassed);

	// Path handles
	this.handle = document.createElement("div");
	this.stableElsList.push(this.handle);
	this.handleMin = document.createElement("div");
	this.stableElsList.push(this.handleMin);
	this.handleMax = document.createElement("div");
	this.stableElsList.push(this.handleMax);

	// Path values
	this.valueNote = document.createElement("div");
	this.stableElsList.push(this.valueNote);
	this.valueNoteMin = document.createElement("div");
	this.stableElsList.push(this.valueNoteMin);
	this.valueNoteMax = document.createElement("div");
	this.stableElsList.push(this.valueNoteMax);

	// Division"s container
	this.divisions = document.createElement("div");
	this.stableElsList.push(this.divisions);


	this.generateBaseDOM();

	// EVENTS
	this.addEvents();

	// Listenners
	this.addListenners();
}

View.prototype = {
	addEvents() {
		this.mouseDownEvent = makeEvent();
		this.draggEvent = makeEvent();
		this.clickEvent = makeEvent();
		this.UIValueActionEvent = makeEvent();
		this.stylesUpdateEvent = makeEvent();
		this.stylesAppliedEvent = makeEvent();
		this.valueNoteDisplayUpdateEvent = makeEvent();
		this.rootsUpdateEvent = makeEvent();
		this.divisionsCountUpdateEvent = makeEvent();
		this.valueNoteDisplayAppliedEvent = makeEvent();
	},

	addListenners() {
		this.path.addEventListener("mousedown", function(event) {
			this.mouseDownEvent.trigger(event);
		}.bind(this));
	},

	generateBaseDOM() {
		// Base
		this.base.classList.add("wrunner");

		// Outer
		this.outer.classList.add("wrunner__outer");

		// Path
		this.path.classList.add("wrunner__path");

		// Passed path
		this.pathPassed.classList.add("wrunner__pathPassed");

		// Path handles
		this.handle.classList.add("wrunner__handle");
		this.handleMin.classList.add("wrunner__handle");
		this.handleMax.classList.add("wrunner__handle");

		// Path values
		this.valueNote.classList.add("wrunner__valueNote");
		this.valueNoteMin.classList.add("wrunner__valueNote");
		this.valueNoteMax.classList.add("wrunner__valueNote");

		// Division"s container
		this.divisions.classList.add("wrunner__divisions");
		
		this.base.appendChild(this.outer);
	},

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
	},

	action(event) {
		var	dragged = false,
			moveBind = move.bind(this);

		// The handler that indicates that the handle has been dragged.
		document.body.addEventListener("mousemove", () => dragged = true, {once: true});
		document.body.addEventListener("mousemove", moveBind);

		// The handler that called after click"s end.
		document.body.addEventListener("mouseup", function(upEvent) {
			var targ = upEvent.target;

			// Removing bind.
			document.body.removeEventListener("mousemove", moveBind);

			// If handle was dragged, stop the function.
			if (dragged) return;
			if (targ == this.handle || targ == this.handleMin || targ == this.handleMax) return;

			// Else trigger a click
			hanlder.call(this, upEvent);
			this.clickEvent.trigger();
		}.bind(this), {once: true});


		// Helpers
		function move(eventMove) {
			hanlder.call(this, eventMove);
			this.draggEvent.trigger(event);
		}

		function hanlder(event) {
			var scale, min, max, pos;
			var dir = this.styles.direction.value;

			if(dir == this.stylesConstants.direction.horizontalValue) {
				scale = this.path.offsetWidth;
				min = this.path.getBoundingClientRect().left;
				pos = event.clientX;
			}
			if(dir ==  this.stylesConstants.direction.verticalValue) {
				scale = this.path.offsetHeight;
				min = this.path.getBoundingClientRect().top;
				pos = event.clientY;
			}

			max = min + scale;

			// If the dragg is out of slider"s range, the function stops.
			if (pos < min - 10 || pos > max + 10) return;

			if(dir == this.stylesConstants.direction.horizontalValue) {
				this.UIValueActionEvent.trigger((pos - min) / scale * 100);
			}
			if(dir == this.stylesConstants.direction.verticalValue) {
				this.UIValueActionEvent.trigger(100 - (pos - min) / scale * 100);
			}
		}
	},

	append() {
		this.roots.appendChild(this.base);
		return this.roots;
	},

	setRoots(roots) {
		if (!helper.isDOMEl(roots)) return;
		this.roots = roots;

		//console.log(this.roots)
		this.rootsUpdateEvent.trigger(this.roots);
		return this.roots;
	},

	getRoots() {
		return this.roots;
	},

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
	},

	generateDivisions() {
		this.divisions.innerHTML = "";
		this.divisionsList.length = 0;

		for(var i = this.divisionsCount; i > 0; i--) {
			var instance = document.createElement("div");
			instance.classList.add("wrunner__division");
			this.divisionsList.push(instance);
			this.divisions.appendChild(instance);
		}

		this.els = this.divisionsList.concat(this.stableElsList);
		return this.divisionsList;
	},

	getDivisionsCount() {
		return this.divisionsCount;
	},

	drawValue(value, limits, currentType) {
		var pathScale, valueNoteScale, valuecaleMinNoteS, valuecaleMaxNoteS;
		var selected = value.selected;
		
		var dir = this.styles.direction.value,
			dirConsts = this.stylesConstants.direction;
		var type = currentType.type,
			typeConstants = currentType.typeConstants;

		this.pathPassed.style.cssText = "";
		this.handle.style.cssText = "";
		this.handleMin.style.cssText = "";
		this.handleMax.style.cssText = "";
		this.valueNote.style.cssText = "";
		this.valueNoteMin.style.cssText = "";
		this.valueNoteMax.style.cssText = "";

		if(type == typeConstants.singleValue) {
			this.valueNote.innerHTML = value.value;

			if(dir == dirConsts.horizontalValue) {
				// Passed path
				this.pathPassed.style.width = selected + "%";

				// Handle
				this.handle.style.left = selected + "%";

				pathScale = this.path.offsetWidth; valueNoteScale = this.valueNote.offsetWidth;

				this.valueNote.style.left = (pathScale * selected / 100 - valueNoteScale / 2) / pathScale * 100 + "%";
			}

			if(dir == dirConsts.verticalValue) {
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

			if(dir == dirConsts.horizontalValue) {
	
				// Passed path
				this.pathPassed.style.width = selected + "%";
				this.pathPassed.style.left = start + "%";

				// Handle
				this.handleMin.style.left = start + "%";
				this.handleMax.style.left = start + selected +"%";

				pathScale = this.path.offsetWidth;
				valuecaleMinNoteS = this.valueNoteMin.offsetWidth; valuecaleMaxNoteS = this.valueNoteMax.offsetWidth;

				this.valueNoteMin.style.left = (pathScale * start / 100 - valuecaleMinNoteS / 2) / pathScale * 100 + "%";
				this.valueNoteMax.style.left = (pathScale * (start + selected) / 100 - valuecaleMaxNoteS / 2) / pathScale * 100 + "%";
			}

			if(dir == dirConsts.verticalValue) {
				this.pathPassed.style.height = selected + "%";
				this.pathPassed.style.top = 100 - selected - start + "%";

				// Handle
				this.handleMax.style.top = 100 - start - selected + "%";
				this.handleMin.style.top = 100 - start  +"%";

				pathScale = this.path.offsetHeight;
				valuecaleMinNoteS = this.valueNoteMin.offsetHeight; valuecaleMaxNoteS = this.valueNoteMax.offsetHeight;

				this.valueNoteMin.style.top = 100 - (pathScale * start / 100 + valuecaleMinNoteS / 2) / pathScale * 100 + "%";
				this.valueNoteMax.style.top = 100 - (pathScale * (start + selected) / 100 + valuecaleMaxNoteS / 2) / pathScale * 100 + "%";
			}
		}

		return value;
	},

	setStyles(newStyles) {
		if (!helper.isObject(newStyles)) return;

		var changed = false;
		for(var prop in newStyles) {
			if(!(prop in this.styles)) continue;
			var mutable = this.styles[prop];

			if (newStyles[prop].value !== undefined) {
				if (this.stylesConstants[prop]) {
					for (var defs in this.stylesConstants[prop]) {
						if (newStyles[prop].value == this.stylesConstants[prop][defs]) {
							mutable.oldValue = mutable.value;
							mutable.value = newStyles[prop].value;
							changed = true;
							break;
						}
					}
				} else {
					if (typeof newStyles[prop].value == "string") {
						mutable.oldValue = mutable.value;
						mutable.value = newStyles[prop].value;
						changed = true;
					}
				}
			}

			if (typeof newStyles[prop].className == "string") {
				mutable.className = newStyles[prop].className;
				changed = true;
			}
		}

		if(!changed) return;

		this.stylesUpdateEvent.trigger(Object.assign({}, this.styles));
		return Object.assign({}, this.styles);
	},

	applyStyles() {
		var styles = this.styles;

		for (var i = this.els.length - 1; i >= 0; i--) {
			var el = this.els[i];

			for(var prop in styles) {
				var mark = this.els[i].classList[0],
					oldValue = styles[prop].oldValue,
					value = styles[prop].value;

				if (oldValue) el.classList.remove(mark + "_" + styles[prop].className + "_" + oldValue);
				if (value) el.classList.add(mark + "_" + styles[prop].className + "_" + value);
			}
		}

		this.stylesAppliedEvent.trigger(Object.assign({}, this.styles));
		return Object.assign({}, this.styles);
	},

	getStyles() {
		return {
			styles: Object.assign({}, this.styles),
			stylesConstants: Object.assign({}, this.stylesConstants)
		};
	},

	setValueNoteDisplay(value) {
		if (typeof value !== "boolean") return;
		this.valueNoteDisplay = value;

		this.valueNoteDisplayUpdateEvent.trigger(this.valueNoteDisplay);
		return this.valueNoteDisplay;
	},

	applyValueNoteDisplay() {
		var mark = this.valueNote.classList[0];
		var els = [this.valueNote, this.valueNoteMin, this.valueNoteMax];

		for (var i = els.length - 1; i >= 0; i--) {
			els[i].classList.remove(mark + "_display_" + (!this.valueNoteDisplay ? "visible" : "hidden"));
			els[i].classList.add(mark + "_display_" + (this.valueNoteDisplay ? "visible" : "hidden"));
		}

		this.valueNoteDisplayAppliedEvent.trigger(this.valueNoteDisplay);
		return this.valueNoteDisplay;
	},

	getValueNoteDisplay() {
		return this.valueNoteDisplay;
	}
};

export default View;