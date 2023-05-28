import React, {useState, useEffect, useContext } from "react";
import { Autocomplete, TextField } from "@mui/material";

export default function InterventionSelect({interventions}){

    const [selected, setSelected] = useState(null)

    const handleChange = (e,input)=>{
        setSelected(input)
    }

    console.log(selected)

    return(
    
            <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={interventions}
            getOptionLabel={(option) => option.intervention_name}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Intervention" />}
            input={selected}
            onChange={(e,input)=>handleChange(e, input)}
            />
        
    )

}