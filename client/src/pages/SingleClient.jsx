import React, {useState, useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import { Context } from "../App";
import { Box, Typography, Button, Grid, Paper } from "@mui/material";

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
    console.log(params.id)
    console.log(client)

    return(
        <>
            <h2>Single Client Page </h2>
        </>
    )
}