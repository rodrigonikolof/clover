import React, {useState, useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import { Context } from "../App";
import { Box, Typography, Button, TextField } from "@mui/material";
import Goals from "../components/Goals";

export default function SingleClient(){
    const [user, setUser, token, setToken] = useContext(Context);
    const [client, setClient] = useState(null)
    const [description, setDescription] = useState('')
    const [clientName, setClientName] = useState('')
    const [active, setActive] = useState('')
    const [edit, setEdit] = useState(false)

    const params = useParams()
   
    useEffect(()=>{
        fetch(`/api/v1/clients/${params.id}`,{
            method: 'GET',
            headers: {
                Authorization : `Bearer ${token}`
            }
        }).then(r => r.json()).then(data => {
            setClient(data)
            setDescription(data.description)
            setClientName(data.client_name)
        })
    }, [])
    

    const handleUpdate = (e)=>{
        e.preventDefault()
        // if (interventionName === intervention.intervention_name || interventionName === "")
        //     toggleShowUpdate()
        // else{

        fetch(`/api/v1/clients/${client.id}`,{
            method: 'PATCH',
            headers: {"Content-Type" : "application/json", Authorization: `Bearer ${token}`},
            body: JSON.stringify({
                client_name : clientName, 
                description : description,
            })
        })
        setEdit(false)
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
                        Client Page - {clientName}
                    </Typography>
            </Box>

            
                    <Box sx={{display:{md:'flex', xs:'block'}, justifyContent: 'center', mt:3}}>
                        <Button  sx={{ml:{md:40}, color:'green'}} onClick={()=>setEdit(!edit)}>
                                Edit  
                        </Button>
                        <Button  sx={{ mr:{md:40}, color:'green'}} onClick={()=>setEdit(!edit)}>
                                Archive  
                        </Button>
                    </Box>

                    <Box sx={{display: 'flex', justifyContent: 'center', mt: 3, mr:{md:40}, ml:{md:40}}}>
                        <Box sx={{display: 'block', maxWidth:500}}>
                            {!edit?  
                            <>
                            <Box> <Typography>Name: {clientName}</Typography> </Box>
                            <Box sx={{mt:3}}> Description: {description? description : "No description to show"}</Box>
                            </>
                                :

                            <Box sx={{display:'block', maxWidth:500}}>
                                <form>
                                    
                                    <TextField
                                        defaultValue={client.client_name}
                                        onChange={(e)=>{setClientName(e.target.value)}}
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
                                    variant="contained"
                                    sx={{mt:1, backgroundColor:'green'}}
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
            
            {client? 
                <Box sx={{display: 'flex', justifyContent: 'center', mt: 3, ml:6, mr: 6}}>
                    <Goals client_id={client.id}/>
                </Box>
            
                

            :
            null    
            }

        </>
    )
}