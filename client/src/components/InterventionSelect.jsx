import React, {useState, useEffect, useContext} from "react";
import { Autocomplete, TextField, Button, Box } from "@mui/material";
import { Context } from "../App";

export default function InterventionSelect({interventions, goal}){

    const [user, setUser, token, setToken] = useContext(Context);
    const [selected, setSelected] = useState(null)
    const [saved, setSaved] = useState(false)
   

    const handleChange = (e,input)=>{
        setSelected(input)
    }


    const handleAdd = (e)=>{
        e.preventDefault()
        const search = interventions.find(int => int.intervention_name == selected)
        if (search){
            saveGoalIntervention(search)
        }
        else{
            createIntervention()
        }
    }

    const createIntervention = ()=>{
        const newIntervention = {intervention_name: selected , user_id: user.user.id}
        fetch('/api/v1/interventions', {
            method: "POST",
            headers: {"Content-Type" : "application/json", Authorization: `Bearer ${token}`},
            body: JSON.stringify({
                intervention_name : newIntervention.intervention_name,
                user_id : user.user.id
            })
        }).then(r => {
            if (r.ok){
                r.json().then(data =>console.log(data))
            }
        })

    }
   

    const saveGoalIntervention = (search)=>{
        fetch(`/api/v1/goal_intervention`, {
            method: "POST",
            headers: {"Content-Type" : "application/json", Authorization: `Bearer ${token}`},
            body: JSON.stringify({
                goal_id : goal.id,
                intervention_id: search.id
            })
        }).then(r => {
            if (r.ok){
                r.json().then(data => console.log(data))
            }
        })
        setSelected(null)
    }

    return(
    

    <>
          
        {interventions?
            <form onSubmit={handleAdd}> 
                <Box sx={{display:'flex', ml:1, mr:1}}>
                    <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    sx={{width:9/10}}
                    options={interventions.map((option) => option.intervention_name)}
                    renderInput={(params) => <TextField {...params} label="Interventions" />}
                    onChange={(e,input)=>handleChange(e, input)}
                    />
                    <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    >
                        Add
                    </Button>
                </Box>
            </form>
       
            :null}

    </>
    )

}