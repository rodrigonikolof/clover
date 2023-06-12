import React from "react";
import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";
import logo from '../img/logo.png'
import { Box, Typography } from "@mui/material";

export default function Login(){



    return(
    <>
        <Box sx={{display:{ xs: 'block', md: 'flex' }}}>
            <Box  sx={{width:{xs:1, md:0.5}, backgroundColor: 'green', minHeight: '100vh', display:'flex', justifyContent:'center'}}>

                <Box sx={{mt: {xs: 0, md:10}}}>
                    <Box sx={{display:'flex', justifyContent:'left'}} >
                        <Box sx={{ mr: 1, mb:0.5, mt:0.5 }} component="img" src={logo} maxHeight={70}/> 
                    </Box>
                    
                    <Typography 
                        variant="h3"
                        noWrap
                        component="div"
                        sx={{
                            color:'beige',
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                        }}
                    >
                        CLOVER
                    </Typography>
                    
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            color:'beige',
                            fontFamily: 'monospace',
                            fontWeight: 500,
                            letterSpacing: '.3rem',
                        }}
                    >
                        Client goal management made simple. 
                    </Typography>
                    </Box>           
            </Box>

            <Box sx={{width:0.5, backgroundColor:'beige'}}>
                <LoginForm/>
            </Box>
        </Box>
        {/* <SignUpForm/>
        <LoginForm/> */}

    </>
    )
}