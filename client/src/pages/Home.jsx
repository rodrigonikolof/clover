import React, {useState, useEffect, useContext} from "react";
import { Context } from "../App";
import { Box, Typography, Grid, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';
import FolderIcon from '@mui/icons-material/Folder';
import PsychologyIcon from '@mui/icons-material/Psychology';
import DashboardCard from "../components/DashboardCard";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DashboardTips from "../components/DashboardTips";

export default function Home(){

const [user, setUser, token, setToken] = useContext(Context);
const [clients, setClients] = useState(null)
const [activeClients, setActiveClients] = useState(null)
const [archivedClients, setArchivedClients] = useState(null)
const [interventions, setInterventions] = useState(null)




useEffect(()=>{ 
    fetch('/api/v1/clients',{
         method: 'GET',
         headers: {
             Authorization : `Bearer ${token}`
         }
     }).then(r => r.json()).then(data => setClients(data))
     
 },[])

 useEffect(()=>{
    fetch('/api/v1/interventions',{
        method: 'GET',
        headers: {
            Authorization : `Bearer ${token}`
        }
    }).then(r => r.json()).then(data => setInterventions(data.length))
},[])

useEffect(()=>{
    if(clients){
    const active = clients.filter((client)=>{
        return  client.active === true
       }).length; 
       setActiveClients(active)
       setArchivedClients(clients.length - active)
    }

}, [clients])

if(clients){console.log(archivedClients)}

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
                    Overview
                </Typography>
            </Box>

            <Box sx={{display:'flex', justifyContent: 'center', mr:6, ml:6, mt: 3, flexGrow: 3}}>

                
                    <Grid container spacing={3}>

                        <DashboardCard title={'Active Clients'} icon={<PeopleIcon fontSize="large"/>} info={activeClients} />
                        <DashboardCard title={'Archived Clients'} icon={<FolderIcon fontSize="large"/>} info={archivedClients} />
                        <DashboardCard title={'Interventions'} icon={<PsychologyIcon fontSize="large"/>} info={interventions} />
                        

                    </Grid>
                
            </Box>

    

        <Box sx={{display:'block', justifyContent: 'center', mr:6, ml:6, mt: 14, mb: 8}}>   
            <Box  sx={{display: 'flex', justifyContent:'left', mb:1}}> 
                <Typography variant="h6" color="textSecondary">Clover's Quick Guide</Typography> 
            </Box>  
            <DashboardTips/>
        </Box>
    </>
    )
}