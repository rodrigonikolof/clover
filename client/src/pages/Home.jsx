import React, {useState, useEffect, useContext} from "react";
import { Context } from "../App";

export default function Home(){

const [user, setUser, token, setToken] = useContext(Context);



useEffect(()=>{
    fetch('/api/v1/clients',{
        method: 'GET',
        headers: {
            Authorization : `Bearer ${token}`
        }
    }).then(r => r.json()).then(data => console.log(data))
},[])

    return(
        <>
            <h1>Logged In</h1>
        </>
    )
}