import React, {useState, useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import { Context } from "../App";
import { Box, Typography, Button, TextField } from "@mui/material";

export default function SingleClient(){
    const [user, setUser, token, setToken] = useContext(Context);
    const [client, setClient] = useState(null)
    const [description, setDescription] = useState('')
    const [clientNameUpdate, setClientNameUpdate] = useState('')
    const [active, setActive] = useState('')
    const [edit, setEdit] = useState(false)

    const params = useParams()
   
    useEffect(()=>{
        fetch(`/api/v1/clients/${params.id}`,{
            method: 'GET',
            headers: {
                Authorization : `Bearer ${token}`
            }
        }).then(r => r.json()).then(data => setClient(data))
    }, [])
    console.log(edit)

    const handleUpdate = (e)=>{
        e.preventDefault()
    }
    
   

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

            
                    <Box sx={{display:{md:'flex', xs:'block'}, justifyContent: 'right', mt:3}}>
                        <Button color="primary" sx={{mr:{md:40}}} onClick={()=>setEdit(!edit)}>
                                Edit  
                        </Button>
                    </Box>

                    <Box sx={{display: 'flex', justifyContent: 'center', mt: 3, mr: 6, ml:6}}>
                        <Box sx={{display: 'block', maxWidth:500}}>
                            {!edit?  
                            <>
                            <Box> <Typography>Name: {client.client_name}</Typography> </Box>
                            <Box sx={{mt:3}}> Description: {client.description? client.description : "No description to show"}</Box>
                            </>
                                :

                            <Box sx={{display:'block', maxWidth:500}}>
                                <form>
                                    
                                    <TextField
                                        defaultValue={client.client_name}
                                        onChange={(e)=>{setClientNameUpdate(e.target.value)}}
                                        label="Client Name"
                                    />
                                    <TextField
                                    id="outlined-multiline-static"
                                    label="Client Description"
                                    multiline
                                    rows={5}
                                    defaultValue= {client.description? client.description : ""}
                                    sx={{minWidth: {xs: 300, md: 500}, mt:1}}
                                    onChange={(e)=>setDescription(e.target.value)}
                                    />
                                    <Button
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                    sx={{mt:1}}
                                    onClick={handleUpdate}
                                    >
                                        Save
                                    </Button>
                                </form>
                            </Box>
                            
                            }                
                            
                        </Box>
                    </Box>
            
            </>

            : null }
            
        </>
    )
}