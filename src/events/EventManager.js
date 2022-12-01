/**
 * EventManager provides a global control and access to all events available within the application
 */
class EventManager {
    constructor() {
        this._events = [];
        this._pendingEvents = [];
        this._queueListener = null;
        this.randomNumber = Math.random();
    }

    /** 
     * Register a new event that will enable behavior within the page.
     * @param {string} name Defines the name of the event
     * @param {string} description Describes the event that will fire
     * @param {string} params List of parameters that are included when the event is fired
     */
    Register(name, description, params = "") {
        console.log(`Registering event, ${name}. ${description}`);
        this._events[name] = {
            name: name,
            description: description,
            params: params,
            isDeleted: false
        };
    }

    /**
     * Verifies events exist in the page.
     * @access private
     * @param {*} name The name of the event to verify
     * @returns True if found, exception is thrown otherwise.
     */
    _doesEventExist(name) {
        if (!this._events[name]) {
            console.log(`The event ${name} is raised, but noone is listening.`);
            return false;
        }
        if (this._events[name].isDeleted) {
            throw new Error(`The event, ${name}, has been removed.`)
        }

        return true;
    }


    _queueEvent(name, event) {
        this._pendingEvents.push(
            {
                name: name,
                event: event
            });
        if (!this._queueListener) {
            this._queueListener = setTimeout(this._checkQueue.bind(this), 100);
        }
    }

    _checkQueue() {
        if (this._pendingEvents.length > 0) {
            let queuedEvent = null;
            var queuedEvents = this._pendingEvents.slice();
            var requeueEvents = [];
            while ((queuedEvent = queuedEvents.pop()) != null) {
                if (this._doesEventExist(queuedEvent.name)) {
                    console.log(`Event ${queuedEvent.name} was found, firing now.`)
                    window.dispatchEvent(queuedEvent.event);
                    continue;
                }
                requeueEvents.push(queuedEvent);
            }
            this._pendingEvents = requeueEvents;
        }
    }

    /**
     * Register a listener to an event by the name.  If the name does not exist, an
     * exception will be thrown to indicate the event does not exist.
     * @param {string} name The name of the event to register a listener
     * @param {function} callback The function to call when the event is fired
     * @param {object} scope The scope the event should be bound to to ensure proper context when executing the event.
     */
    Listen(name, callback, scope = window) {
        console.log('Listening for event', name);
        window.addEventListener(name, callback.bind(scope));
    }

    ShowAllEvents() {
        console.dir(this._events);
    }

    /**
     * Remove an event from the possible events that can be fired.
     * @param {string} name The name of the event to remove
     */
    Remove(name) {
        if (this._doesEventExist(name)) {
            this._events[name].isDeleted = true;
            window.removeEventListener(name, null);
        }
    }

    /**
     * Raises the event to alert all listeners the event has happened.
     * @param {string} name The name of the event to fire
     * @param {string} parameters Data related to the event that listener may act on
     */
    Raise(name, parameters = null) {
        let event = new Event(name);
        if (parameters) {
            event = new CustomEvent(name, { detail: { data: parameters } });
        }

        if (!this._doesEventExist(name)) {
            console.log(`Event ${name} raised with no listeners, queueing.`);
            this._queueEvent(name, event);
            return;
        }

        console.log(`Raising event, ${name}.`);
        window.dispatchEvent(event);
    }
}
let Events = new EventManager();
export default Events;