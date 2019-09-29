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

export default makeEvent