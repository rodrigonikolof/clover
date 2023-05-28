import React, { useEffect, useState, useContext } from "react";
import { Context } from "../App";
import { Button, Typography, Box } from "@mui/material";
import SingleGoal from "./SingleGoal";
import AddIcon from '@mui/icons-material/Add';

export default function Goals({client_id}){

    const [user, setUser, token, setToken] = useContext(Context);
    const [goals, setGoals] = useState(null)
    const [newGoalName, setNewGoalName] = useState('New Goal')

    useEffect(()=>{
        fetch(`/api/v1/goals/${client_id}`,{
            method: 'GET',
            headers: {Authorization : `Bearer ${token}`}
        }).then(r => r.json()).then(data => setGoals(data))
    },[])

    const handleSubmit = (e)=>{
        e.preventDefault()
        fetch('/api/v1/goals', {
            method: "POST",
            headers: {"Content-Type" : "application/json", Authorization: `Bearer ${token}`},
            body: JSON.stringify({
                goal_name : newGoalName,
                client_id : client_id
            })
        }).then(r => {
            if (r.ok){
                r.json().then(data => setGoals([...goals,data]))
            }
        })
    }

console.log(goals)

    return(
        <Box sx={{width: 1, mt:5, mb:6}}>
            <Box sx={{display: 'flex', minWidth: 1}}>
                <Box sx={{flexGrow: 1, justifyContent:'center', display:'flex'}}><Typography variant="h5" color='textSecondary'>Goals</Typography></Box>
                <Box>
                    <Button
                        color="primary"
                        variant="contained"
                        endIcon={<AddIcon/>}
                        onClick={handleSubmit}
                    >
                    New Goal
                    </Button>
                </Box>
            </Box>
            <Box sx={{display:'block', minWidth:1, mt:2}}>
                {goals? 
                    goals.map((goal)=>{
                    return   (
                        <SingleGoal key={goal.id} goal={goal}/>
                    )
                    })    
                    :
                    null
                }
            </Box>
        </Box>
    )
}