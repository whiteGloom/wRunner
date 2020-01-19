function makeEvent() {
  const handlers = [];

  function addHandler(handler) {
    if (typeof handler !== 'function') return false;

    for (let i = 0; i < handlers.length; i += 1) {
      if (handlers[i] === handler) {
        return false;
      }
    }

    handlers.push(handler);
    return true;
  }

  function removeHandler(handler) {
    for (let i = 0; i < handlers.length; i += 1) {
      if (handlers[i] === handler) {
        handlers.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  function trigger(data) {
    if (handlers.length < 1) return false;
    const handlersClone = handlers.slice(0);
    for (let i = 0; i < handlersClone.length; i += 1) {
      handlersClone[i](data);
    }
    return true;
  }

  return {
    addHandler,
    removeHandler,
    trigger,
  };
}

export default makeEvent;
