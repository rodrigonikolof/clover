import React, {useState, useEffect, useContext } from "react";
import { Autocomplete, TextField } from "@mui/material";

export default function InterventionSelect({interventions}){


    return(
    
            <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={interventions}
            getOptionLabel={(option) => option.intervention_name}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Intervention" />}
            />
        
    )

}