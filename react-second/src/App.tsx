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

const ThemeChangerBtn = styled.div`
  height: 40px;
  width: 100px;
  border-radius: 8px;
  background-color: ${ props => props.theme.bgColor };
  border: 1px solid ${ props => props.theme.boxColor };
  position: fixed;
  top: 100px; 
  right: 100px; 
  text-align: center;
  cursor: pointer;
  display: table;
  span {
    display: table-cell;
    vertical-align: middle;
  }
`;

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
            <ThemeChangerBtn onClick={ changeTheme }><span>mode change</span></ThemeChangerBtn>
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
