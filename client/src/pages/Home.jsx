import React, {useState, useEffect, useContext} from "react";
import { Context } from "../App";
import { Box, Typography, Grid, Card, CardActions, CardContent, CardHeader } from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';
import DashboardCard from "../components/DashboardCard";

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

                        <DashboardCard title={'Active Clients'} icon={<PeopleIcon/>} info={clientsLength} />
                        
                        

                    </Grid>
                </Box>
            </Box>
            

        </>
    )
}