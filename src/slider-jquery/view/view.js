import makeEventModule from "@event";
import helperModule from "@helper";

const makeEvent = makeEventModule;
const helper = helperModule; 

function View() {
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
	this.base = $("<div class='wrunner'>")[0];
	this.outer = $("<div class='wrunner__outer'>").appendTo($(this.base))[0];
	this.path = $("<div class='wrunner__path'>").appendTo($(this.outer))[0];
	this.pathPassed = $("<div class='wrunner__pathPassed'>").appendTo($(this.path))[0];

	// Path handles
	this.handle = $("<div class='wrunner__handle'>")[0];
	this.handleMin = $("<div class='wrunner__handle'>")[0];
	this.handleMax = $("<div class='wrunner__handle'>")[0];

	// Path values
	this.valueNote = $("<div class='wrunner__valueNote'>")[0];
	this.valueNoteMin = $("<div class='wrunner__valueNote'>")[0];
	this.valueNoteMax = $("<div class='wrunner__valueNote'>")[0];

	this.divisions = $("<div class='wrunner__divisions'>").appendTo($(this.outer))[0];
	this.divisionsList = [];


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
		this.themeUpdateEvent = makeEvent();
		this.directionUpdateEvent = makeEvent();
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
			var direction = this.direction.value,
				directionConstants = this.directionConstants;

			if(direction === directionConstants.horizontalValue) {
				scale = $(this.path).outerWidth();
				min = this.path.getBoundingClientRect().left;
				pos = event.clientX;
			}
			if(direction === directionConstants.verticalValue) {
				scale = $(this.path).outerHeight();
				min = this.path.getBoundingClientRect().top;
				pos = event.clientY;
			}

			max = min + scale;

			// If the dragg is out of slider"s range, the function stops.
			if (pos < min - 10 || pos > max + 10) return;

			if(direction === directionConstants.horizontalValue) {
				this.UIValueActionEvent.trigger((pos - min) / scale * 100);
			}
			if(direction === directionConstants.verticalValue) {
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

		this.els = this.divisionsList.concat(this.baseElsList);
		return this.divisionsList;
	},

	getDivisionsCount() {
		return this.divisionsCount;
	},

	drawValue(value, limits, currentType) {
		var pathScale, valueNoteScale, valueNoteMinScale, valueNoteMaxScale;
		var selected = value.selected;
		
		var direction = this.direction.value,
			directionConstants = this.directionConstants;
		var type = currentType.type,
			typeConstants = currentType.typeConstants;

		var clearList = [this.pathPassed, this.handle, this.handleMin, this.handleMax, this.valueNote, this.valueNoteMin, this.valueNoteMax];
		for (var i = 0; i < clearList.length; i++) {
			$(clearList[i]).attr("style", "");
		}

		if(type == typeConstants.singleValue) {
			$(this.valueNote).text(value.value);

			if(direction == directionConstants.horizontalValue) {
				// Passed path
				$(this.pathPassed).css("width", selected + "%");

				// Handle
				$(this.handle).css("left",selected + "%");

				pathScale = $(this.path).outerWidth(); valueNoteScale = $(this.valueNote).outerWidth();

				$(this.valueNote).css("left", (pathScale * selected / 100 - valueNoteScale / 2) / pathScale * 100 + "%");
			}

			if(direction == directionConstants.verticalValue) {
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

			if(direction == directionConstants.horizontalValue) {
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

			if(direction == directionConstants.verticalValue) {
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

	setTheme(newTheme) {
		if (typeof newTheme !== "string") return;

		this.theme.oldValue = this.theme.value;
		this.theme.value = newTheme;

		this.themeUpdateEvent.trigger(this.theme.value);
		return this.theme.value;
	},

	getTheme() {
		return this.theme.value;
	},

	setDirection(newDirection) {
		if (typeof newDirection !== "string") return;

		for (var constant in this.directionConstants) {
			if (newDirection === this.directionConstants[constant]) {
				this.direction.oldValue = this.direction.value;
				this.direction.value = newDirection;

				this.directionUpdateEvent.trigger({
					value: this.direction.value,
					constants: this.directionConstants
				});
				return {
					value: this.direction.value,
					constants: this.directionConstants
				};
			}
		}
	},

	getDirection() {
		return {
			value: this.direction.value,
			constants: this.directionConstants
		};
	},

	applyStyles() {
		var styles = [this.theme, this.direction];
		var els = [
			this.base, this.outer,
			this.path, this.pathPassed,
			this.divisions,	this.handle,
			this.handleMin, this.handleMax,
			this.valueNote, this.valueNoteMin,
			this.valueNoteMax
		].concat(this.divisionsList);

		for (var i = 0; i < els.length; i++) {
			var $el = $(els[i]);

			for(var style in styles) {
				var mark = els[i].classList[0],
					oldValue = styles[style].oldValue,
					value = styles[style].value;

				if (oldValue) $el.removeClass(mark + "_" + styles[style].className + "_" + oldValue);
				if (value) $el.addClass(mark + "_" + styles[style].className + "_" + value);
			}
		}

		this.stylesAppliedEvent.trigger(Object.assign({}, this.styles));
		return Object.assign({}, this.styles);
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
			$(els[i])
				.removeClass(mark + "_display_" + (!this.valueNoteDisplay ? "visible" : "hidden"))
				.addClass(mark + "_display_" + (this.valueNoteDisplay ? "visible" : "hidden"));
		}

		this.valueNoteDisplayAppliedEvent.trigger(this.valueNoteDisplay);
		return this.valueNoteDisplay;
	},

	getValueNoteDisplay() {
		return this.valueNoteDisplay;
	}
};

export default View;