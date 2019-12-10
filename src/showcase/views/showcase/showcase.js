class SliderExample {
  constructor(index, userOptions, sliderType, parent) {
    this.userOptions = userOptions;
    this.sliderType = sliderType;
    this.parent = parent;
    this.index = index;

    this._findControllers();
    this._makeSlider();
    this._addControllerLogics();
  }

  _makeSlider() {
    if (this.sliderType === 'native') {
      this.slider = window.wRunner({ ...this._getDefaultOptions(), ...this.userOptions, roots: this.parent });
    } else {
      this.slider = $(this.parent).wRunner({ ...this._getDefaultOptions(), ...this.userOptions });
    }
  }

  _execute(methodName, value) {
    this.sliderType === 'native'
      ? this.slider[methodName](value)
      : $(this.parent).wRunner(methodName, value);
  }

  _findControllers() {
    this.$controllersHolders = $('.js-sample').eq(this.index).find('.js-sample__parameter-value');
    this.$stepController = this.$controllersHolders.eq(0).find('input');
    this.$minLimitController = this.$controllersHolders.eq(1).find('input');
    this.$maxLimitController = this.$controllersHolders.eq(2).find('input');
    this.$typeControllers = [this.$controllersHolders.eq(3).find('input').eq(0), this.$controllersHolders.eq(3).find('input').eq(1)];
    this.$valueController = this.$controllersHolders.eq(4).find('input');
    this.$minValueController = this.$controllersHolders.eq(5).find('input');
    this.$maxValueController = this.$controllersHolders.eq(6).find('input');
    this.$rootsController = this.$controllersHolders.eq(7).find('input');
    this.$directionControllers = [this.$controllersHolders.eq(8).find('input').eq(0), this.$controllersHolders.eq(8).find('input').eq(1)];
    this.$valueNotesDisplayController = this.$controllersHolders.eq(9).find('input');
    this.$scaleDivisionsCountController = this.$controllersHolders.eq(10).find('input');
  }

  _addControllerLogics() {
    const handleKeyDown = (e) => {
      const $el = $(e.target);
      if (e.key === 'Escape') {
        $el.val(e.data.snapshot);
        $el.blur();
      }
    }

    const makeTextInput = (controller, data) => {
      controller.on('focus', () => {
        const snapshot = controller.val();
        controller.on('keydown', { snapshot }, handleKeyDown);
        controller.on('blur', () => {
          controller.off('keydown', { snapshot }, handleKeyDown);
          this._execute(data.method, data.action ? data.action(controller.val()) : controller.val())
        });
      });
    }

    this.$typeControllers[0].on('input', () => {
      this._execute('setType', this.$typeControllers[0].val());
    });

    this.$typeControllers[1].on('input', () => {
      this._execute('setType', this.$typeControllers[1].val());
    });

    this.$directionControllers[0].on('input', () => {
      this._execute('setDirection', this.$directionControllers[0].val());
    });

    this.$directionControllers[1].on('input', () => {
      this._execute('setDirection', this.$directionControllers[1].val());
    });

    this.$valueNotesDisplayController.on('input', () => {
      this._execute('setValueNotesDisplay', this.$valueNotesDisplayController[0].checked);
    });

    makeTextInput(this.$stepController, { method: 'setStep' });

    makeTextInput(this.$minLimitController, { method: 'setLimits', action(val) { return { minLimit: val }; } });

    makeTextInput(this.$maxLimitController, { method: 'setLimits', action(val) { return { maxLimit: val }; } });

    makeTextInput(this.$valueController, { method: 'setSingleValue' });

    makeTextInput(this.$minValueController, { method: 'setRangeValues', action(val) { return { minValue: val }; } });

    makeTextInput(this.$maxValueController, { method: 'setRangeValues', action(val) { return { maxValue: val }; } });

    makeTextInput(this.$scaleDivisionsCountController, { method: 'setScaleDivisionsCount' });
  }

  _getDefaultOptions() {
    return {
      onStepUpdate: (step) => {
        this.$stepController.val(step);
      },

      onLimitsUpdate: (limits) => {
        this.$minLimitController.val(limits.minLimit);
        this.$maxLimitController.val(limits.maxLimit);
      },

      onTypeUpdate: (type) => {
        if (type.value === this.$typeControllers[0].val()) {
          this.$typeControllers[0][0].checked = true;

          this.$minValueController.parent().parent().css('visibility', 'hidden');
          this.$maxValueController.parent().parent().css('visibility', 'hidden');
          this.$valueController.parent().parent().css('visibility', 'visible');
        }
        if (type.value === this.$typeControllers[1].val()) {
          this.$typeControllers[1][0].checked = true;

          this.$valueController.parent().parent().css('visibility', 'hidden');
          this.$minValueController.parent().parent().css('visibility', 'visible');
          this.$maxValueController.parent().parent().css('visibility', 'visible');
        }
      },

      onValueUpdate: (values) => {
        this.$valueController.val(values.singleValue);
        this.$minValueController.val(values.rangeValueMin);
        this.$maxValueController.val(values.rangeValueMax);
      },

      onRootsUpdate: (roots) => {
        const $roots = $(roots);
        let str = '';
        for (let i = 0; i < $roots[0].classList.length; i += 1) {
          str += `.${$roots[0].classList[i]}`;
        }
        this.$rootsController.val(str);
      },

      onDirectionUpdate: (direction) => {
        if (direction.value === this.$directionControllers[0].val()) {
          this.$directionControllers[0][0].checked = true;
        }
        if (direction.value === this.$directionControllers[1].val()) {
          this.$directionControllers[1][0].checked = true;
        }
      },

      onValueNotesDisplayUpdate: (value) => {
        this.$valueNotesDisplayController[0].checked = value;
      },

      onScaleDivisionsCountUpdate: (count) => {
        this.$scaleDivisionsCountController.val(count);
      },
    }
  }
}

function makeSlider(...args) {
  const result = new SliderExample(...args);
  return result;
}


function test() {
  makeSlider(0, {}, 'native', document.getElementById('sample0'));

  makeSlider(1, {
    direction: 'vertical',
    step: 5,
    type: 'range',
  }, 'native', document.getElementById('sample1'));

  makeSlider(2, {
    scaleDivisionsCount: 16,
    direction: 'vertical',
    step: 5,
    type: 'range',
  }, 'jquery', document.getElementById('sample2'));

  makeSlider(3, {
    valueNotesDisplay: false,
    scaleDivisionsCount: 0,
  }, 'jquery', document.getElementById('sample3'));
}

document.addEventListener('DOMContentLoaded', test);
