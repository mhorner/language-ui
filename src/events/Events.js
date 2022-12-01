import Events from "./EventManager";

function RegisterEvents(events) {
    events.forEach((event) => {
        console.log(`registering ${event.name}`);
        Events.Register(event.name, event.description);
    });
}

(function () {
    // Message Controller Events.
    var messageControllerEvents = [{
        name: 'LoadAllMessages',
        description: 'Initiate request to load all messages.'
    }, {
        name: 'AllMessagesLoaded',
        description: 'Informs all observers that the messages have been loaded.'
    },{
        name: 'SaveNewMessage',
        description: 'Handles event to save the new message data create and update events.'
    }];

    var formEvents = [{
        name: 'SavedNewMessageSuccessful',
        description: 'Informs observers a new message was successfully saved.'
    }, {
        name: 'SaveNewMessage',
        description: 'Triggers save of new message.'
    }, {
        name: 'ShowMessageForm',
        description: 'Informs the UI to open the message form.'
    }];

    RegisterEvents(messageControllerEvents);
    RegisterEvents(formEvents);
})();