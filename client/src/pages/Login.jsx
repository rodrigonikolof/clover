import React, {useState} from "react";
import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";
import logo from '../img/logo.png'
import { Box, Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";
import PasswordReset from "../components/PasswordReset";

export default function Login(){

    const [login, setLogin] = useState(true)
    const [forgotPassword, setForgotPassword] = useState(true)

    const handleToggle = (e,value)=>{
        if (value == null){return 0}
        setLogin(value)
    }



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
                            Goal management made simple. 
                        </Typography>
                    </Box>
                </Box>           
            </Box>

            <Box sx={{width:0.5, backgroundColor:'beige'}}>
                            
                <Box sx={{ml:{xs:0, md:10}, mr:{xs:0, md:10}, mt:{xs:0, md:'25vh'}}}>

                {forgotPassword? 

                    <PasswordReset setForgotPassword={setForgotPassword}/>

                    :
                    <>
                            <ToggleButtonGroup 
                                value={login}
                                onChange={handleToggle}
                                exclusive
                                sx={{mb:1}}
                                > 
                                <ToggleButton value={true} sx={{fontFamily: 'monospace'}}>
                                    Login
                                </ToggleButton>
                                <ToggleButton value={false} sx={{fontFamily: 'monospace'}}>
                                    Sign Up
                                </ToggleButton>
                            </ToggleButtonGroup>

                    {login? <LoginForm/> : <SignUpForm/>}
                    
                    </> 
                   
                   
                        }
                </Box>
                
                
            </Box>
        </Box>

    </>
    )
}