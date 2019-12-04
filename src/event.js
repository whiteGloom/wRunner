function makeEvent() {
  const handlers = [];

  function addHandler(handler) {
    if (typeof handler !== 'function') return;

    for (let i = 0; i < handlers.length; i += 1) {
      if (handlers[i] === handler) {
        return;
      }
    }

    handlers.push(handler);
  }

  function removeHandler(handler) {
    for (let i = 0; i < handlers.length; i += 1) {
      if (handlers[i] === handler) {
        handlers.splice(i, 1);
        return;
      }
    }
  }

  function trigger(data) {
    const handlersClone = handlers.slice(0);
    for (let i = 0; i < handlersClone.length; i += 1) {
      handlersClone[i](data);
    }
  }

  return {
    addHandler,
    removeHandler,
    trigger,
  };
}

export default makeEvent;
