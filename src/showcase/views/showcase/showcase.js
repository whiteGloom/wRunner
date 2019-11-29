function makeSlider(index, specOptions, sliderType, element) {
  const $controllersHolders = $('.js-sample').eq(index).find('.js-sample__parameter-value');
  const $stepController = $controllersHolders.eq(0).find('input');
  const $minLimitController = $controllersHolders.eq(1).find('input');
  const $maxLimitController = $controllersHolders.eq(2).find('input');
  const $typeControllers = [$controllersHolders.eq(3).find('input').eq(0), $controllersHolders.eq(3).find('input').eq(1)];
  const $valueController = $controllersHolders.eq(4).find('input');
  const $minValueController = $controllersHolders.eq(5).find('input');
  const $maxValueController = $controllersHolders.eq(6).find('input');
  const $rootsController = $controllersHolders.eq(7).find('input');
  const $directionControllers = [$controllersHolders.eq(8).find('input').eq(0), $controllersHolders.eq(8).find('input').eq(1)];
  const $valueNoteDisplayController = $controllersHolders.eq(9).find('input');
  const $divisionsCountController = $controllersHolders.eq(10).find('input');

  const options = {
    ...specOptions,
    ...{
      onStepUpdate(step) {
        $stepController.val(step);
      },

      onLimitsUpdate(limits) {
        $minLimitController.val(limits.minLimit);
        $maxLimitController.val(limits.maxLimit);
      },

      onTypeUpdate(type) {
        if (type.value === $typeControllers[0].val()) {
          $typeControllers[0][0].checked = true;

          $minValueController.parent().parent().css('visibility', 'hidden');
          $maxValueController.parent().parent().css('visibility', 'hidden');
          $valueController.parent().parent().css('visibility', 'visible');
        }
        if (type.value === $typeControllers[1].val()) {
          $typeControllers[1][0].checked = true;

          $valueController.parent().parent().css('visibility', 'hidden');
          $minValueController.parent().parent().css('visibility', 'visible');
          $maxValueController.parent().parent().css('visibility', 'visible');
        }
      },

      onValueUpdate(value) {
        if (value.value !== undefined) {
          $valueController.val(value.value);
        }
        if ((value.minValue && value.minValue !== undefined)
          || (value.maxValue && value.maxValue !== undefined)) {
          $minValueController.val(value.minValue);
          $maxValueController.val(value.maxValue);
        }
      },

      onRootsUpdate(roots) {
        const $roots = $(roots);
        let str = '';
        for (let i = 0; i < $roots[0].classList.length; i += 1) {
          str += `.${$roots[0].classList[i]}`;
        }
        $rootsController.val(str);
      },

      onDirectionUpdate(direction) {
        if (direction.value === $directionControllers[0].val()) {
          $directionControllers[0][0].checked = true;
        }
        if (direction.value === $directionControllers[1].val()) {
          $directionControllers[1][0].checked = true;
        }
      },

      onValueNoteDisplayUpdate(value) {
        $valueNoteDisplayController[0].checked = value;
      },

      onDivisionsCountUpdate(count) {
        $divisionsCountController.val(count);
      },
    },
  };

  let slider;
  // Creating sliders
  if (sliderType === 'native') {
    slider = window.wRunner({ ...options, roots: element });
  } else {
    slider = $(element).wRunner(options);
  }


  function keyPressHandler(e) {
    const $el = $(this);
    if (e.key === 'Enter') {
      slider[e.data.method](e.data.action ? e.data.action($el.val()) : $el.val());
      $el.blur();
    }
    if (e.key === 'Escape') {
      $el.val(e.data.snapshot);
      $el.blur();
    }
  }

  function makeTextInput(controller, eventaData) {
    controller.on('focus', () => {
      const snapshot = controller.val();
      controller.on('keydown', { ...eventaData, snapshot }, keyPressHandler);
      controller.on('blur', () => {
        controller.off('keydown', { ...eventaData, snapshot }, keyPressHandler);
      });
    });
  }

  // Change slider parameters using conrtollers
  $typeControllers[0].on('input', () => {
    slider.setType($typeControllers[0].val());
  });

  $typeControllers[1].on('input', () => {
    slider.setType($typeControllers[1].val());
  });

  $directionControllers[0].on('input', () => {
    slider.setDirection($directionControllers[0].val());
  });

  $directionControllers[1].on('input', () => {
    slider.setDirection($directionControllers[1].val());
  });

  $valueNoteDisplayController.on('input', () => {
    slider.setValueNoteDisplay($valueNoteDisplayController[0].checked);
  });

  makeTextInput($stepController, { method: 'setStep' });

  makeTextInput($minLimitController, { method: 'setLimits', action(val) { return { minLimit: val }; } });

  makeTextInput($maxLimitController, { method: 'setLimits', action(val) { return { maxLimit: val }; } });

  makeTextInput($valueController, { method: 'setSingleValue' });

  makeTextInput($minValueController, { method: 'setRangeValue', action(val) { return { minValue: val }; } });

  makeTextInput($maxValueController, { method: 'setRangeValue', action(val) { return { maxValue: val }; } });

  makeTextInput($divisionsCountController, { method: 'setDivisionsCount' });
}

function test() {
  makeSlider(0, {}, 'native', document.getElementById('sample0'));

  makeSlider(1, {
    direction: 'vertical',
    step: 5,
    type: 'range',
  }, 'native', document.getElementById('sample1'));

  makeSlider(2, {
    divisionsCount: 16,
    direction: 'vertical',
    step: 5,
    type: 'range',
  }, 'jquery', document.getElementById('sample2'));

  makeSlider(3, {
    valueNoteDisplay: false,
    divisionsCount: 0,
  }, 'jquery', document.getElementById('sample3'));
}

document.addEventListener('DOMContentLoaded', test);
