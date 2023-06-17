import React, {useState, useEffect} from "react";
import { Box, Typography, Grid, Card, CardActions, CardContent, CardHeader } from "@mui/material";


export default function DashboardCard({title, icon, info}){

return(
<>
    <Grid item xs={12} md={3}>
        <Card sx={{minWidth:275, backgroundColor:'lightgrey'}}>
        <Box sx={{minWidth:1, justifyContent:'center', display:'flex', mt:-1, mb: -4}}>
            <CardHeader
                avatar={icon}
                title={<Typography variant="h6">{title}</Typography>}
            />
            </Box>
            <CardContent >
                <Box sx={{minWidth:1, justifyContent:'center', display:'flex', mb:-2}}>
                    <Typography variant="h2">
                        {info}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    </Grid>

</>
)
}