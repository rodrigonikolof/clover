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
    console.log(description)

    
    
   

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
                <Button
                        color="primary"
                        // variant="contained"
                        sx={{mr:{md:6}}}
                        
                        >
                        Edit  
                </Button>
            </Box>

            <Box
            sx={{display: 'flex', justifyContent: 'center', mt: 3}}
            >
                <Box sx={{display: 'block'}}>
                    <Box>
                        <Typography>Name: {client.client_name}</Typography>
                    </Box>
                    <Box>
                        {/* {client.description? 
                            <Typography>"Description: "{client.description}</Typography>
                            :
                            <form>
                            <TextField
                            id="outlined-multiline-static"
                            label= {client.description? "Description" : "Create a Description"}
                            multiline
                            rows={4}
                            defaultValue= {client.description? client.description : ""}
                            sx={{minWidth: {xs: 300, md: 500, lg:700}, mt:1}}
                            onChange={(e)=>setDescription(e.target.value)}
                            />
                            <Button>
                                Save
                            </Button>
                            </form>
                        }     */}
                    


                        
                    </Box>
                </Box>
            </Box>

            </>

            : null }
        </>
    )
}