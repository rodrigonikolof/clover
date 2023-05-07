import React from "react";
import { useState, useEffect } from "react";
import {Typography, Button, Container, TextField, MenuItem, FormControl, InputLabel, Select} from '@mui/material'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function SignUpForm(){

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [nameError, setNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [passwordConfirmationError, setPasswordConfirmationError] = useState(false)

    const handleSubmit = (e)=>{
        e.preventDefault()
        name? setNameError(false) : setNameError(true)
        email? setEmailError(false) : setEmailError (true)
        password? setPasswordError(false) : setPasswordError (true)
        passwordConfirmation === password? setPasswordConfirmationError(false) : setPasswordConfirmationError(true)
        

        if (name && email && password && passwordConfirmation === password){
            console.log(name, email, password)
            fetch('/api/v1/users',{
               method: 'POST',
               headers : { "Content-Type" : "application/json"}, 
               body: JSON.stringify({
                name,
                email,
                password,
                password_confirmation : passwordConfirmation,
               }),
            }).then((r)=>{
                if (r.ok){
                    // r.json().then((user) => onLogin(user));
                    r.json().then(data => console.log(data))
                } else {
                    // r.json().then((err)=>setErrorFromServer(err.errors))
                    // .then(console.log(errorFromServer))
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
                    Sign Up
                </Typography>

                <form 
                    onSubmit={handleSubmit}
                    autoComplete="off"
                    noValidate
                >
                    <TextField 
                        onChange={(e)=>{setName(e.target.value)}}
                        label="Name"    
                        fullWidth
                        required 
                        sx={{marginBottom: 1}}  
                        error={nameError}  
                        value={name}        
                    />
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

                    <TextField 
                        onChange={(e)=>{setPasswordConfirmation(e.target.value)}}
                        label="Confirm Password"  
                        type="password"  
                        fullWidth
                        required 
                        sx={{marginBottom: 1}}  
                        error={passwordConfirmationError}  
                        value={passwordConfirmation}        
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