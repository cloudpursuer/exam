import * as React from 'react'
import { Container, TextField, Button, Typography, Box, Avatar } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from 'react-router-dom'
import Alerts from './components/alert';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useAdminLoginMutation as useAdminLogin } from '../store/adminApi';
import { useStuLoginMutation as useStuLogin } from '../store/studentApi';
import { adminSlice } from '../store/adminSlice';
import { useDispatch } from 'react-redux';

const theme = createTheme();

export default function SignIn() {

  const navigate = useNavigate()
  const [alert,setAlert]=React.useState(false)
  const [isAdmin,setIsAdmin]=React.useState(false)
  const[adminLogin,{isSuccess:adminLoginSucess,data:adminLoginData}]=useAdminLogin()
  const[stuLogin,{isSuccess:stuLoginSucess}]=useStuLogin()
  const dispatch = useDispatch()
  
  function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const body ={
      "account":formData.get("account") as string,
      "password":formData.get("password") as string
    }
    if (isAdmin) {
      adminLogin(body)
      if (adminLoginSucess) {
        if (adminLoginData.data.position == "admin" || "superAdmin") {
          dispatch(adminSlice.actions.login(adminLoginData.data.token))
          navigate("/management")
        }
      }else {setAlert(!alert)}
    }else{
      stuLogin(body)
      if(stuLoginSucess){
         navigate("/exam")
      }else {setAlert(!alert)}
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            登录
          </Typography>
          <Box component="form" onSubmit={login} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="account"
              label="账号"
              name="account"
              autoComplete="off"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="密码"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel control={<Checkbox checked={isAdmin} onClick={()=>setIsAdmin(!isAdmin)}/>} label="我是管理员" />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              登录
            </Button>
            {alert ? <Alerts setAlert={setAlert} children="请检查账号或密码"/>: null}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
