import React, {useState, useEffect, useContext} from "react";
import { Context } from "../App";
import { Box, Typography, Grid, Button } from "@mui/material";
import InterventionCard from "../components/InterventionCard";
import AddIcon from '@mui/icons-material/Add';

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
  

    const handleDelete = (id)=>{
        fetch(`/api/v1/interventions/${id}`,{
            method: 'DELETE',
            headers: {Authorization : `Bearer ${token}`}
        })
        setInterventions(interventions.filter(intervention => intervention.id != id))
    }

    const handleCreate = ()=>{
       const newIntervention = {intervention_name: "New Intervention", user_id: user.user.id}
        
        fetch('/api/v1/interventions', {
            method: "POST",
            headers: {"Content-Type" : "application/json", Authorization: `Bearer ${token}`},
            body: JSON.stringify({
                intervention_name : newIntervention.intervention_name,
                user_id : newIntervention.user_id
            })
        }).then(r => {
            if (r.ok){
                r.json().then(data => setInterventions([...interventions,data]))
            }
        })
    }

   
    

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
            <Box sx={{display:'flex', justifyContent: {xs: 'center', md: 'right'}, mt: 3}}>
            <Button
                    color="primary"
                    variant="contained"
                    endIcon={<AddIcon/>}
                    sx={{mr:{md:6}}}
                    onClick={handleCreate}
                    >
                    Create  
                </Button>
            </Box>
            <Box
            sx={{display: 'flex', justifyContent: 'center', mt: 3}}
            >
                <Box sx={{ml: 6, mr: 6, mb: 6}} >
                    <Grid container spacing={3}>
                        {interventions ? 
                            interventions.map((intervention)=>{
                            return   (
                                <Grid item xs={12} md={12}  key={intervention.id}>
                                    <InterventionCard intervention={intervention} key={intervention.id} handleDelete={handleDelete}/>
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