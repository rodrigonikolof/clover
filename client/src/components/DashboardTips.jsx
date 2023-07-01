import React, {useState} from "react";
import { Box, Typography, Grid, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function DashboardTips(){
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };

    const accordionColor = '#c9e6b3'

    const textColor = {color: "#2a4d17"}

return(
    <>
    <Box>
    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{backgroundColor:accordionColor}}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            >
            <Typography sx={{ color: 'text.secondary' }}>How to get started?</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography sx={textColor}> - Visit the Clients page and create the clients needed following the prompts; </Typography>
                <Typography sx={textColor}> - Click on the created client; this will direct you to the individual page for that client;  </Typography>
                <Typography sx={textColor}> - Input as much or as little information you wish about that client;</Typography>
                <Typography sx={textColor}> - Create one or more Goals for the client to work towards; </Typography>
                <Typography sx={textColor}> - Add interventions you will be using to assist the client reach that goal;  </Typography>
                
            </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} sx={{backgroundColor:accordionColor}}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
            >
            <Typography sx={{ color: 'text.secondary' }}>
                Should I use real clients' names? 
            </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography sx={textColor}> It is recommended that you use an alias for each client to ensure anonimity. </Typography>
            <Typography sx={textColor}> Alternatively, you may choose to use only a client's first name.  </Typography>
            </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} sx={{backgroundColor:accordionColor}}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
            >
            <Typography sx={{ color: 'text.secondary' }}>
                How do I manage interventions? 
            </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography sx={textColor}> By visiting the Intervention page you can manage all your interventions. </Typography>
            <Typography sx={textColor}> Please beware that editing an intervention will affect all Goals where this interventions is present. </Typography>
            <Typography sx={textColor}> For slight variations, you may choose to create a new intervention. </Typography>
            </AccordionDetails>
        </Accordion>
        </Box>
    </>
)
}
