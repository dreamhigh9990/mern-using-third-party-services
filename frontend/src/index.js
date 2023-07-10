import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'emotion-theming';

import App from './App';
import configureStore from './redux/store';
import history from './utils/history';
import theme from './styles/theme';
import './styles/main.css';

const store = configureStore();

const Main = () => (
  <Provider store={store}>
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  </Provider>
);

ReactDOM.render(<Main />, document.getElementById('root'));
