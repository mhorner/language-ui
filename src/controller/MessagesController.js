import IApiController from "./IApiController";

class MessagesController extends IApiController {
    constructor(props) {
        super(props);

        this.state = {
            rows: []
        };

        document.addEventListener('LoadAllMessages', this.GetAllMessages.bind(this));
        document.addEventListener('SaveNewMessage', this.SaveNewMessage.bind(this));
    }

    // LoadAllMessasges
    // Raises the event to load all messages from the Message API.
    LoadAllMessages() {
        document.dispatchEvent(new Event('LoadAllMessages'));
    }

    async GetAllMessages() {
        let json = await this.Get('https://localhost:7179/api/Messages?culture=en-US');

        const responseEvent = new CustomEvent('AllMessagesLoaded', { detail: { rows: json } });
        window.dispatchEvent(responseEvent);
    }

    async SaveNewMessage(event) {
        let detail = event.detail;
        let json = await this.Post(`https://localhost:7179/api/Message?` +
            `key=${encodeURIComponent(detail.key)}` +
            `&value=${encodeURIComponent(detail.value)}` +
            `&culture=${encodeURIComponent(detail.culture)}`, event.detail);

        const responseEvent = new CustomEvent('SavedNewMessage', {detail: {response: json}});
        document.dispatchEvent(responseEvent);
        this.LoadAllMessages();
    }
}
let MessageControllerInstance = new MessagesController();

export default MessageControllerInstance;