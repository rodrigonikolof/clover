import React, {useState, useContext} from "react";
import { AccordionDetails, Box, Typography, Tooltip, IconButton, Popover, Button } from "@mui/material";
import { Context } from "../App";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


export default function InterventionInGoal({goalIntervention, goalInterventions, handleDelete}){

    const [user, setUser, token, setToken] = useContext(Context);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [completed, setCompleted] = useState(goalIntervention.completed)


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
    const handleClose = () => {
    setAnchorEl(null);
    };
    
    const open = Boolean(anchorEl);
    const popoverID = open ? 'simple-popover' : undefined;

    const updateStatus =()=>{
        fetch(`/api/v1/goal_intervention/${goalIntervention.id}`,{
            method: 'PATCH',
            headers: {"Content-Type" : "application/json", Authorization: `Bearer ${token}`},
            body: JSON.stringify({
                completed : !completed, 
            })
        }) 
        setCompleted(!completed);
    }

return(
<>

    <AccordionDetails>

        <Box display='flex' sx={{mr: 0, ml: 1}}>

            <Box sx={{flexGrow:1, mt: 1}}> 
                <Typography variant="h6" color="textSecondary"> 
                   - {goalIntervention.intervention.intervention_name} 
                </Typography> 
            
            </Box>

            <Box>
                <Tooltip title="Toggle 'Completed'">
                    <IconButton onClick={updateStatus}>
                        {completed? 
                            <CheckCircleOutlineIcon sx={{color:'green'}} />
                            :
                            <CheckCircleOutlineIcon sx={{color:'lightgrey'}} />
                        }
                    </IconButton>
                </Tooltip>
            </Box>

            <Box>
                <Tooltip title="Delete"> 
                    <IconButton onClick={handleClick} aria-describedby={popoverID}>   
                        <DeleteIcon/>
                    </IconButton>
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
                            <Box sx={{flexWrap: 'wrap', justifyContent: 'center'}}>
                                <Box sx={{m:1}}>
                                    <Typography>Confirm Delete? </Typography>
                                    <Button
                                    variant="contained"
                                    sx={{mt:0.2, ml: 1.2}}
                                    color="error"
                                    onClick={()=>handleDelete(goalIntervention.id)}
                                    >
                                        Delete
                                    </Button>
                                </Box>
                            </Box>
                    </Popover>
            </Box>

        </Box>
    </AccordionDetails>


</>
)
}