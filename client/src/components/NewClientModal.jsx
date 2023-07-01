import React, { useContext} from "react";
import {Box, Modal, Button, Typography, TextField} from "@mui/material"
import { Context } from "../App";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

export default function NewClientModal({handleClose, open, handleSubmit, setNewClient, newClientError}){
    const [user, setUser, token, setToken] = useContext(Context);

    return(
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, maxWidth: 400 }}>
                <Typography variant="h6" component="h6">Create New Client</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField 
                        onChange={(e)=>{setNewClient(e.target.value)}}
                        sx={{height: 5, mt:1, mb:1}}   
                        fullWidth 
                        error={newClientError}
                        label="Name"
                        color="success"
                    />
                    <Button type="submit"
                            color="success"
                            variant="contained"
                            sx={{mt:6}}
                    >
                        Create
                    </Button>
                </form>
                
                
                </Box>
            </Modal>
        </>
    )

}