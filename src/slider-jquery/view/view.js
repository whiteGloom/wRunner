import makeEvent from "@event";
import helper from "@helper";

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
	this.base = $("<div class='wrunner'>")[0];
	this.stableElsList.push(this.base);

	// Outer
	this.outer = $("<div class='wrunner__outer'>").appendTo($(this.base))[0];
	this.stableElsList.push(this.outer);

	// Path
	this.path = $("<div class='wrunner__path'>").appendTo($(this.outer))[0];
	this.stableElsList.push(this.path);

	// Passed path
	this.pathPassed = $("<div class='wrunner__pathPassed'>").appendTo($(this.path))[0];
	this.stableElsList.push(this.pathPassed);

	// Path handles
	this.handle = $("<div class='wrunner__handle'>")[0];
	this.stableElsList.push(this.handle);
	this.handleMin = $("<div class='wrunner__handle'>")[0];
	this.stableElsList.push(this.handleMin);
	this.handleMax = $("<div class='wrunner__handle'>")[0];
	this.stableElsList.push(this.handleMax);

	// Path values
	this.valueNote = $("<div class='wrunner__valueNote'>")[0];
	this.stableElsList.push(this.valueNote);
	this.valueNoteMin = $("<div class='wrunner__valueNote'>")[0];
	this.stableElsList.push(this.valueNoteMin);
	this.valueNoteMax = $("<div class='wrunner__valueNote'>")[0];
	this.stableElsList.push(this.valueNoteMax);

	// Division"s container
	this.divisions = $("<div class='wrunner__divisions'>").appendTo($(this.outer))[0];
	this.stableElsList.push(this.divisions);


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
		$(this.path).on("mousedown", function(event) {
			this.mouseDownEvent.trigger(event);
		}.bind(this));
	},

	updateDOM(type) {
		if(type.type == type.typeConstants.singleValue) {
			$(this.handleMin).detach();
			$(this.handleMax).detach();
			$(this.valueNoteMin).detach();
			$(this.valueNoteMax).detach();

			$(this.handle).appendTo($(this.path));
			$(this.valueNote).appendTo($(this.outer));
		}
		if(type.type == type.typeConstants.rangeValue) {
			$(this.handle).detach();
			$(this.valueNote).detach();

			$(this.handleMin).appendTo($(this.path));
			$(this.handleMax).appendTo($(this.path));
			$(this.valueNoteMin).appendTo($(this.outer));
			$(this.valueNoteMax).appendTo($(this.outer));
		}
	},

	action(event) {
		var	dragged = false,
			moveBind = move.bind(this);

		// The handler that indicates that the handle has been dragged.
		$(document.body).one("mousemove", () => dragged = true);
		$(document.body).on("mousemove", moveBind);

		// The handler that called after click"s end.
		$(document.body).one("mouseup", function(upEvent) {
			var targ = upEvent.target;

			// Removing bind.
			$(document.body).off("mousemove", moveBind);

			// If handle was dragged, stop the function.
			if (dragged) return;
			if (targ == this.handle || targ == this.handleMin || targ == this.handleMax) return;

			// Else trigger a click
			hanlder.call(this, upEvent);
			this.clickEvent.trigger();
		}.bind(this));


		// Helpers
		function move(eventMove) {
			hanlder.call(this, eventMove);
			this.draggEvent.trigger(event);
		}

		function hanlder(event) {
			var scale, min, max, pos;
			var dir = this.styles.direction.value;

			if(dir == this.stylesConstants.direction.horizontalValue) {
				scale = $(this.path).outerWidth();
				min = this.path.getBoundingClientRect().left;
				pos = event.clientX;
			}
			if(dir ==  this.stylesConstants.direction.verticalValue) {
				scale = $(this.path).outerHeight();
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
		$(this.base).appendTo($(this.roots));
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

		count = Math.round(count);

		if (count == 1) {
			count++;
			if(!auto) console.log("Count was increased by one, cause it may not be equal to one.");
		}
		this.divisionsCount = +count;

		this.divisionsCountUpdateEvent.trigger(this.divisionsCount);
		return this.divisionsCount;
	},

	generateDivisions() {
		$(this.divisions).empty();
		this.divisionsList.length = 0;

		for(var i = this.divisionsCount; i > 0; i--) {
			var instance = $("<div class='wrunner__division'>");
			this.divisionsList.push(instance[0]);
			instance.appendTo($(this.divisions));
		}

		this.els = this.divisionsList.concat(this.stableElsList);
		return this.divisionsList;
	},

	getDivisionsCount() {
		return this.divisionsCount;
	},

	drawValue(value, limits, currentType) {
		var pathScale, valueNoteScale, valueNoteMinScale, valueNoteMaxScale;
		var selected = value.selected;
		
		var dir = this.styles.direction.value,
			dirConsts = this.stylesConstants.direction;
		var type = currentType.type,
			typeConstants = currentType.typeConstants;

		$(this.pathPassed).attr("style", "");
		$(this.handle).attr("style", "");
		$(this.handleMin).attr("style", "");
		$(this.handleMax).attr("style", "");
		$(this.valueNote).attr("style", "");
		$(this.valueNoteMin).attr("style", "");
		$(this.valueNoteMax).attr("style", "");

		if(type == typeConstants.singleValue) {
			$(this.valueNote).text(value.value);

			if(dir == dirConsts.horizontalValue) {
				// Passed path
				$(this.pathPassed).css("width", selected + "%");

				// Handle
				$(this.handle).css("left",selected + "%");

				pathScale = $(this.path).outerWidth(); valueNoteScale = $(this.valueNote).outerWidth();

				$(this.valueNote).css("left", (pathScale * selected / 100 - valueNoteScale / 2) / pathScale * 100 + "%");
			}

			if(dir == dirConsts.verticalValue) {
				// Passed path
				$(this.pathPassed).css("height", selected + "%");

				// Handle
				$(this.handle).css("top", 100 - selected + "%");

				pathScale = $(this.path).outerHeight();	valueNoteScale = $(this.valueNote).outerHeight();

				$(this.valueNote).css("top", 100 - (pathScale * selected / 100 + valueNoteScale / 2) / pathScale * 100 + "%");
			}
		}

		if (type == typeConstants.rangeValue) {
			var start = (value.minValue - limits.minLimit) / limits.valuesCount * 100;

			$(this.valueNoteMin).text(value.minValue);
			$(this.valueNoteMax).text(value.maxValue);

			if(dir == dirConsts.horizontalValue) {
				// Passed path
				$(this.pathPassed).css("width", selected + "%");
				$(this.pathPassed).css("left", start + "%");

				// Handle
				$(this.handleMin).css("left", start + "%");
				$(this.handleMax).css("left", start + selected +"%");

				pathScale = $(this.path).outerWidth();
				valueNoteMinScale = $(this.valueNoteMin).outerWidth(); valueNoteMaxScale = $(this.valueNoteMax).outerWidth();

				$(this.valueNoteMin).css("left", (pathScale * start / 100 - valueNoteMinScale / 2) / pathScale * 100 + "%");
				$(this.valueNoteMax).css("left", (pathScale * (start + selected) / 100 - valueNoteMaxScale / 2) / pathScale * 100 + "%");
			}

			if(dir == dirConsts.verticalValue) {
				$(this.pathPassed).css("height", selected + "%");
				$(this.pathPassed).css("top", 100 - selected - start + "%");

				// Handle
				$(this.handleMax).css("top", 100 - start - selected + "%");
				$(this.handleMin).css("top", 100 - start  +"%");

				pathScale = $(this.path).outerHeight();
				valueNoteMinScale = $(this.valueNoteMin).outerHeight(); valueNoteMaxScale = $(this.valueNoteMax).outerHeight();

				$(this.valueNoteMin).css("top", 100 - (pathScale * start / 100 + valueNoteMinScale / 2) / pathScale * 100 + "%");
				$(this.valueNoteMax).css("top", 100 - (pathScale * (start + selected) / 100 + valueNoteMaxScale / 2) / pathScale * 100 + "%");
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
					mutable.oldValue = mutable.value;
					mutable.value = newStyles[prop].value;
					changed = true;
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
			var el = $(this.els[i]);

			for(var prop in styles) {
				var mark = this.els[i].classList[0],
					oldValue = styles[prop].oldValue,
					value = styles[prop].value;

				if (oldValue) el.removeClass(mark + "_" + styles[prop].className + "_" + oldValue);
				if (value) el.addClass(mark + "_" + styles[prop].className + "_" + value);
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

	applyValueNoteDisplay() {
		var mark = this.valueNote.classList[0];
		var els = [this.valueNote, this.valueNoteMin, this.valueNoteMax];

		for (var i = els.length - 1; i >= 0; i--) {
			$(els[i])
				.removeClass(mark + "_display_" + (!this.valueNoteDisplay ? "visible" : "hidden"))
				.addClass(mark + "_display_" + (this.valueNoteDisplay ? "visible" : "hidden"));
		}

		this.valueNoteDisplayAppliedEvent.trigger(this.valueNoteDisplay);
		return this.valueNoteDisplay;
	},

	setValueNoteDisplay(value) {
		if (typeof value !== "boolean") return;
		this.valueNoteDisplay = value;

		this.valueNoteDisplayUpdateEvent.trigger(this.valueNoteDisplay);
		return this.valueNoteDisplay;
	},

	getValueNoteDisplay() {
		return this.valueNoteDisplay;
	}
};

export default View;