import React, { useEffect, useState, useContext } from "react";
import { Context } from "../App";
import { Button, Typography, Box } from "@mui/material";
import SingleGoal from "./SingleGoal";

export default function Goals({client_id}){

    const [user, setUser, token, setToken] = useContext(Context);
    const [goals, setGoals] = useState(null)

    useEffect(()=>{
        fetch(`/api/v1/goals/${client_id}`,{
            method: 'GET',
            headers: {Authorization : `Bearer ${token}`}
        }).then(r => r.json()).then(data => setGoals(data))
    },[])

console.log(goals)

    return(
        <>
            <Box sx={{display:'block', minWidth:1}}>
                {goals? 
                    goals.map((goal)=>{
                    return   (
                        <SingleGoal goal={goal}/>
                    )
                    })    
                    :
                    null
                }
            </Box>
        </>
    )
}