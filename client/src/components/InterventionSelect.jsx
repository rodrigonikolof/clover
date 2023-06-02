import React, {useState, useEffect, useContext} from "react";
import { Autocomplete, TextField, Button, Box, inputAdornmentClasses } from "@mui/material";
import { Context } from "../App";

export default function InterventionSelect({interventions, setInterventions, setGoalInterventions, goalInterventions, goal}){

    const [user, setUser, token, setToken] = useContext(Context);
    const [selected, setSelected] = useState(null)
    const [newInput, setNewInput] = useState(null)
    const [newIntervention, setNewIntervention]= useState(null)
   

    const handleChange = (e,input)=>{
        setSelected(input)
    }

    const handleAdd = (e)=>{
        e.preventDefault()
        
        const search = interventions.find(int => int.intervention_name == selected)
        if(selected || newInput){
            if (search){
                saveGoalIntervention(search)
            }
            else{
                createIntervention()
            }
        } else {
            console.log("it's blank")
        }
    }

    const createIntervention = ()=>{
        const newIntervention = {intervention_name: selected , user_id: user.user.id}
        fetch('/api/v1/interventions', {
            method: "POST",
            headers: {"Content-Type" : "application/json", Authorization: `Bearer ${token}`},
            body: JSON.stringify({
                intervention_name : newInput,
                user_id : user.user.id
            })
        }).then(r => {
            if (r.ok){
                r.json().then(data =>{
                    saveGoalIntervention(data)
                    setInterventions([...interventions,data])
                
                })                
            }
            
        })
        setNewIntervention(null)
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
                r.json().then(data => setGoalInterventions([...goalInterventions ,data]))
            }
        })
        setSelected(null)
    }

    return(
        <> 

          
        {interventions? 
            <form onSubmit={handleAdd} onChange={(e)=>setNewInput(e.target.value)}> 
                <Box sx={{display:'flex', ml:1, mr:1, mb: 1}}>
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