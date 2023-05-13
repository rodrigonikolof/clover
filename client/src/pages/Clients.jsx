import React, {useState, useEffect, useContext} from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../App";
import { Box, Typography, Button, Grid, Paper } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import NewClientModal from "../components/NewClientModal";

export default function Clients(){
    const [user, setUser, token, setToken] = useContext(Context);
    const [clients, setClients] = useState([])
    const [open, setOpen] = useState(false);
    const [newClient, setNewClient] = useState('')
    const [newClientError, setNewClientError] = useState(false)
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    useEffect(()=>{ 
       fetch('/api/v1/clients',{
            method: 'GET',
            headers: {
                Authorization : `Bearer ${token}`
            }
        }).then(r => r.json()).then(data => setClients(data))
        
    },[])
   
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
                        r.json().then(data => setClients([...clients, data]))
                        .then(()=>setOpen(false))
                    }
              })
        }
    }
    console.log(clients)

return(
    <>
        <Box
        sx={{display: 'flex', justifyContent: 'center', mt: 3}}
        >
            <Typography
                    variant="h5" 
                    component="h2" 
                    color="textSecondary"
                    gutterBottom
                >
                    Clients
                </Typography>
        </Box>

        <Box sx={{display:'flex', justifyContent: 'center', mt:3}}>

            <Box sx={{width: 200, display: { xs: 'none', md: 'flex'}, background: 'red', display:'flex', justifyContent: 'center' }}>
                1
            </Box>

            <Box sx={{display:'flex', justifyContent: 'center', mr:6, ml:6, flexGrow: 3}}>
                <Grid container spacing={3}>
                    {clients ? 
                            clients.map((client)=>{
                            return(
                                    <Grid item xs={12} md={4} key={client.id}>
                                        <Paper
                                            sx={{textAlign: 'center', height: 40, lineHeight: '33px',cursor: 'pointer'}} 
                                            onClick={()=>console.log(client.id)}
                                        >
                                            {client.client_name}
                                        </Paper>
                                    </Grid>
                            )     
                            }): null
                        }
                </Grid>
            </Box>

            <Box sx={{ background:'blue', display:'flex', justifyContent: 'center', width: 200, height: 40}}>
                <Button
                    color="primary"
                    variant="contained"
                    endIcon={<AddIcon/>}
                    onClick={handleOpen}
                    >
                    New Client
                </Button>
            </Box>

        </Box>
        
        <NewClientModal 
            handleClose={handleClose} 
            open={open}
            handleSubmit={handleSubmit}
            setNewClient={setNewClient}
            newClientError={newClientError}
            />
    </>
)

}