import React from "react";
import {useState, useEffect, useContext} from 'react';
import {Typography, Button, Container, TextField, MenuItem, FormControl, InputLabel, Select} from '@mui/material'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Context } from "../App";

export default function LoginForm({setForgotPassword}){

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
                            localStorage.setItem("clover-jwt", data.jwt)
                            console.log(data.jwt)
                        })
                    } else {
                        r.json().then((err)=> setErrorFromServer(err.errors));
                    }
                })
            
        }
    }


    const handleReset =()=>{
        fetch('/api/v1/password/reset/edit',{
            method: 'POST',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                email : 'rodrigo.nikolof@outlook.com'
            })
        }).then(data => data.json()).then(data => console.log(data))
        // .then(r => {
        //     if (r.ok){
        //         r.json().then(data => console.log(data))
        //     }
        // })
        
    }

    return(
        <>
            {/* <Typography 
                variant="h5" 
                component="h2" 
                color="textSecondary"
                gutterBottom
            >
                Login
            </Typography> */}
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
                    sx={{marginBottom: 1, '& .MuiFormLabel-root': {
                        fontFamily: 'monospace',
                      }}}  
                    error={emailError}  
                    value={email}   
                    color="success"     
                />
                <TextField 
                    onChange={(e)=>{setPassword(e.target.value)}}
                    label="Password"  
                    type="password"  
                    fullWidth
                    required 
                    sx={{marginBottom: 1, '& .MuiFormLabel-root': {
                        fontFamily: 'monospace',
                      }}}  
                    error={passwordError}  
                    value={password}    
                    color="success" 
                />
                <Button
                    type="submit"
                    color="success"
                    variant="contained"
                    endIcon={<KeyboardArrowRightIcon/>}
                    sx={{backgroundColor:'green', fontFamily: 'monospace'}}
                >
                    Submit
                </Button>
            </form>
            <Typography sx={{fontFamily:'monospace', color:'green', mt:10, cursor:'pointer', textDecoration: 'underline'}} onClick={()=>{setForgotPassword(true)}}>
                Forgotten password?
            </Typography>
        
        </>
    )
}