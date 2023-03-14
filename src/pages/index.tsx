import * as React from 'react'
import axios from 'axios'
import { Container, TextField, Button, Typography, Box, Avatar } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from 'react-router-dom'
import Alerts from './components/alert';


const theme = createTheme();

export default function SignIn() {

  const navigate = useNavigate()
  const [alert,setAlert]=React.useState(false)

  function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    axios(
      {
        method: "post",
        url: "http://localhost:8080/v1/admin/login",
        headers: { 'Content-Type': 'application/json' },
        data: {
          account: String(formData.get('account')),
          password: String(formData.get('password')),
        }
      }
    ).then((res) => {
      if (res.status === 200) {
        if (res.data.position === "admin" || "superAdmin") {
          navigate('/management')
        } else navigate('/exam')
      } else console.log("密码错误")
    }).catch((err) => {
      setAlert(!alert)
      console.log(err)
    })
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
