;(function($){
	$.fn.wRunner = function(options) {
		var options = options ? options : {};
		options.roots = this[0];

		const helper = new function() {
			this.isNumber = function(value, exceps) {
				var exceps = exceps ? exceps : [];
				for (var i = 0; i < exceps.length; i++) {
					if (typeof value === exceps[i]) return true
				};

				if (!Number.isNaN(+value) && (typeof value === 'number' && !Number.isNaN(+value) || typeof value === 'string' && typeof +value === 'number')) return true;

				return false
			},

			this.toNumber = function(value) {
				if (typeof value === 'number' && !Number.isNaN(+value) || typeof value === 'string' && typeof +value === 'number' && !Number.isNaN(+value)) return +value;
				return false
			},

			this.isDomEl = function(el) {
				if (typeof el !== 'object' || Number.isNaN(el) || el === null) return false;
				return 'ownerDocument' in el ? true : false;
			},

			this.isObject = function(el) {
				if (typeof el === 'object' && el !== null && !Number.isNaN(el)) return true;
				return false
			},

			this.isArray = function(el) {
				if (typeof el === 'object' && el !== null && !Number.isNaN(el) && el.length) return true;
				return false
			}
		}

		const structure = new function() {
			// Model
			this.Model = function() {
				// Defaults
				this.minLimit = 0;
				this.maxLimit = 100;
				this.valuesCount = this.maxLimit - this.minLimit;
				this.singleValue = 50;
				this.rangeMinValue = 20;
				this.rangeMaxValue = 80;
				this.singleSelected = (this.singleValue - this.minLimit) / this.valuesCount * 100;
				this.rangeSelected = (this.rangeMaxValue - this.rangeMinValue) / this.valuesCount * 100;
				this.step = 1;
				this.type = 'single';
				this.typeConstants = {
					singleValue: 'single',
					rangeValue: 'range',
				};

				this.valueByProgressUpdateEvent = makeEvent();
				this.valueUpdateEvent = makeEvent();
				this.limitsUpdateEvent = makeEvent();
				this.stepUpdateEvent = makeEvent();
				this.percentageUpdateEvent = makeEvent();
				this.typeUpdateEvent = makeEvent();
			};
			this.Model.prototype = {
				setLimits: function(newLimits, auto) {
					var newLimits = newLimits ? newLimits : {}

					// If any argument does not fit, it will take a current value.
					var min = helper.isNumber(newLimits.minLimit) ? +newLimits.minLimit : this.minLimit,
						max = helper.isNumber(newLimits.maxLimit) ? +newLimits.maxLimit : this.maxLimit;

					// If minLimit > maxLimit, it will reverse them.
					if (min <= max) {
						this.minLimit = min;
						this.maxLimit = max;
					} else {
						this.minLimit = max;
						this.maxLimit = min;
						if (!auto) console.log('Values have been reversed, because the minimum value is less than the maximum value.');
					};

					// Update count of values.
					this.valuesCount = this.maxLimit - this.minLimit;

					this.limitsUpdateEvent.trigger({
						minLimit: this.minLimit,
						maxLimit: this.maxLimit,
						valuesCount: this.valuesCount
					});

					return {
						minLimit: this.minLimit,
						maxLimit: this.maxLimit,
						valuesCount: this.valuesCount
					};
				},

				getLimits: function() {
					return {
						minLimit: this.minLimit,
						maxLimit: this.maxLimit,
						valuesCount: this.valuesCount
					}
				},

				setValue: function(newValue, auto) {
					var set = setTo.bind(this);

					if(this.type == this.typeConstants.singleValue) {
						var val = helper.isNumber(newValue) ? +newValue : this.singleValue;
						set(val, 'singleValue');

						// Update selected
						this.singleSelected = (this.singleValue - this.minLimit) / this.valuesCount * 100;

						// Returns
						this.valueUpdateEvent.trigger({
							value: this.singleValue,
							selected: this.singleSelected
						});
						return {
							value: this.singleValue,
							selected: this.singleSelected
						}
					};

					if (this.type == this.typeConstants.rangeValue) {
						// If new value is a object
						if (helper.isObject(newValue) || newValue == null) {
							if(newValue == null) {
								var min = this.rangeMinValue;
								var max = this.rangeMaxValue;
							} else {
								var min = helper.isNumber(newValue.minValue) ? +newValue.minValue : this.rangeMinValue;
								var max = helper.isNumber(newValue.maxValue) ? +newValue.maxValue : this.rangeMaxValue;
							};

							if (min > max) {
								let clone = max;
								max = min;
								min = clone;
							};

							set(min, 'rangeMinValue');
							set(max, 'rangeMaxValue');
						};

						// If new value is a number
						if (helper.isNumber(newValue)) {
							// Choosing a value to set 
							if (newValue < (this.rangeMaxValue + this.rangeMinValue) / 2) {
								set(+newValue, 'rangeMinValue');
								set(this.rangeMaxValue, 'rangeMaxValue');
							} else {
								set(this.rangeMinValue, 'rangeMinValue');
								set(+newValue, 'rangeMaxValue');
							}			
						};

						// Update selected
						this.rangeSelected = (this.rangeMaxValue - this.rangeMinValue) / this.valuesCount * 100;

						// Returns
						this.valueUpdateEvent.trigger({
							minValue: this.rangeMinValue,
							maxValue: this.rangeMaxValue,
							selected: this.rangeSelected,
						});
						return {
							minValue: this.rangeMinValue,
							maxValue: this.rangeMaxValue,
							selected: this.rangeSelected,
						}
					}

					// Setter
					function setTo(newValue, mutable) {
						var stepped;

						// Calculating stepped value.
						if (+newValue != this[mutable]) {
							stepped = this[mutable] - Math.round((this[mutable] - +newValue) / this.step) * this.step;
						} else {
							stepped = Math.round(this[mutable] / this.step) * this.step;
						};

						if (stepped < this.minLimit) {
							this[mutable] = this.minLimit;
							if (!auto) console.log('The value was equated to the minimum, because it is less than the minimum value.');
						} else if (stepped > this.maxLimit) {
							this[mutable] = this.maxLimit;
							if (!auto) console.log('The value was equated to the maximum, because it is more than the maximum value.');
						} else {
							this[mutable] = stepped;
						};
					}
				},

				getValue: function() {
					if(this.type == this.typeConstants.singleValue) {
						return {
							value: this.singleValue,
							selected: this.singleSelected,
						}
					};

					if(this.type == this.typeConstants.rangeValue) {
						return {
							minValue: this.rangeMinValue,
							maxValue: this.rangeMaxValue,
							selected: this.rangeSelected,
						}
					};
				},

				setStep: function(newStep) {
					if (!helper.isNumber(newStep) || newStep <= 0) return;
					this.step = +newStep;

					this.stepUpdateEvent.trigger(this.step);
					return this.step;
				},

				getStep: function() {
					return this.step;
				},

				// Function that calculating new value by click or drag.
				setValueByProgress: function(progress) {
					if (!helper.isNumber(progress)) return;

					var value = Math.round(this.valuesCount * +progress / 100 + this.minLimit);

					this.valueByProgressUpdateEvent.trigger(value);
					return value
				},

				setType: function(type) {
					var exist = false;
					for (var constant in this.typeConstants) {
						if (type === this.typeConstants[constant]) {
							exist = true;
							break;
						}
					}

					if (!exist) return;
					this.type = type;

					this.typeUpdateEvent.trigger(this.type);
					if (this.type == this.typeConstants.singleValue) {
						this.valueUpdateEvent.trigger({
							value: this.value,
							selected: this.singleSelected
						});
					}
					if (this.type == this.typeConstants.rangeValue) {
						this.valueUpdateEvent.trigger({
							minValue: this.minValue,
							maxValue: this.maxValue,
							selected: this.rangeSelected
						})
					}
					return this.type
				},

				getType: function() {
					return {
						type: this.type,
						typeConstants: Object.assign({}, this.typeConstants)
					};
				},
			};

			// View
			this.View = function() {
				// Defaults
				this.roots = document.body;
				this.divisionsCount = 5;
				this.valueNoteDisplay = true;
				this.styles = {
					theme: {
						value: 'default',
						className: 'theme',
						oldValue: null
					},
					
					direction: {
						value: 'horizontal',
						className: 'direction',
						oldValue: null
					},
				};
				this.stylesConstants = {
					direction: {
						horizontalValue: 'horizontal', 
						verticalValue: 'vertical'
					}
				};

				// Lists of els
				this.stableElsList = [];
				this.divisionsList = [];
				this.els = [];

				// Stable elements
				// Base
				this.base = $('<div class="wrunner">')[0];
				this.stableElsList.push(this.base);

				// Outer
				this.outer = $('<div class="wrunner__outer">').appendTo($(this.base))[0];
				this.stableElsList.push(this.outer);

				// Path
				this.path = $('<div class="wrunner__path">').appendTo($(this.outer))[0];
				this.stableElsList.push(this.path);

				// Passed path
				this.pathPassed = $('<div class="wrunner__pathPassed">').appendTo($(this.path))[0];
				this.stableElsList.push(this.pathPassed);

				// Path handles
				this.handle = $('<div class="wrunner__handle">')[0];
				this.stableElsList.push(this.handle);
				this.handleMin = $('<div class="wrunner__handle">')[0];
				this.stableElsList.push(this.handleMin);
				this.handleMax = $('<div class="wrunner__handle">')[0];
				this.stableElsList.push(this.handleMax);

				// Path values
				this.valueNote = $('<div class="wrunner__valueNote">')[0];
				this.stableElsList.push(this.valueNote);
				this.valueMinNote = $('<div class="wrunner__valueNote">')[0];
				this.stableElsList.push(this.valueMinNote);
				this.valueMaxNote = $('<div class="wrunner__valueNote">')[0];
				this.stableElsList.push(this.valueMaxNote);

				// Division's container
				this.divisions = $('<div class="wrunner__divisions">').appendTo($(this.outer))[0];
				this.stableElsList.push(this.divisions);


				// EVENTS
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
				this.baseDOMGeneratedEvent = makeEvent();
				this.DOMUpdateEvent = makeEvent();

				// Listenners
				$(this.path).on('mousedown', function(event) {
					this.mouseDownEvent.trigger(event);
				}.bind(this))
			};
			this.View.prototype = {
				updateDOM: function(type) {
					if(type.type == type.typeConstants.singleValue) {
						$(this.handleMin).detach();
						$(this.handleMax).detach();
						$(this.valueMinNote).detach();
						$(this.valueMaxNote).detach();

						$(this.handle).appendTo($(this.path));
						$(this.valueNote).appendTo($(this.outer));
					}
					if(type.type == type.typeConstants.rangeValue) {
						$(this.handle).detach();
						$(this.valueNote).detach();

						$(this.handleMin).appendTo($(this.path));
						$(this.handleMax).appendTo($(this.path));
						$(this.valueMinNote).appendTo($(this.outer));
						$(this.valueMaxNote).appendTo($(this.outer));
					}

					this.DOMUpdateEvent.trigger();
				},

				action: function(event) {
					var	dragged = false,
						moveBind = move.bind(this);

					// The handler that indicates that the handle has been dragged.
					$(document.body).one('mousemove', () => dragged = true);
					$(document.body).on('mousemove', moveBind);

					// The handler that called after click's end.
					$(document.body).one('mouseup', function(upEvent) {
						var targ = upEvent.target;

						// Removing bind.
						$(document.body).off('mousemove', moveBind);

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
					};

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

						// If the dragg is out of slider's range, the function stops.
						if (pos < min - 10 || pos > max + 10) return;

						if(dir == this.stylesConstants.direction.horizontalValue) {
							this.UIValueActionEvent.trigger((pos - min) / scale * 100)
						}
						if(dir == this.stylesConstants.direction.verticalValue){
							this.UIValueActionEvent.trigger(100 - (pos - min) / scale * 100)
						}
					};
				},

				append: function() {
					$(this.base).appendTo($(this.roots));
					return this.roots;
				},

				setRoots: function(roots) {
					if (!helper.isDomEl(roots)) return;
					this.roots = roots;

					//console.log(this.roots)
					this.rootsUpdateEvent.trigger(this.roots);
					return this.roots;
				},

				getRoots: function() {
					return this.roots;
				},

				generateDivisions: function() {
					$(this.divisions).empty();
					this.divisionsList.length = 0;

					for(var i = this.divisionsCount; i > 0; i--) {
						var instance = $('<div class="wrunner__division">');
						this.divisionsList.push(instance[0]);
						instance.appendTo($(this.divisions))
					}

					this.els = this.divisionsList.concat(this.stableElsList);
					return this.divisionsList
				},

				setDivisionsCount: function(count, auto) {
					if (!helper.isNumber(count) || count < 0) return;

					var count = Math.round(count);

					if (count == 1) {
						count++;
						if(!auto) console.log('Count was increased by one, cause it may not be equal to one.')
					};
					this.divisionsCount = +count;

					this.divisionsCountUpdateEvent.trigger(this.divisionsCount);
					return this.divisionsCount;
				},

				getDivisionsCount: function() {
					return this.divisionsCount;
				},

				drawValue: function(value, limits, currentType) {
					var pathScale, valueNoteScale, valueMinNoteScale, valueMaxNoteScale;
					var selected = value.selected;
					
					var dir = this.styles.direction.value,
						dirConsts = this.stylesConstants.direction;
					var type = currentType.type,
						typeConstants = currentType.typeConstants;

					$(this.pathPassed).attr('style', '');
					$(this.handle).attr('style', '');
					$(this.handleMin).attr('style', '');
					$(this.handleMax).attr('style', '');
					$(this.valueNote).attr('style', '');
					$(this.valueMinNote).attr('style', '');
					$(this.valueMaxNote).attr('style', '');

					if(type == typeConstants.singleValue) {
						$(this.valueNote).text(value.value);

						if(dir == dirConsts.horizontalValue) {
							// Passed path
							$(this.pathPassed).css('width', selected + '%');

							// Handle
							$(this.handle).css('left',selected + '%');

							pathScale = $(this.path).outerWidth(); valueNoteScale = $(this.valueNote).outerWidth();

							$(this.valueNote).css('left', (pathScale * selected / 100 - valueNoteScale / 2) / pathScale * 100 + '%');
						}

						if(dir == dirConsts.verticalValue) {
							// Passed path
							$(this.pathPassed).css('height', selected + '%');

							// Handle
							$(this.handle).css('top', 100 - selected + '%');

							pathScale = $(this.path).outerHeight();	valueNoteScale = $(this.valueNote).outerHeight();

							$(this.valueNote).css('top', 100 - (pathScale * selected / 100 + valueNoteScale / 2) / pathScale * 100 + '%');
						}
					}

					if (type == typeConstants.rangeValue) {
						var start = (value.minValue - limits.minLimit) / limits.valuesCount * 100;

						$(this.valueMinNote).text(value.minValue);
						$(this.valueMaxNote).text(value.maxValue);

						if(dir == dirConsts.horizontalValue) {
				
								// Passed path
								$(this.pathPassed).css('width', selected + '%');
								$(this.pathPassed).css('left', start + '%');
				
								// Handle
								$(this.handleMin).css('left', start + '%');
								$(this.handleMax).css('left', start + selected +'%');
				
								pathScale = $(this.path).outerWidth();
								valueMinNoteScale = $(this.valueMinNote).outerWidth(); valueMaxNoteScale = $(this.valueMaxNote).outerWidth();
				
								$(this.valueMinNote).css('left', (pathScale * start / 100 - valueMinNoteScale / 2) / pathScale * 100 + '%');
								$(this.valueMaxNote).css('left', (pathScale * (start + selected) / 100 - valueMaxNoteScale / 2) / pathScale * 100 + '%');
						}

						if(dir == dirConsts.verticalValue) {
							$(this.pathPassed).css('height', selected + '%');
							$(this.pathPassed).css('top', 100 - selected - start + '%');

							// Handle
							$(this.handleMax).css('top', 100 - start - selected + '%');
							$(this.handleMin).css('top', 100 - start  +'%');

							pathScale = $(this.path).outerHeight();
							valueMinNoteScale = $(this.valueMinNote).outerHeight(); valueMaxNoteScale = $(this.valueMaxNote).outerHeight();

							$(this.valueMinNote).css('top', 100 - (pathScale * start / 100 + valueMinNoteScale / 2) / pathScale * 100 + '%');
							$(this.valueMaxNote).css('top', 100 - (pathScale * (start + selected) / 100 + valueMaxNoteScale / 2) / pathScale * 100 + '%');
						}
					}

					return value
				},

				setStyles: function(newStyles) {
					if (!helper.isObject(newStyles)) return;

					var changed = false;
					for(var prop in newStyles) {
						if(!(prop in this.styles)) continue;
						var mutable = this.styles[prop];

						if (newStyles[prop].value !== undefined) {
							if (this.stylesConstants[prop]) {
								for (var defs in this.stylesConstants[prop]) {
									if (newStyles[prop].value == this.stylesConstants[prop][defs]){
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

						if (typeof newStyles[prop].className == 'string') {
							mutable.className = newStyles[prop].className;
							changed = true;
						}
					}

					if(!changed) return;

					this.stylesUpdateEvent.trigger(Object.assign({}, this.styles));
					return Object.assign({}, this.styles)
				},

				applyStyles: function() {
					var styles = this.styles;

					for (var i = this.els.length - 1; i >= 0; i--) {
						var el = $(this.els[i]);

						for(var prop in styles) {
							var mark = this.els[i].classList[0],
								oldValue = styles[prop].oldValue,
								value = styles[prop].value;

							if (oldValue) el.removeClass(mark + '_' + styles[prop].className + '_' + oldValue);
							if (value) el.addClass(mark + '_' + styles[prop].className + '_' + value);
						}
					}

					this.stylesAppliedEvent.trigger(Object.assign({}, this.styles))
					return Object.assign({}, this.styles)
				},

				getStyles: function() {
					return {
						styles: Object.assign({}, this.styles),
						stylesConstants: Object.assign({}, this.stylesConstants)
					}
				},

				applyValueNoteDisplay: function() {
					var mark = this.valueNote.classList[0];
					var els = [this.valueNote, this.valueMinNote, this.valueMaxNote];

					for (var i = els.length - 1; i >= 0; i--) {
						$(els[i])
							.removeClass(mark + '_display_' + (!this.valueNoteDisplay ? 'visible' : 'hidden'))
							.addClass(mark + '_display_' + (this.valueNoteDisplay ? 'visible' : 'hidden'));
					}

					this.valueNoteDisplayAppliedEvent.trigger(this.valueNoteDisplay);
					return this.valueNoteDisplay
				},

				setValueNoteDisplay: function(value) {
					if (typeof value !== 'boolean') return;
					this.valueNoteDisplay = value;

					this.valueNoteDisplayUpdateEvent.trigger(this.valueNoteDisplay);
					return this.valueNoteDisplay;
				},

				getValueNoteDisplay: function() {
					return this.valueNoteDisplay;
				},
			};

			// Presenter
			this.Presenter = function(data) {
				var data = data ? data : {};

				this.model = data.model;
				this.view = data.view;

				// Model events
				this.model.stepUpdateEvent.addHandler(function(data) {
					this.model.setValue(null, true)
				}.bind(this));

				this.model.valueByProgressUpdateEvent.addHandler(function(data) {
					this.model.setValue(data, true);
				}.bind(this));

				this.model.valueUpdateEvent.addHandler(function(data) {
					this.view.drawValue(this.model.getValue(), this.model.getLimits(), this.model.getType())
				}.bind(this));

				this.model.limitsUpdateEvent.addHandler(function(data) {
					this.model.setValue(null, true);
				}.bind(this));

				this.model.typeUpdateEvent.addHandler(function(data) {
					this.view.updateDOM(this.model.getType());
				}.bind(this));


				// View events
				this.view.DOMUpdateEvent.addHandler(function(data) {
					this.view.drawValue(this.model.getValue(), this.model.getLimits(), this.model.getType())
				}.bind(this));

				this.view.mouseDownEvent.addHandler(function(data) {
					this.view.action(data)
				}.bind(this));

				this.view.UIValueActionEvent.addHandler(function(data) {
					this.model.setValueByProgress(data, true)
				}.bind(this));

				this.view.stylesUpdateEvent.addHandler(function(data) {
					this.view.applyStyles();
					this.view.drawValue(this.model.getValue(), this.model.getLimits(), this.model.getType())
				}.bind(this));

				this.view.valueNoteDisplayUpdateEvent.addHandler(function(data) {
					this.view.applyValueNoteDisplay();
					this.view.drawValue(this.model.getValue(), this.model.getLimits(), this.model.getType())
				}.bind(this));

				this.view.rootsUpdateEvent.addHandler(function(data) {
					this.view.append();
				}.bind(this));

				this.view.divisionsCountUpdateEvent.addHandler(function(data) {
					this.view.generateDivisions();
					this.view.applyStyles();
				}.bind(this));


				// Plugin load
				this.runInstance();
				this.applyOptions(data.options);
				this.triggerEvents();
			};

			this.Presenter.prototype = {
				runInstance: function() {
					this.view.updateDOM(this.model.getType());
					this.view.generateDivisions();
					this.view.append();
					this.view.applyValueNoteDisplay();
					this.view.applyStyles();
					this.view.drawValue(this.model.getValue(), this.model.getLimits(), this.model.getType());
				},

				applyOptions: function(options) {
					var options = options ? options : {};
					this.view.setRoots(options.roots);

					// Model
					if (options.step !== undefined) this.model.setStep(options.step);
					if (options.type !== undefined) this.model.setType(options.type);
					if (options.limits !== undefined) this.model.setLimits(options.limits);
					if (options.value !== undefined) this.model.setValue(options.value);

					// View
					if (options.divisionsCount !== undefined) this.view.setDivisionsCount(options.divisionsCount);
					if (options.valueNoteDisplay !== undefined) this.view.setValueNoteDisplay(options.valueNoteDisplay);
					if (options.styles !== undefined) this.view.setStyles(options.styles);

					// Events
					if (options.onStepUpdate !== undefined) this.onStepUpdate(options.onStepUpdate);
					if (options.onTypeUpdate !== undefined) this.onTypeUpdate(options.onTypeUpdate);
					if (options.onLimitsUpdate !== undefined) this.onLimitsUpdate(options.onLimitsUpdate);
					if (options.onValueUpdate !== undefined) this.onValueUpdate(options.onValueUpdate);

					if (options.onRootsUpdate !== undefined) this.onRootsUpdate(options.onRootsUpdate);
					if (options.onDivisionsCountUpdate !== undefined) this.onDivisionsCountUpdate(options.onDivisionsCountUpdate);
					if (options.onValueNoteDisplayUpdate !== undefined) this.onValueNoteDisplayUpdate(options.onValueNoteDisplayUpdate);
					if (options.onStylesUpdate !== undefined) this.onStylesUpdate(options.onStylesUpdate);
				},

				triggerEvents: function() {
					if (this.model.type == this.model.typeConstants.singleValue) {
						this.model.valueUpdateEvent.trigger({
							value: this.model.value,
							selected: this.model.singleSelected
						});
					}
					if (this.model.type == this.model.typeConstants.rangeValue) {
						this.model.valueUpdateEvent.trigger({
							minValue: this.model.minValue,
							maxValue: this.model.maxValue,
							selected: this.model.rangeSelected
						})
					}

					this.model.typeUpdateEvent.trigger(this.model.type);
					this.model.stepUpdateEvent.trigger(this.model.step);;
					this.model.limitsUpdateEvent.trigger({
						minLimit: this.model.minLimit,
						maxLimit: this.model.maxLimit,
						valuesCount: this.model.valuesCount
					});

					this.view.stylesUpdateEvent.trigger(Object.assign({}, this.view.styles));
					this.view.valueNoteDisplayUpdateEvent.trigger(this.view.valueNoteDisplay);
					this.view.rootsUpdateEvent.trigger(this.view.roots);
					this.view.divisionsCountUpdateEvent.trigger(this.view.divisionsCount);
				},

				onValueUpdate: function(handler) {
					this.model.valueUpdateEvent.addHandler(handler);
				},

				onStepUpdate: function(handler) {
					this.model.stepUpdateEvent.addHandler(handler);
				},

				onLimitsUpdate: function(handler) {
					this.model.limitsUpdateEvent.addHandler(handler);
				},

				onTypeUpdate: function(handler) {
					this.model.typeUpdateEvent.addHandler(handler);
				},

				onStylesUpdate: function(handler) {
					this.view.stylesUpdateEvent.addHandler(handler);
				},

				onValueNoteDisplayUpdate: function(handler) {
					this.view.valueNoteDisplayUpdateEvent.addHandler(handler);
				},

				onRootsUpdate: function(handler) {
					this.view.rootsUpdateEvent.addHandler(handler);
				},

				onDivisionsCountUpdate: function(handler) {
					this.view.divisionsCountUpdateEvent.addHandler(handler);
				},
			}

			// Event handler
			function makeEvent() {
				// List of a handlers that will process a event.
				var handlers = [];

				// Add a new handler.
				var addHandler = function(handler) {
					if (typeof handler !== 'function') {
						console.log('The handler must be a function');
						return
					};
				
					for (var i = 0; i < handlers.length; i++) {
						if (handlers[i] === handler) {
							console.log('The handler already in the list');
							return
						}
					};

					handlers.push(handler);
				};

				// Remove a handler.
				var removeHandler = function(handler) {
					for (var i = 0; i < handlers.length; i++) {
						if (handlers[i] === handler) {
							handlers.splice(i, 1);
							return;
						}
					}
					console.log('could not find observer in list of observers');
				};


				// Trigger a event and notify handlers.
				var trigger = function(data) {
					var handlersClone = handlers.slice(0);
					for (var i = 0; i < handlersClone.length; i++) {
						handlersClone[i](data);
					}
				};

				// Methods of new event.
				return {
					addHandler: addHandler,
					removeHandler: removeHandler,
					trigger: trigger,
				};
			}
		}

		return newInstance();


		function newInstance() {

			var model = new structure.Model(),
				view = new structure.View(),
				presenter = new structure.Presenter({model: model, view: view, options: options});

			return {
				setType: model.setType.bind(model),
				setLimits: model.setLimits.bind(model),
				setValue: model.setValue.bind(model),
				setStep: model.setStep.bind(model),

				getType: model.getType.bind(model),
				getLimits: model.getLimits.bind(model),
				getValue: model.getValue.bind(model),
				getStep: model.getStep.bind(model),

				setRoots: view.setRoots.bind(view),
				setStyles: view.setStyles.bind(view),
				setValueNoteDisplay: view.setValueNoteDisplay.bind(view),
				setDivisionsCount: view.setDivisionsCount.bind(view),

				getRoots: view.getRoots.bind(view),
				getStyles: view.getStyles.bind(view),
				getValueNoteDisplay: view.getValueNoteDisplay.bind(view),
				getDivisionsCount: view.getDivisionsCount.bind(view),

				onStepUpdate: presenter.onStepUpdate.bind(presenter),
				onTypeUpdate: presenter.onTypeUpdate.bind(presenter),
				onLimitsUpdate: presenter.onLimitsUpdate.bind(presenter),
				onValueUpdate: presenter.onValueUpdate.bind(presenter),
	
				onRootsUpdate: presenter.onRootsUpdate.bind(presenter),
				onDivisionsCountUpdate: presenter.onDivisionsCountUpdate.bind(presenter),
				onValueNoteDisplayUpdate: presenter.onValueNoteDisplayUpdate.bind(presenter),
				onStylesUpdate: presenter.onStylesUpdate.bind(presenter),
			};
		};
	};
})($);