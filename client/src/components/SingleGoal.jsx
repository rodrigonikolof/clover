import React, {useState, useEffect, useContext} from "react";
import { Typography, Accordion, AccordionSummary, Box, IconButton, Tooltip, TextField, Button, Popover } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import { Context } from "../App";
import InterventionSelect from "./InterventionSelect";
import InterventionInGoal from "./InterventionInGoal";

export default function SingleGoal({goal, interventions, setInterventions, setGoals, goals}){

    const [user, setUser, token, setToken] = useContext(Context);
    const [showUpdate, setShowUpdate] = useState(false)
    const [goalName, setGoalName] = useState(goal.goal_name)
    const [goalInterventions, setGoalInterventions] = useState(null)
    const [anchorEl, setAnchorEl] = React.useState(null);


    const toggleShowUpdate = ()=>{
        setShowUpdate(!showUpdate)
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
    const handleClose = () => {
    setAnchorEl(null);
    };
    
    const open = Boolean(anchorEl);
    const popoverID = open ? 'simple-popover' : undefined;

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

   const handleDelete = (id)=>{
    fetch(`/api/v1/goal_intervention/${id}`,{
        method: 'DELETE',
        headers: {Authorization : `Bearer ${token}`}
    })
    setGoalInterventions(goalInterventions.filter(gi => gi.id != id))
   }

   const handleDeleteGoal = (id)=>{
    fetch(`/api/v1/goals/${id}`,{
        method: 'DELETE',
        headers: {Authorization : `Bearer ${token}`}
    })
    setGoals(goals.filter(goal => goal.id != id))
   }


    return(
        <>
            <Accordion sx={{backgroundColor:'rgb(226, 226, 201)'}}>
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
                                sx={{mt:0.1, backgroundColor:'green'}}
                                > Save </Button>
                            </form>
                            : 
                            <Typography variant="h6" color='textSecondary'>{goalName}</Typography>} 
                    </Box>
                    <Tooltip title="Edit">
                        <IconButton onClick={toggleShowUpdate}><EditNoteIcon/></IconButton>
                    </Tooltip>
                    <Tooltip title='Delete Goal'>
                        <IconButton onClick={handleClick} aria-describedby={popoverID}><DeleteIcon/></IconButton>
                    </Tooltip>
                    <Popover
                        id={popoverID}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                        >
                            <Box sx={{flexWrap: 'wrap', justifyContent: 'center', maxWidth:150}}>
                                <Box sx={{m:1}}>
                                    <Typography>Delete this goal? </Typography>
                                    <Button
                                    variant="contained"
                                    sx={{mt:0.5, ml: 1.2}}
                                    color="error"
                                    onClick={()=>{handleDeleteGoal(goal.id)}}
                                    >
                                        Delete
                                    </Button>
                                </Box>
                            </Box>
                    </Popover>
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
                            handleDelete={handleDelete}
                        />
                       )
                    })
                    
                    
                    : null}
                
               
            </Accordion>

            
        </>
    )

}