import React, {useState, useEffect, useContext} from "react";
import { Context } from "../App";
import { Box, Typography, Button, Grid, Paper, Tooltip, IconButton, TextField, Popover } from "@mui/material";
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';


export default function InterventionCard({intervention, handleDelete}){
    const [showUpdate, setShowUpdate] = useState(false);
    const [interventionName, setInterventionName] = useState('');
    const [user, setUser, token, setToken] = useContext(Context);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setShowUpdate(false)
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
    
      const open = Boolean(anchorEl);
      const popoverID = open ? 'simple-popover' : undefined;

    useEffect(()=>{
        setInterventionName(intervention.intervention_name)
    },[])
    
    const toggleShowUpdate = ()=>{
        setShowUpdate(!showUpdate)
    }
    
    const handleSubmit = (e)=>{
        e.preventDefault()
        if (interventionName === intervention.intervention_name || interventionName === "")
            toggleShowUpdate()
        else{
        fetch(`/api/v1/interventions/${intervention.id}`,{
            method: 'PATCH',
            headers: {"Content-Type" : "application/json", Authorization: `Bearer ${token}`},
            body: JSON.stringify({
                intervention_name : interventionName, 
            })
        })
        toggleShowUpdate()}
    }

    



    return(
    <>
    
        <Paper sx={{textAlign: 'center', lineHeight: '10px', maxWidth: 1, minWidth:{xs:12, md:12} }}>
            <Box sx={{display: 'flex'}}>
                <Box sx={{flexGrow: 1}}>
                {showUpdate ? 
                    <form onSubmit={handleSubmit}>
                        
                        <TextField
                            onChange={(e)=>{setInterventionName(e.target.value)}}
                            defaultValue={interventionName}
                            sx={{maxHeight:-1, mr: 1, width: 8/10}}
                            
                            variant="standard"
                        />
                        <Button
                        type="submit"
                        color="success"
                        variant="contained"
                        sx={{mt:0.1, backgroundColor: 'green'}}
                        >
                            Save
                        </Button>
                    </form> 
                    : 
                    <Typography sx={{mt:1}}>{interventionName}</Typography>}
                </Box>
                <Box>
                    <Tooltip title="Edit">
                        <IconButton onClick={toggleShowUpdate}>
                            <EditNoteIcon sx={{mr:1}} />
                        </IconButton>
                    </Tooltip>
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
                                        onClick={()=>handleDelete(intervention.id)}
                                        >
                                            Delete
                                        </Button>
                                    </Box>
                                </Box>
                            </Popover>
                </Box>
            </Box> 
        </Paper>
        

    </>
    )
}