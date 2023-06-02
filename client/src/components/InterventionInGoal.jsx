import React from "react";
import { AccordionDetails, Box, Typography } from "@mui/material";


export default function InterventionInGoal({goalIntervention, goalInterventions}){


return(
<>

    <AccordionDetails>
        {goalIntervention.intervention.intervention_name}
    </AccordionDetails>


</>
)
}