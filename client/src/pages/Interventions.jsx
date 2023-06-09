import React, {useState, useEffect, useContext} from "react";
import { Context } from "../App";
import { Box, Typography, Grid, Button, TextField } from "@mui/material";
import InterventionCard from "../components/InterventionCard";
import AddIcon from '@mui/icons-material/Add';
import SearchBar from "../components/SearchBar";

export default function Interventions(){
    const [user, setUser, token, setToken] = useContext(Context);
    const [interventions, setInterventions] = useState(null)
    const [searchInput, setSearchInput] = useState("")

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
            <Box sx={{display:{md:'flex', xs:'block'}, justifyContent: 'center', mt:3}}>
                {/* <Box>
                    1
                </Box> */}
                <Box sx={{display:'flex', justifyContent: 'center', mr:6, ml:6, flexGrow: 3}}>
                    <SearchBar setSearchInput={setSearchInput}/>
                </Box>
                <Box sx={{display:'flex', justifyContent: {xs: 'center', md: 'center'}, mt: 3}}>
                <Button
                        color="success"
                        variant="contained"
                        endIcon={<AddIcon/>}
                        sx={{mr:{md:6}, backgroundColor:'green'}}
                        onClick={handleCreate}
                        >
                        Create  
                    </Button>
                </Box>
            </Box>
            <Box
            sx={{display: 'flex', justifyContent: 'center', mt: 3}}
            >
                {/* sx={{minWidth:{xs:12, md:12}}} */}
                <Box sx={{ml: 6, mr: 6, mb: 6, minWidth:9.2/10}} >
                    <Grid container spacing={3}>
                        {interventions ? 
                            interventions.filter((int)=>int.intervention_name.toLowerCase().includes(searchInput)).map((intervention)=>{
                            return   (
                                <Grid item xs={12} md={12} lg={12} key={intervention.id} >
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