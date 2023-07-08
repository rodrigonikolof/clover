import React,{useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../App";
import {Box, Modal, Button, Typography, TextField} from "@mui/material"

export default function ConfirmDeleteClientModal({handleClose, open, clientName}){
    const [user, setUser, token, setToken] = useContext(Context);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'beige',
        // border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
      };

return(
    <>
        <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, maxWidth: 400}}>

                    <Box sx={{display:'flex', justifyContent:'center'}}> 
                        <Typography variant="h6" component="h6">This will delete {clientName} and all their data: </Typography>
                    </Box>
                    <Box sx={{display:'flex', justifyContent:'space-between' }}>
                        <Button
                            type="submit"
                            color="error"
                            variant="contained"
                            sx={{mt:6}}
                        >
                            Confirm Delete
                        </Button>
                        <Button
                            type="submit"
                            color="success"
                            variant="contained"
                            sx={{mt:6}}
                        >
                            Keep Client
                        </Button>
                    </Box>
                
                </Box>
            </Modal>
    
    </>
)
}