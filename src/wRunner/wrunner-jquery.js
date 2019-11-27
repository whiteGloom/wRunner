import makeInstance from './makeInstance';

(function jqueryVersion($) {
  $.fn.wRunner = function cover(options = {}) {
    return makeInstance({ ...options, roots: this[0] });
  };
}($));
