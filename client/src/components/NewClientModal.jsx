import React, {useState, useContext} from "react";
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

export default function NewClientModal({handleClose, handleOpen, open}){
    const [user, setUser, token, setToken] = useContext(Context);
    const [newClient, setNewClient] = useState('')
    const [newClientError, setNewClientError] = useState(false)


    function handleSubmit(e){
        e.preventDefault()
        newClient? setNewClientError(false) : setNewClientError(true)
        if(newClient){
            fetch('/api/v1/clients', {
                method: "POST",
                headers: {"Content-Type" : "application/json", Authorization: `Bearer ${token}`},
                body: JSON.stringify({
                    client_name: newClient,
                    user_id : user.user.id
                })
              }).then((r)=>{
                    if(r.ok){
                        r.json().then(data => console.log(data))
                    }
              })
        }
    }

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
            />
            <Button type="submit"
                    color="primary"
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