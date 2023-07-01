import React, {useState} from "react";
import { TextField, Button, Typography } from "@mui/material";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


export default function PasswordReset({setForgotPassword}){
    const [resetCode, setResetCode] = useState('')
    const [codeError, setCodeError] = useState(false)
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [codeSent, setCodeSent] = useState(false)
    const [changePasswordWorked, setChangePasswordWorked] = useState(false) 
    const [changePasswordFailed, setChangePasswordFailed] = useState(false)


    const getResetCode = (e)=>{
        email? setEmailError(false) : setEmailError (true)
        e.preventDefault()
        if (email){
            fetch('/api/v1/password/reset/edit',{
                method: 'POST',
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({
                    email : email
                })
            }).then(data => data.json()).then(data => console.log(data))
            
        }
        setCodeSent(true)
    }

    const submitPasswordChange = (e)=>{
        e.preventDefault()

        if(email && resetCode && password){
            fetch('/api/v1/password/reset/update',{
                method: 'POST',
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({
                    email : email,
                    token : resetCode,
                    password : password 
                })
            }).then((r)=>{
                if(r.status == 200){
                    setEmail('')
                    setResetCode('')
                    setPassword('')
                    setChangePasswordWorked(true)
                    setChangePasswordFailed(false)
                    
                }
                else{
                    setChangePasswordFailed(true)
                    setChangePasswordWorked(false)
                }
                
            })
        }
    }



    return(
    <>
    {codeSent? 
        <>
            <Typography sx={{fontFamily:'monospace', color:'grey', mt:1, mb:1}}>
                Please check your email (including Junk folder) for your reset code. 
            </Typography>  
            <form onSubmit={submitPasswordChange}>

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

                <TextField 
                onChange={(e)=>{setResetCode(e.target.value)}}
                label="Reset Code"    
                fullWidth
                required 
                sx={{marginBottom: 1, '& .MuiFormLabel-root': {
                    fontFamily: 'monospace',
                    }}}  
                error={codeError}  
                value={resetCode}   
                color="success"     
                />

                <TextField 
                    onChange={(e)=>{setPassword(e.target.value)}}
                    label="New Password"  
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
        </> 
        
        :

        <>
            <Typography sx={{fontFamily:'monospace', color:'grey', mt:1, mb:1}}>
                    Forgetting is in our nature. Enter your email to get your password reset code:
            </Typography>
            <form 
            onSubmit={getResetCode}
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

            {changePasswordWorked? 
            <Typography
                sx={{fontFamily:'monospace', backgroundColor:'green', mt:1}}
            >
                Password Changed Successfully </Typography>
            : null}
            
            {changePasswordFailed? 
            <Typography
                sx={{fontFamily:'monospace', color:'red', mt:1, backgroundColor: 'lightgrey'}}
            >
                Something Went Wrong</Typography>
            :null}

            <Typography 
                sx={{fontFamily:'monospace', color:'green', mt:10, mb:1, textDecoration: 'underline', cursor: 'pointer'}}
                onClick={()=>setForgotPassword(false)}    
            >
                Back to Login
            </Typography>

    </>
)
}