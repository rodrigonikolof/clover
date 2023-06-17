import React, {useState, useEffect, useContext} from "react";
import { Context } from "../App";
import { Box, Typography, Grid } from "@mui/material";

export default function Home(){

const [user, setUser, token, setToken] = useContext(Context);
const [clientsLength, setClientsLength] = useState(null)

useEffect(()=>{ 
    fetch('/api/v1/clients',{
         method: 'GET',
         headers: {
             Authorization : `Bearer ${token}`
         }
     }).then(r => r.json()).then(data => setClientsLength(data.length))
     
 },[])

 if (clientsLength){console.log(clientsLength)}

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
                    Welcome to Clover!
                </Typography>
            </Box>

            <Box sx={{display:'flex', justifyContent: 'center', mr:6, ml:6, mt: 3, flexGrow: 3}}>

                <Box>
                    <Grid container spacing={3}>

                        <Grid item xs={12} md={3}>
                            Hello
                        </Grid>

                        

                    </Grid>
                </Box>
            </Box>
            

        </>
    )
}