import React, {useState, useContext} from "react";
import { Context } from "../App";
import { Box, Typography, TextField, Button } from "@mui/material";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function Profile(){

    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordError, setNewPasswordError] = useState(false)
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('')
    const [newPasswordConfirmationError, setNewPasswordConfirmationError] = useState(false)
    const [updateConfirmation, setUpdateConfirmation] = useState(false)
    const [user, setUser, token, setToken] = useContext(Context);

    const handleSubmit = (e)=>{
        e.preventDefault()
        fetch(`/api/v1/users/${user.user.id}`,{
            method: 'PATCH',
            headers: {"Content-Type" : "application/json", Authorization: `Bearer ${token}`},
            body: JSON.stringify({
                password,
                name : 'Christie1234'
            })
        }).then(res => res.json()).then(data => console.log(data))
    }

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
                    Profile
            </Typography>
        </Box>

        <Box sx={{display:'flex', justifyContent: 'center', mt:3}}>
            <Box sx={{maxWidth:300}}>
                
                <form
                onSubmit={handleSubmit}
                autoComplete="off"
                noValidate
                >
                    <TextField 
                    onChange={(e)=>{setPassword(e.target.value)}}
                    label="Current Password"  
                    type="password"  
                    fullWidth
                    required 
                    sx={{marginBottom: 1}}  
                    error={passwordError}  
                    value={password}        
                    />
                    <TextField 
                    onChange={(e)=>{setNewPassword(e.target.value)}}
                    label="New Password"  
                    type="password"  
                    fullWidth
                    required 
                    sx={{marginBottom: 1}}  
                    error={newPasswordError}  
                    value={newPassword}        
                    />
                    <TextField 
                    onChange={(e)=>{setNewPasswordConfirmation(e.target.value)}}
                    label="Confirm New Password"  
                    type="password"  
                    fullWidth
                    required 
                    sx={{marginBottom: 1}}  
                    error={newPasswordConfirmationError}  
                    value={newPasswordConfirmation}        
                    />

                    {newPasswordConfirmationError? 
                        <Typography sx={{color:'red', mb: 1}}>Oops! Passwords need to match...</Typography>
                        : null
                    }
                    {updateConfirmation? 
                        <Typography sx={{color:'green', mb: 1}}>Password updated succesfully 😄</Typography>
                        : null
                    }

                    <Button
                    type="submit"
                    variant="contained"
                    endIcon={<KeyboardArrowRightIcon/>}
                    sx={{backgroundColor:'green'}}
                    >
                    Submit
                    </Button>

                </form>

            </Box>
        </Box>

    </>
    )

}