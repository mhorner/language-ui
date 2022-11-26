import React from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function AddAction(args) {
    const addCallback = args.addCallback || null;

    const add = function () {
        console.log("adding a new message?");
        if (typeof addCallback === 'function') {
            console.log('callback function starting...');
            addCallback.call();
            console.log('callback function finished.');
        }
    }

    const fabStyle = {
        position: 'absolute',
        bottom: 16,
        right: 16,
    };

    return (
        <Fab sx={fabStyle} color="primary" aria-label="add" onClick={add}>
            <AddIcon />
        </Fab>
    );
}

export default AddAction;