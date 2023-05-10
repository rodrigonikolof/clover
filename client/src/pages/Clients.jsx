import React, {useState, useEffect, useContext} from "react";
import { Context } from "../App";
import { Box, Typography } from "@mui/material";

export default function Clients(){
    const [user, setUser, token, setToken] = useContext(Context);

    useEffect(()=>{
        fetch('/api/v1/clients',{
            method: 'GET',
            headers: {
                Authorization : `Bearer ${token}`
            }
        }).then(r => r.json()).then(data => console.log(data))
    },[])



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

        
    </>
)

}