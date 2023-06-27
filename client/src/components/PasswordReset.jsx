import React, {useState} from "react";
import { TextField, Button, Typography } from "@mui/material";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


export default function PasswordReset(){
    const [resetCode, setResetCode] = useState(false)
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(false)


    const getResetCode = (e)=>{
        e.preventDefault()
        // if (email){
        //     fetch('/api/v1/password/reset/edit',{
        //         method: 'POST',
        //         headers: {"Content-Type" : "application/json"},
        //         body: JSON.stringify({
        //             email : email
        //         })
        //     }).then(data => data.json()).then(data => console.log(data))
        //     setResetCode(true)
        // }
        // setResetCode(true)
    }

    const submitPasswordChange = (e)=>{
        e.preventDefault()
        
    }

    return(
    <>
    {resetCode? 
        <>
            <Typography sx={{fontFamily:'monospace', color:'grey', mt:1, mb:1}}>
                Please check your email (including Junk folder) for your reset code. 
            </Typography>  
            <form onClick={submitPasswordChange}>
            <TextField 
            onChange={(e)=>{setEmail(e.target.value)}}
            label="Email"  
            placeholder={email}  
            fullWidth
            required 
            sx={{marginBottom: 1, '& .MuiFormLabel-root': {
                fontFamily: 'monospace',
                }}}  
            error={emailError}  
            value={email}   
            color="success"     
        />
            
            
            
            </form>  
        </> 
        
        :

        <>
        <Typography sx={{fontFamily:'monospace', color:'grey', mt:1, mb:1}}>
                Forgetting is in our nature. Enter your email to get your password reset code:
        </Typography>
        <form 
        onClick={getResetCode}
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

        </>
    }
    </>
)
}