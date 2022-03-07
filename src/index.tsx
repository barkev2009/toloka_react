import React from 'react';
import {render} from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';
import { rootReducer } from './redux/rootReducer';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import {composeWithDevTools} from 'redux-devtools-extension'

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(
    thunk
  )
));

const app = (
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

render(app, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
