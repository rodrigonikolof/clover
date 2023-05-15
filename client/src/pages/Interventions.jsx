import React, {useState, useEffect, useContext} from "react";
import { Context } from "../App";
import { Box, Typography, Grid } from "@mui/material";
import InterventionCard from "../components/InterventionCard";

export default function Interventions(){
    const [user, setUser, token, setToken] = useContext(Context);
    const [interventions, setInterventions] = useState(null)

    useEffect(()=>{
        fetch('/api/v1/interventions',{
            method: 'GET',
            headers: {
                Authorization : `Bearer ${token}`
            }
        }).then(r => r.json()).then(data => setInterventions(data))
    },[])
    console.log(interventions)

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
                    Interventions
                </Typography>
            </Box>
            <Box
            sx={{display: 'flex', justifyContent: 'center', mt: 3}}
            >
                <Box sx={{ml: 6, mr: 6}} >
                    <Grid container spacing={3}>
                        {interventions ? 
                            interventions.map((intervention)=>{
                            return   (
                                <Grid item xs={12} md={12}  key={intervention.id}>
                                    <InterventionCard intervention={intervention} key={intervention.id}/>
                                </Grid>
                            )
                            })
                        : null }
                    </Grid>
                </Box>
            </Box>
    </>
)

}