import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App/app';
import { SocketContext, socket } from "./context/socket"
import {Provider} from 'react-redux';
import store from './store/index.js'

ReactDOM.render(
  <Provider store={store}>
    <SocketContext.Provider value={socket}>
      <App />
    </SocketContext.Provider>
  </Provider>,
  document.getElementById('tetris')
);