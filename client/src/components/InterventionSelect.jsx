import React, {useState, useEffect, useContext } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { Context } from "../App";

export default function InterventionSelect({interventions, goal}){

    const [user, setUser, token, setToken] = useContext(Context);
    const [selected, setSelected] = useState(null)

    const handleChange = (e,input)=>{
        setSelected(input)
    }

    if(selected){
        const search = interventions.find(int => int.intervention_name == selected)
        if (search){
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
        else{
            console.log(selected)
        }     
    }



    return(
    
            // <Autocomplete
            // disablePortal
            // id="combo-box-demo"
            // freeSolo
            // options={interventions}
            // getOptionLabel={(option) => option.intervention_name}
            // sx={{ width: 300 }}
            // renderInput={(params) => <TextField {...params} label="Intervention" />}
            // input={selected}
            // onChange={(e,input)=>handleChange(e, input)}
            // />

        <>
          
          {interventions?
            <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={interventions.map((option) => option.intervention_name)}
            renderInput={(params) => <TextField {...params} label="Interventions" />}
            onChange={(e,input)=>handleChange(e, input)}
            />

            :null}

       </>
    )

}