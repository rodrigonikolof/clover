import React, {useState, useEffect, useContext} from "react";
import { Typography, Accordion, AccordionSummary, AccordionDetails, Box, IconButton, Tooltip, TextField, Button } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Context } from "../App";
import InterventionSelect from "./InterventionSelect";
import InterventionInGoal from "./InterventionInGoal";

export default function SingleGoal({goal, interventions, setInterventions}){

    const [user, setUser, token, setToken] = useContext(Context);
    const [showUpdate, setShowUpdate] = useState(false)
    const [goalName, setGoalName] = useState(goal.goal_name)
    const [goalInterventions, setGoalInterventions] = useState(null)


    const toggleShowUpdate = ()=>{
        setShowUpdate(!showUpdate)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        if (goalName === goal.goal_name || goalName === ""){
            toggleShowUpdate()
        }
        else{
            fetch(`/api/v1/goals/${goal.id}`,{
                method: 'PATCH',
                headers: {"Content-Type" : "application/json", Authorization: `Bearer ${token}`},
                body: JSON.stringify({
                    goal_name : goalName, 
                })
            })
            toggleShowUpdate()
        }

    }

    useEffect(()=>{
        fetch(`/api/v1/goal_intervention/${goal.id}`,{
            method: 'GET',
            headers: {
                Authorization : `Bearer ${token}`
            }
        }).then(r => r.json()).then(data => setGoalInterventions(data))
    },[])

   

    return(
        <>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                    
                    <Box sx={{flexGrow: 1}}>
                        {showUpdate? 
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    onChange={(e)=>{setGoalName(e.target.value)}}
                                    defaultValue={goalName}
                                    sx={{maxHeight:-1, mr: 1, width: 8/10}}
                                    variant="standard"
                                />
                                <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                                sx={{mt:0.1}}
                                > Save </Button>
                            </form>
                            : 
                            <Typography variant="h6" color='textSecondary'>{goalName}</Typography>} 
                    </Box>
                    <Tooltip title="Edit">
                        <IconButton onClick={toggleShowUpdate}><EditNoteIcon sx={{mr: 2, ml: 2}}/></IconButton>
                    </Tooltip>
                </AccordionSummary>
                <Box>
                   
                   <InterventionSelect 
                        interventions={interventions} 
                        setInterventions={setInterventions} 
                        goal={goal} 
                        setGoalInterventions={setGoalInterventions}
                        goalInterventions={goalInterventions}
                    />
                </Box>
                {goalInterventions? 
                    goalInterventions.map((goalIntervention)=>{
                       return (
                        <InterventionInGoal 
                            key={goalIntervention.intervention.id} 
                            goalIntervention={goalIntervention}
                        />
                       )
                    })
                    
                    
                    : null}
                
               
            </Accordion>

            
        </>
    )

}