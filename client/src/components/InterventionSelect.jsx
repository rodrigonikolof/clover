import React, {useState, useEffect, useContext } from "react";
import { Autocomplete, TextField } from "@mui/material";

export default function InterventionSelect({interventions}){

    const [selected, setSelected] = useState(null)

    const handleChange = (e,input)=>{
        setSelected(input)
    }

    if(selected){
        const search = interventions.find(int => int.intervention_name == selected)
        if (search){
            console.log(search)
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

            <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={interventions.map((option) => option.intervention_name)}
            renderInput={(params) => <TextField {...params} label="Interventions" />}
            onChange={(e,input)=>handleChange(e, input)}
          />

        
    )

}