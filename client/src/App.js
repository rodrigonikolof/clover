import React, {createContext, useState, useEffect, useRef} from 'react';
import {Routes, Route} from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Interventions from './pages/Interventions';
import Clients from './pages/Clients';
import Modalities from './pages/Modalities';


export const Context = React.createContext();

function App() {

const [user, setUser] = useState(null);
const [token, setToken] = useState(null);
const count = useRef(0)

if (!token && count.current < 3){
  const savedToken = localStorage.getItem("clover-jwt")
  setToken(savedToken);
  count.current = count.current + 1;
  console.log(`looked for token ${count.current} times`)
}

useEffect(()=>{ 
  if (token){
    
    fetch('/api/v1/profile', {
      method: "GET",
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(r => r.json())
    .then(data => setUser(data))
    .then((data)=>console.log("found ", data))
    // .then(()=>count.current = count.current + 1)
    .then(()=>console.log(`use effect fired ${count.current} times`))
  }
}, [token])
console.log('this is the user ', user)


  if (!user || user === undefined) return <Context.Provider value={[user, setUser,token, setToken ]}><Login/></Context.Provider>

  return (
  <>
    <Navbar/>
    <Context.Provider value={[user, setUser,token, setToken ]}>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/clients' element={<Clients/>}/>
        <Route path='/modalities' element={<Modalities/>}/>
        <Route path='/interventions' element={<Interventions/>}/>
      </Routes>
    </Context.Provider>
  </>
  );
}

export default App;
