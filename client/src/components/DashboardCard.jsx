import React from "react";
import { Box, Typography, Grid, Card, CardActions, CardContent, CardHeader } from "@mui/material";


export default function DashboardCard({title, icon, info}){

    // 'rgb(226, 226, 201)'

return(
<>
    <Grid item xs={12} md={4}>
        <Card sx={{minWidth:275, backgroundColor: '#c9e6b3'}}>
        <Box sx={{minWidth:1, justifyContent:'center', display:'flex', mt:-1, mb: -4}}>
            <CardHeader
                avatar={icon}
                title={<Typography variant="h6" sx={{color:'#2a4d17'}}>{title}</Typography>}
            />
            </Box>
            <CardContent >
                <Box sx={{minWidth:1, justifyContent:'center', display:'flex', mb:-2}}>
                    <Typography variant="h2" sx={{color:'#2a4d17'}}>
                        {info}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    </Grid>

</>
)
}