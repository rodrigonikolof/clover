import React, {useState, useEffect, useContext} from "react";
import { Context } from "../App";
import { Box, Typography, Button, Grid, Paper } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export default function Clients(){
    const [user, setUser, token, setToken] = useContext(Context);
    const [clients, setClients] = useState([])

    useEffect(()=>{
        
       fetch('/api/v1/clients',{
            method: 'GET',
            headers: {
                Authorization : `Bearer ${token}`
            }
        }).then(r => r.json()).then(data => setClients(data))
        
    },[])
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
            <Box sx={{flexGrow: 1, display: { xs: 'none', md: 'flex'} }}>
                {/* <Grid container spacing={3}>
                    {clients.map((client)=>{
                       return(
                            <Grid item xs={12} md={6} key={client.id}>
                                <Paper>{client.client_name}</Paper>
                            </Grid>
                       )     
                    })}
                </Grid> */}
            </Box>
            <Box sx={{mr:1}}>
                <Button
                    color="primary"
                    variant="contained"
                    endIcon={<AddIcon/>}
                    >
                    New Client
                </Button>
            </Box>
        </Box>
        <Box sx={{display:'flex', justifyContent: 'center', mt:3, mr:6, ml:6}}>
        <Grid container spacing={3}>
                    {clients.map((client)=>{
                       return(
                            <Grid item xs={12} md={6} key={client.id}>
                                <Paper>{client.client_name}</Paper>
                            </Grid>
                       )     
                    })}
                </Grid>
        </Box>
        
    </>
)

}