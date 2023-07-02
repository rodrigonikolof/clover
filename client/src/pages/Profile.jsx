import React, {useState, useContext, useEffect} from "react";
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
    const [name, setName] = useState(user.user.name)
    const [email, setEmail] = useState(user.user.email)
    const [updated, setUpdated] = useState(false)
    const [failed, setFailed] = useState(false)

    const handleSubmit = (e)=>{
        e.preventDefault()
        if(user && email && password){
            fetch(`/api/v1/users/${user.user.id}`,{
                method: 'PATCH',
                headers: {"Content-Type" : "application/json", Authorization: `Bearer ${token}`},
                body: JSON.stringify({
                    password,
                    name : name, 
                    email : email
                })
            }).then((r) =>{
                if(r.ok){
                    setUpdated(true)
                }
                else{
                    setFailed(true)
                }
            } )
        }
    }

    useEffect(()=>{
        setTimeout(hideMessage, 4000)
    }, [failed])

    useEffect(()=>{
        setTimeout(hideMessage, 4000)
    }, [updated])

    const hideMessage = ()=>{
        setFailed(false)
        setUpdated(false)
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

             {user? 

                <form
                onSubmit={handleSubmit}
                autoComplete="off"
                noValidate
                >
                    <TextField 
                    onChange={(e)=>{setName(e.target.value)}}
                    label="Name"  
                    // type="password"  
                    // placeholder={user.user.name}
                    fullWidth
                    required 
                    sx={{marginBottom: 1}}  
                    // error={passwordError}  
                    defaultValue={user.user.name}   
                    color="success"     
                    />
                    <TextField 
                    onChange={(e)=>{setEmail(e.target.value)}}
                    label="Email"  
                    fullWidth
                    required 
                    sx={{marginBottom: 1}}   
                    defaultValue={user.user.email}   
                    color="success"     
                    />
                    <TextField 
                    onChange={(e)=>{setPassword(e.target.value)}}
                    label="Current Password"  
                    type="password"  
                    fullWidth
                    required 
                    sx={{marginBottom: 1}}  
                    error={passwordError}  
                    value={password}   
                    color="success"     
                    />
                    {/* <TextField 
                    onChange={(e)=>{setNewPassword(e.target.value)}}
                    label="New Password"  
                    type="password"  
                    fullWidth
                    required
                    sx={{marginBottom: 1}}  
                    error={newPasswordError}  
                    value={newPassword}  
                    color="success"       
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
                    color="success"       
                    />  */}
                    

                    {/* {newPasswordConfirmationError? 
                        <Typography sx={{color:'red', mb: 1}}>Oops! Passwords need to match...</Typography>
                        : null
                    }
                    {updateConfirmation? 
                        <Typography sx={{color:'green', mb: 1}}>Password updated succesfully 😄</Typography>
                        : null
                    } */}

                    <Button
                    type="submit"
                    variant="contained"
                    endIcon={<KeyboardArrowRightIcon/>}
                    sx={{backgroundColor:'green'}}
                    color="success" 
                    >
                    Submit
                    </Button>

                </form>

                : 
                null}
                {updated? 
                    <Typography
                    sx={{backgroundColor:'green', mt:1}}
                    >
                        Details Updated Successfully </Typography>
                    : null}

                {failed? 
                    <Typography
                    sx={{ color:'red', mt:1, backgroundColor: 'lightgrey'}}
                    >
                        Something Went Wrong</Typography>
                    :null}

            </Box>
        </Box>

    
    </>
    )

}