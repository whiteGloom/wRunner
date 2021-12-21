import makeInstance from './makeInstance';

(function jqueryVersion($) {
  // eslint-disable-next-line no-param-reassign
  $.fn.wRunner = function cover(...args) {
    if (typeof args[0] === 'object') {
      const options = args[0];
      return this.each((index, el) => {
        if ($(el).data('wRunner')) return;
        $(el).data('wRunner', makeInstance({ ...options, roots: el }));
      });
    }

    if (typeof args[0] === 'string') {
      const method = args[0];
      const options = args[1];
      const results = [];
      let isMethodReturnResult = false;

      this.each((index, el) => {
        const result = $(el).data('wRunner')[method](options);
        results.push(result);
        if (result !== undefined) isMethodReturnResult = true;
      });

      if (isMethodReturnResult.length) {
        if (results.length === 1) return results[0];
        if (results.length > 1) return results;
      }
    }

    return this;
  };
}($));
