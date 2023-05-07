import React, {createContext, useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Navbar from './components/Navbar';

export const Context = React.createContext();

function App() {

const [user, setUser] = useState(null);
const [token, setToken] = useState(null);

  if (!user) return <Context.Provider value={[user, setUser,token, setToken ]}><Login/></Context.Provider>

  return (
  <>
    <Navbar/>
    <Context.Provider value={[user, setUser,token, setToken ]}>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </Context.Provider>
  </>
  );
}

export default App;
