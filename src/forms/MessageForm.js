// import '../index.css';
import React from 'react';
import { Button, DialogContentText, TextField } from '@mui/material';
import { Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material';
import Events from '../events/EventManager';

class MessageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            messageKey: '',
            messageValue: '',
            messageCulture: ''
        };
    }

    updateKey(e) {
        this.setState({messageKey: e.target.value});
    }
    updateValue(e) {
        this.setState({messageValue: e.target.value});
    }
    updateCulture(e) {
        this.setState({messageCulture: e.target.value});
    }
    handleClickOpen() {
        this.setState({open: true});
    };

    handleClose() {
        this.setState({open: false});
    };

    save() {
        console.log('saving...');
        Events.Raise('SaveNewMessage', {
            key: this.state.messageKey,
            value: this.state.messageValue,
            culture: this.state.messageCulture
        });
    }

    componentDidMount() {
        Events.Listen('ShowMessageForm', this.handleClickOpen, this);
        Events.Listen('SavedNewMessageSuccessful', this.handleClose, this);
    }

    render() {
        const save = this.save.bind(this);
        const handleClose = this.handleClose.bind(this);
        const updateKey = this.updateKey.bind(this);
        const updateValue = this.updateValue.bind(this);
        const updateCulture = this.updateCulture.bind(this);

        return (
            <div>
                <Dialog open={this.state.open} onClose={handleClose}>
                    <DialogTitle>Add a new message</DialogTitle>
                    <DialogContentText>Adding new messages to the catalog, enhances the application experience with possibility of
                        adding a translation to help all users use the application.
                    </DialogContentText>
                    <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
                        <TextField id="messageKey" variant="standard" label="Key" required={true} value={this.state.messageKey} onChange={updateKey} />
                        <TextField id="messageValue" variant="standard" label="Value" required={true} value={this.state.messageValue} onChange={updateValue} />
                        <TextField id="messageCulture" variant="standard" label="Culture" required={true} value={this.state.messageCulture} onChange={updateCulture} />
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained' onClick={save}>Save</Button>
                        <Button variant='text' onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div >);
    }

}

export default MessageForm;