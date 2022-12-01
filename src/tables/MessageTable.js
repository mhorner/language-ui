import * as React from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MessageController from '../controller/MessagesController';
import Events from "../events/EventManager";

class MessageTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gridHeight: this.calculateGridHeight(),
            rows: [],
            columns: [
                { field: 'id', headerName: 'ID', flex: 1 },
                { field: 'key', headerName: 'Key', flex: 1 },
                { field: 'value', headerName: 'Value', flex: 2 },
                { field: 'culture', headerName: 'Culture', flex: 0.5 }
            ]
        };
    }
    calculateGridHeight() { return window.innerHeight - 150 + 'px'; }

    handleResize() {
        this.setState({
            gridHeight: this.calculateGridHeight()
        });
    }

    updateGrid(event) {
        var currentState = this.state.rows.slice();
        currentState.rows = event.detail.data;
        this.setState(currentState);
    }

    async componentDidMount() {
        MessageController.LoadAllMessages();
        Events.Listen('AllMessagesLoaded', this.updateGrid, this);
        Events.Listen('resize', this.handleResize, this);
    }

    render() {
        return (
            <Box sx={{ margin: '20px 20px', height: this.state.gridHeight, width: 'calc(100% - 40px)' }}>
                <DataGrid rows={this.state.rows} columns={this.state.columns} disableSelectionOnClick experimentalFeatures={{ newEditingApi: true }} />
            </Box>
        );
    }
}

export default MessageTable;