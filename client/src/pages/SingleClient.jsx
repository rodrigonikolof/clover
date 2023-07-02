import React, {useState, useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import { Context } from "../App";
import { Box, Typography, Button, TextField, Paper } from "@mui/material";
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
            setActive(data.active)
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
    
    const toggleStatus = ()=>{
        setActive(!active)
        handleStatusUpdate(!active)
    }

    const handleStatusUpdate = (status)=>{
        fetch(`/api/v1/clients/${client.id}`,{
            method: 'PATCH',
            headers: {"Content-Type" : "application/json", Authorization: `Bearer ${token}`},
            body: JSON.stringify({
                active: status
            })
        })
    }

console.log(active)

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
                        Client Page - {clientName} {active? null : "(Archived)"}
                    </Typography>
            </Box>

            
                    <Box sx={{display:{md:'flex',sm:'flex', xs:'block'}, justifyContent: 'center', mt:3}}>
                        <Button  sx={{ml:{md:40}, color:'green'}} onClick={()=>setEdit(!edit)}>
                                Edit  
                        </Button>
                        <Button  sx={{ mr:{md:40}, color:'green'}} onClick={toggleStatus}>
                                {active? "Archive" : "Unarchive"}
                        </Button>
                    </Box>

                    <Box sx={{display: 'flex', justifyContent: 'center', mt: 3, mr:{md:40}, ml:{md:40}}}>
                        <Box sx={{display: 'block', maxWidth:500}}>
                            {!edit?  
                            <>
                            <Paper sx={{backgroundColor:'#c9e6b3'}}>
                                <Box sx={{p:2}}> 
                                    <Typography variant="h6" sx={{color: "#2a4d17", fontWeight:'bold'}}> Name </Typography> 
                                    <Typography variant="h6" sx={{color:"#2a4d17"}}>{clientName}</Typography>
                                </Box>
                                <Box sx={{mt:-2, p:2}}> 
                                    <Typography variant="h6" sx={{color: "#2a4d17", fontWeight:'bold'}}>Description:</Typography>
                                    <Typography variant="h6" sx={{color:"#2a4d17"}}>{description? description : "No description to show"}</Typography>
                                    
                                </Box>
                            </Paper>
                            </>
                                :

                            <Box sx={{display:'block', maxWidth:500}}>
                                <Paper sx={{backgroundColor:'#c9e6b3', p:2}}>
                                    <form>
                                        
                                        <TextField
                                            defaultValue={client.client_name}
                                            onChange={(e)=>{setClientName(e.target.value)}}
                                            label="Client Name"
                                            color="success"
                                            inputProps={{style: {color:"#2a4d17", fontSize:20}}}
                                            sx={{'& .MuiFormLabel-root': {
                                                fontSize: 20,
                                              }}}
                                        />
                                        <TextField
                                        id="outlined-multiline-static"
                                        label="Client Description"
                                        multiline
                                        rows={5}
                                        defaultValue= {client.description? client.description : ""}
                                        sx={{minWidth: {xs: 400, md: 400}, mt:1, '& .MuiFormLabel-root': {
                                            fontSize: 20,
                                          }}}
                                        onChange={(e)=>setDescription(e.target.value)}
                                        color="success"
                                        inputProps={{style: {color:"#2a4d17", fontSize:20}}}
                                        />
                                        <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{mt:1, backgroundColor:'green'}}
                                        onClick={handleUpdate}
                                        color='success'
                                        >
                                            Save
                                        </Button>
                                    </form>
                                </Paper>
                            </Box>
                            
                            }                
                            
                        </Box>
                    </Box>
            
            </>

            : null }
            
            {client? 
                <Box sx={{display: 'flex', justifyContent: 'center', mt: 0, ml:6, mr: 6}}>
                    <Goals client_id={client.id}/>
                </Box>
            
                

            :
            null    
            }

        </>
    )
}