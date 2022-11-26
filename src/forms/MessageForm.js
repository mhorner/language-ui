// import '../index.css';
import React from 'react';
import { Button, DialogContentText, TextField } from '@mui/material';
import { Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material';

export default function MessageForm() {
    const [open, setOpen] = React.useState(false);
    const [messageKey, setMessageKey] = React.useState('');
    const [messageValue, setMessageValue] = React.useState('');
    const [messageCulture, setMessageCulture] = React.useState('');

    const updateKey = (e) => {
        setMessageKey(e.target.value);
    }
    const updateValue = (e) => {
        setMessageValue(e.target.value);
    }
    const updateCulture = (e) => {
        setMessageCulture(e.target.value);
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const save = () => {
        console.log('saving...');
        document.dispatchEvent(new CustomEvent('SaveNewMessage', {detail: {
            key: messageKey,
            value: messageValue,
            culture: messageCulture
        }}));
    }

    document.addEventListener('ShowMessageForm', handleClickOpen);
    document.addEventListener('SavedNewMessage', handleClose);

    // sx={{ minWidth: 275, maxWidth: 354, position: 'absolute', zIndex: 1 }}>
    return (
        <div>
                <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add a new message</DialogTitle>
                <DialogContentText>Adding new messages to the catalog, enhances the application experience with possibility of
                    adding a translation to help all users use the application.
                </DialogContentText>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField id="messageKey" variant="standard" label="Key" required={true} value={messageKey} onChange={updateKey} />
                    <TextField id="messageValue" variant="standard" label="Value" required={true}  value={messageValue} onChange={updateValue} />
                    <TextField id="messageCulture" variant="standard" label="Culture" required={true}  value={messageCulture} onChange={updateCulture} />
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={save}>Save</Button>
                    <Button variant='text' onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>);
}