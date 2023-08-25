import { Box, Button, TextField } from '@mui/material'
import React,{useState} from 'react'
import { useTheme } from '../Context/ThemeContext';
import { auth } from '../firebaseConfig';
import { toast } from 'react-toastify';
import errorMapping from '../Utils/errorMapping';

const SignupForm = ({handleClose}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {theme}=useTheme();

    const handleSubmit=()=>{
        if(!email || !password || !confirmPassword){
            toast.warning('Fill all the fields', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            return;
        }
        if(password!==confirmPassword){
            toast.warning('Passwords do not match', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            return;
        }
        auth.createUserWithEmailAndPassword(email,password).then((res)=>{
            toast.success('user created', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
                handleClose();
        }).catch((err)=>{
            toast.error(errorMapping[err.code]||'unable to create user, try again', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        })

    }
  return (
    <Box
    p={3}
    style={{
        display:'flex',
        flexDirection:'column',
        gap:'20px',
        }
       }>
        <TextField
        variant='outlined'
        type='email'
        label='Enter Email'
        onChange={e=>setEmail(e.target.value)}
        InputLabelProps={{style:{color:theme.textColor}}}
        InputProps={{style:{color:theme.textColor}}}/>
        <TextField
        variant='outlined'
        type='password'
        label='Enter Password'
        onChange={e=>setPassword(e.target.value)}
        InputLabelProps={{style:{color:theme.textColor}}}
        InputProps={{style:{color:theme.textColor}}}/>
        <TextField
        variant='outlined'
        type='password'
        label='Enter confirm Password'
        onChange={e=>setConfirmPassword(e.target.value)}
        InputLabelProps={{style:{color:theme.textColor}}}
        InputProps={{style:{color:theme.textColor}}}/>
        <Button
        variant='contained'
        size='large'
        style={{backgroundColor:theme.textColor, color:theme.backgroundColor}}
        onClick={handleSubmit}>Signup</Button>
    </Box>
  )
}

export default SignupForm;