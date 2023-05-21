import React, {useState, useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import { Context } from "../App";
import { Box, Typography, Button, TextField } from "@mui/material";

export default function SingleClient(){
    const [user, setUser, token, setToken] = useContext(Context);
    const [client, setClient] = useState(null)
    const params = useParams()
   
    useEffect(()=>{
        fetch(`/api/v1/clients/${params.id}`,{
            method: 'GET',
            headers: {
                Authorization : `Bearer ${token}`
            }
        }).then(r => r.json()).then(data => setClient(data))
    }, [])
    console.log(client)

    return(
        <>
        {client ? 
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
                        Client Page - {client.client_name}
                    </Typography>
            </Box>

            <Box
            sx={{display: 'flex', justifyContent: 'center', mt: 3}}
            >
                <Box sx={{display: 'block'}}>
                    <Box>
                        <Typography>Name: {client.client_name}</Typography>
                    </Box>
                    <Box>
                        <Typography>{client.description? client.description : "Enter Description"}</Typography>
                        <TextField
                        id="outlined-multiline-static"
                        label="Client Description"
                        multiline
                        rows={4}
                        defaultValue= {client.description? client.description : ""}
                        sx={{minWidth: {xs: 300, md: 500, lg:700}, mt:1}}
                        />
                    </Box>
                </Box>
            </Box>

            </>

            : null }
        </>
    )
}