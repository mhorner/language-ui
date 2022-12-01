import IApiController from "./IApiController";
import Events from "../events/EventManager";

class MessagesController extends IApiController {
    constructor(props) {
        super(props);

        this.state = {
            rows: []
        };


        Events.Listen('LoadAllMessages', this.GetAllMessages.bind(this));
        Events.Listen('SaveNewMessage', this.SaveNewMessage.bind(this));
    }

    // LoadAllMessasges
    // Raises the event to load all messages from the Message API.
    LoadAllMessages() {
        Events.Raise('LoadAllMessages');
    }

    async GetAllMessages() {
        let json = await this.Get('https://localhost:7179/api/Messages?culture=en-US');

        Events.Raise('AllMessagesLoaded', json);
    }

    async SaveNewMessage(event) {
        let detail = event.detail;
        let json = await this.Post(`https://localhost:7179/api/Message?` +
            `key=${encodeURIComponent(detail.data.key)}` +
            `&value=${encodeURIComponent(detail.data.value)}` +
            `&culture=${encodeURIComponent(detail.data.culture)}`, event.detail);

        Events.Raise('SavedNewMessageSuccessful', json);
        this.LoadAllMessages();
    }
}
let MessageControllerInstance = new MessagesController();

export default MessageControllerInstance;