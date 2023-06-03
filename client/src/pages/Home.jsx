import React, {useState, useEffect, useContext} from "react";
import { Context } from "../App";
import { Box, Typography } from "@mui/material";

export default function Home(){

const [user, setUser, token, setToken] = useContext(Context);





    return(
        <>
           <Box
            sx={{display: 'flex', justifyContent: 'center', mt: 3}}
            >
                <Typography
                variant="h5" 
                component="h2" 
                color="textSecondary"
                gutterBottom
                >
                    Logged In
                </Typography>
            </Box>

            

        </>
    )
}