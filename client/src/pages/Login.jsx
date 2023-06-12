import React from "react";
import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";
import logo from '../img/logo.png'
import { Box, Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";

export default function Login(){



    return(
    <>
        <Box sx={{display:{ xs: 'block', md: 'flex' }}}>
            <Box  
                sx={{width:{xs:1, md:0.5}, backgroundColor: 'green', minHeight: '100vh', justifyContent:'center', flexWrap:'wrap', display:{ xs: 'none', md: 'flex' }}}
            >

                <Box sx={{ml:{xs:0, md:10}, mr:{xs:0, md:10}, mt:{xs:0, md:'30vh'}}}>
                    <Box sx={{display:'flex', flexWrap:'wrap', justifyContent:'left'}}>
                        <Box sx={{display:'flex', justifyContent:'center', flexWrap:'wrap'}}>
                            <Box sx={{display:'flex', justifyContent:'center', minWidth:1}} >
                                <Box  component="img" src={logo} maxHeight={70}/> 
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
                        </Box>   
                    </Box>
                    <Box >
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                color:'beige',
                                fontFamily: 'monospace',
                                fontWeight: 500,
                                letterSpacing: '.3rem',
                                
                                ml: 4
                            }}
                        >
                            Client goal management made simple. 
                        </Typography>
                    </Box>
                </Box>           
            </Box>

            <Box sx={{width:0.5, backgroundColor:'beige'}}>
                <Box sx={{ml:{xs:0, md:10}, mr:{xs:0, md:10}, mt:{xs:0, md:'30vh'}}}>
                    <LoginForm/>
                </Box>
                
                
            </Box>
        </Box>
        {/* <SignUpForm/>
        <LoginForm/> */}

    </>
    )
}