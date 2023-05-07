import React from "react";
import {useState, useEffect, useContext} from 'react';
import {Typography, Button, Container, TextField, MenuItem, FormControl, InputLabel, Select} from '@mui/material'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Context } from "../App";

export default function LoginForm(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [errorFromServer, setErrorFromServer] = useState([])

    const [user, setUser, token, setToken] = useContext(Context);
    

    const handleSubmit = (e)=>{
        e.preventDefault()
        email? setEmailError(false) : setEmailError (true)
        password? setPasswordError(false) : setPasswordError (true)
        if ( email && password ){
            fetch("/api/v1/login", {
                method: "POST",
                headers: {"Content-Type" : "application/json",},
                body: JSON.stringify({email, password})
            })
                .then((r)=>{
                    if(r.ok){
                        // r.json().then((user)=>{onLogin(user)})
                        r.json().then(data=>{
                            setUser(data.user);
                            setToken(data.jwt);
                        })
                    } else {
                        r.json().then((err)=> setErrorFromServer(err.errors));
                    }
                })
            
        }
    }

    return(
        <>
            <Typography 
                variant="h5" 
                component="h2" 
                color="textSecondary"
                gutterBottom
            >
                Login
            </Typography>
            <form
                onSubmit={handleSubmit}
                autoComplete="off"
                noValidate
            >

                <TextField 
                    onChange={(e)=>{setEmail(e.target.value)}}
                    label="Email"    
                    fullWidth
                    required 
                    sx={{marginBottom: 1}}  
                    error={emailError}  
                    value={email}        
                />
                <TextField 
                    onChange={(e)=>{setPassword(e.target.value)}}
                    label="Password"  
                    type="password"  
                    fullWidth
                    required 
                    sx={{marginBottom: 1}}  
                    error={passwordError}  
                    value={password}        
                />
                <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    endIcon={<KeyboardArrowRightIcon/>}
                >
                    Submit
                </Button>
            </form>
        
        
        </>
    )
}