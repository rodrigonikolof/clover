import React from "react";
import { Box, Typography, Button, Grid, Paper, Tooltip, IconButton } from "@mui/material";
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';


export default function InterventionCard({intervention}){
    
    return(
    <>
        <Paper sx={{textAlign: 'center', lineHeight: '10px'}}>
            <Box sx={{display: 'flex'}}>
                <Box sx={{flexGrow: 1}}>
                    <Typography sx={{mt:1}}>{intervention.intervention_name}</Typography>
                </Box>
                <Box>
                    <Tooltip title="Edit">
                        <IconButton>
                            <EditNoteIcon sx={{mr:1}}/>
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