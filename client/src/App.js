import React, {createContext, useState, useEffect} from 'react';
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

useEffect(()=>{
  const savedToken = localStorage.getItem("clover-jwt")
  setToken(savedToken)
  console.log('useEffect ran')
  if (token){
    fetch('/api/v1/profile', {
      method: "GET",
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(r => r.json())
    .then(data => setUser(data))
  }

},[])

// useEffect(()=>{
//   fetch('/profile', {
//     method: "GET",
//     headers: {Authorization: `Bearer ${token}`}
//   })
//   .then(r => r.json())
//   .then(data => setUser(data))
// },[])

  if (!user) return <Context.Provider value={[user, setUser,token, setToken ]}><Login/></Context.Provider>

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
