import * as React from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MessageController from '../controller/MessagesController';

class MessageTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gridHeight: '150px',
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
        currentState.rows = event.detail.rows;
        this.setState(currentState);
    }

    async componentDidMount() {
        MessageController.LoadAllMessages();
        window.addEventListener('AllMessagesLoaded', this.updateGrid.bind(this));
        window.addEventListener("resize", this.handleResize.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", null);
    }

    render() {
        return (
            <Box sx={{ margin: '20px 20px', height: this.calculateGridHeight(), width: 'calc(100% - 40px)' }}>
                <DataGrid rows={this.state.rows} columns={this.state.columns} disableSelectionOnClick experimentalFeatures={{ newEditingApi: true }} />
            </Box>
        );
    }
}

export default MessageTable;