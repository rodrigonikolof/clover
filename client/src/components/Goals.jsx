import React, { useEffect, useState, useContext } from "react";
import { Context } from "../App";
import { Button, Typography, Box } from "@mui/material";
import SingleGoal from "./SingleGoal";
import AddIcon from '@mui/icons-material/Add';

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
        <Box sx={{width: 1, mt:5}}>
            <Box sx={{display: 'flex', minWidth: 1}}>
                <Box sx={{flexGrow: 1, justifyContent:'center', display:'flex'}}><Typography variant="h5" color='textSecondary'>Goals</Typography></Box>
                <Box>
                    <Button
                        color="primary"
                        variant="contained"
                        endIcon={<AddIcon/>}
                    >
                    New Goal
                    </Button>
                </Box>
            </Box>
            <Box sx={{display:'block', minWidth:1, mt:2}}>
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
        </Box>
    )
}