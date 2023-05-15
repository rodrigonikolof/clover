import React, {useState, useEffect} from "react";
import { Box, Typography, Button, Grid, Paper, Tooltip, IconButton, TextField } from "@mui/material";
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';


export default function InterventionCard({intervention}){
    const [showUpdate, setShowUpdate] = useState(false);
    const [interventionName, setInterventionName] = useState('');

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
        else
            console.log('it worked')

    }

    

    return(
    <>
    
        <Paper sx={{textAlign: 'center', lineHeight: '10px'}}>
            <Box sx={{display: 'flex'}}>
                <Box sx={{flexGrow: 1}}>
                {showUpdate ? 
                    <form onSubmit={handleSubmit}>
                        <TextField
                            onChange={(e)=>{setInterventionName(e.target.value)}}
                            defaultValue={interventionName}
                            sx={{maxHeight:-1}}
                        />
                        <Button
                        type="submit"
                        color="primary"
                        variant="contained"
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
                        <IconButton>
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box> 
            
            
            
        </Paper>
        

    </>
    )
}