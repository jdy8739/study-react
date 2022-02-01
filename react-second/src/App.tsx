import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Coin from './routes/Coin';
import Coins from './routes/Coins';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import { GlobalStyle } from './GlobalStyles';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isDarkAtom } from './atoms';

function App() {

  const darkMode = useRecoilValue(isDarkAtom);
  const modeChanger = useSetRecoilState(isDarkAtom);

  const changeTheme = () => {
    modeChanger(mode => !mode);
  };

  return (
    <div className="App">
      <ThemeProvider theme={ !darkMode ? darkTheme : lightTheme }>
        <GlobalStyle />
          <BrowserRouter>
            <button onClick={ changeTheme } >mode change</button>
            <Switch>
              <Route path='/detail/:id'>
                <Coins />
              </Route>
              <Route path='/'>
                <Coin />
              </Route>
            </Switch>
          </BrowserRouter>
        <ReactQueryDevtools />
      </ThemeProvider>
    </div>
  );
}

export default App;
