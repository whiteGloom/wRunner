function makeEvent() {
  // List of a handlers that will process a event.
  const handlers = [];

  // Add a new handler.
  function addHandler(handler) {
    if (typeof handler !== 'function') return;

    for (let i = 0; i < handlers.length; i += 1) {
      if (handlers[i] === handler) {
        return;
      }
    }

    handlers.push(handler);
  }

  // Remove a handler.
  function removeHandler(handler) {
    for (let i = 0; i < handlers.length; i += 1) {
      if (handlers[i] === handler) {
        handlers.splice(i, 1);
        return;
      }
    }
  }

  // Trigger a event and notify handlers.
  function trigger(data) {
    const handlersClone = handlers.slice(0);
    for (let i = 0; i < handlersClone.length; i += 1) {
      handlersClone[i](data);
    }
  }

  // Methods of new event.
  return {
    addHandler,
    removeHandler,
    trigger,
  };
}

export default makeEvent;
