import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'; 
import Header from './components/Header';
import Home from './components/Home';
import Search from './components/Search';
import Tv from './components/Tv';

function App() {
  return (
    <div className="App">
      < BrowserRouter>
        <Header />
        <Routes>
          <Route path="/search" element={ <Search /> } />
          <Route path="/tv" element={ <Tv /> } />
          <Route path="/*" element={ <Home /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
