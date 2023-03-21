import * as React from 'react'
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, Avatar } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'
import Alerts from './components/alert';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { adminSlice } from '../store/adminSlice';
import { useDispatch } from 'react-redux';
import { stuSlice } from '../store/stuSlice';

const theme = createTheme();

export default function SignIn() {

  const navigate = useNavigate()
  const [alert, setAlert] = React.useState(false)
  const [isAdmin, setIsAdmin] = React.useState(false)
  const dispatch = useDispatch()

  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    let url = isAdmin ? "http://localhost:8080/v1/admin/login" : "http://localhost:8080/v1/student/login"
    axios(
      {
        method: "post",
        url: url,
        headers: { 'Content-Type': 'application/json' },
        data: {
          account: String(formData.get('account')),
          password: String(formData.get('password')),
        }
      }
    ).then((res) => {
      if (res.data.code === 200) {
        if (res.data.data.position && (res.data.data.position === "admin" || "superAdmin")) {
          dispatch(adminSlice.actions.login(res.data.data))
          navigate('/management')
        } else {
          dispatch(stuSlice.actions.login(res.data.data))
          navigate('/exam')
        }
      }
    }).catch((err) => {
      setAlert(!alert)
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
            <FormControlLabel control={<Checkbox checked={isAdmin} onClick={() => setIsAdmin(!isAdmin)} />} label="我是管理员" />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              登录
            </Button>
            {alert ? <Alerts setAlert={setAlert} children="请检查账号或密码" /> : null}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
