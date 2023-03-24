import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Question } from './components/exam/itemCard';
import CountDown from './components/exam/countDown';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { answerSlice } from '../store/slice/answerSlice';
import { useSubmitExamMutation } from '../store/api/answerApi';
import Alerts from './components/alert';


const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const mdTheme = createTheme();

function DashboardContent() {

    //@ts-ignore
    const examState = useSelector(state => state.exam)
    //@ts-ignore
    const stuState = useSelector(state => state.stu)
    //@ts-ignore
    const ansState = useSelector(state => state.answer)
    const [alert,setAlert]=React.useState(false)
    const dispatch = useDispatch()
    const [submit] = useSubmitExamMutation()
    const answerState = {
        identifier: examState.id,
        id: stuState.id,
        name: stuState.name,
        grade: stuState.grade,
        specialty: stuState.specialty,
        class: stuState.class,
        organizer: examState.organizer
    }
    React.useEffect(() => {
        dispatch(answerSlice.actions.init(answerState))
    }, [examState.id])

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={false}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >

                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            <CountDown />
                        </Typography>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            <Button
                                color="inherit" variant="text" size='large'
                                onClick={() => {
                                    submit(ansState).then((res) => {
                                        //@ts-ignore
                                        if (res.data.code === 200) {window.alert("提交成功")}else{{setAlert(!alert)}}
                                    })
                                }}>提交</Button>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={true}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                    </Toolbar>
                    <Divider />
                    <List component="nav" sx={{ marginLeft: 2 }}>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            marginTop={0}
                            sx={{ flexGrow: 1 }}
                        >
                            姓名：{stuState.name}
                        </Typography>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            marginTop={2}
                            sx={{ flexGrow: 1 }}
                        >
                            学号：{stuState.id}
                        </Typography>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            marginTop={2}
                            sx={{ flexGrow: 1 }}
                        >
                            科目：{examState.name}
                        </Typography>
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    {alert? <Alerts setAlert={setAlert} severity='error' children="提交失败" />:null}
                    {
                        //@ts-ignore
                        examState.content && examState.content.map((item, index) => { return <Question key={index} title={item.title} options={item.choice} number={index + 1} /> })
                    }
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function Examing() {
    return <DashboardContent />;
}