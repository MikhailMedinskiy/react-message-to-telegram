import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './base/store/configureStore';
import './base/firebase/firebase';
import App from './components/App/App'
import { startSetExpenses } from './actions/postListActions'

const store = configureStore();

const jsx = (
    <Provider store={store}>
      <App />
    </Provider>
  );

ReactDOM.render(jsx, document.getElementById('root'));

store.dispatch(startSetExpenses()).then(() => {
  ReactDOM.render(jsx, document.getElementById('root'));
});
