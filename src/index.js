import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './events/Events'
import MessageForm from './forms/MessageForm';
import MessageTable from './tables/MessageTable';
import AddAction from './actions/AddAction';
import { Button } from '@mui/material';
import MessageController from './controller/MessagesController';
import Events from './events/EventManager';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MessageForm name="matt"/>
    <Button variant='contained' onClick={MessageController.LoadAllMessages}>Refresh</Button>
    <MessageTable />
    <AddAction addCallback={() => {Events.Raise('ShowMessageForm');}} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
