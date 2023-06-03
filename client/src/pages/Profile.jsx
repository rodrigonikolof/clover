import React, {useState} from "react";
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

    const handleSubmit = ()=>{
        console.log('clicked')
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
                    color="primary"
                    variant="contained"
                    endIcon={<KeyboardArrowRightIcon/>}
                    >
                    Submit
                    </Button>

                </form>

            </Box>
        </Box>

    </>
    )

}