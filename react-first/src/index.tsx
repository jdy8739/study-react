import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';

const lightMode = {
  textColor: '#111',
  bgColor: 'whitesmoke'
};

const blackMode = {
  textColor: 'whitesmoke',
  bgColor: '#111'
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={blackMode}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
