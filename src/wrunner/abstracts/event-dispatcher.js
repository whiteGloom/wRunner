class EventDispatcher {
  /** @const {string} */
  static EVENT_ANY = 'event-any';

  /** @class */
  constructor() {
    /**
     * @type {Object<string, Array<Function>>}
     * @protected
     */
    this._listeners = {};
  }

  /**
   * @param {string} eventName
   * @param {Function} handler
   * @public
   */
  on(eventName, handler) {
    if (!Object.keys(this._listeners).includes(eventName)) {
      this._listeners[eventName] = [];
    }

    if (this._listeners[eventName].includes(handler)) {
      return;
    }

    this._listeners[eventName].push(handler);
  }

  /**
   * @param {string} eventName
   * @param {Function} handler
   * @public
   */
  off(eventName, handler) {
    if (!Object.keys(this._listeners).includes(eventName)) {
      this._listeners[eventName] = [];
    }

    if (!this._listeners[eventName].includes(handler)) {
      return;
    }

    const indexOfHandler = this._listeners[eventName].indexOf(handler);

    this._listeners[eventName].splice(indexOfHandler, 1);

    if (!this._listeners[eventName].length) {
      delete this._listeners[eventName];
    }
  }

  /**
   * @param {string} eventName
   * @param {Function} handler
   * @public
   */
  once(eventName, handler) {
    const onceHandler = (...argsForHandler) => {
      handler(...argsForHandler);

      this.off(eventName, onceHandler);
    };

    this.on(eventName, onceHandler);
  }

  /**
   * @public
   */
  offAll() {
    Object.entries(this._listeners).forEach(([eventName, handlers]) => {
      handlers.forEach((handler) => {
        this.off(eventName, handler);
      });
    });
  }

  /**
   * @param {string} eventName
   * @param {*} argsForHandler
   * @public
   */
  fireEvent(eventName, ...argsForHandler) {
    if (eventName !== EventDispatcher.EVENT_ANY) {
      this.fireEvent(EventDispatcher.EVENT_ANY, eventName, ...argsForHandler);
    }

    if (!Object.keys(this._listeners).includes(eventName)) {
      return;
    }

    this._listeners[eventName].forEach((handler) => {
      handler(eventName, ...argsForHandler);
    });
  }
}

export default EventDispatcher;
