import React, { useEffect, useState, useContext } from "react";
import { Context } from "../App";
import { Button } from "@mui/material";

export default function SingleGoal({client_id}){

    const [user, setUser, token, setToken] = useContext(Context);
    const [goals, setGoals] = useState(null)

    useEffect(()=>{
        fetch(`/api/v1/goals/${client_id}`,{
            method: 'GET',
            headers: {Authorization : `Bearer ${token}`}
        }).then(r => r.json()).then(data => console.log(data))
    },[])

    return(
        <>
        
        
        </>
    )
}