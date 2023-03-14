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
import {SingleChoiceQuestion,singleChoiceQuestionT} from './components/exam/itemCard';
import CountDown from './components/exam/countDown';


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

    const question1: singleChoiceQuestionT = {
        "title": "各种蛋白质平均含氮量约为",
        "options": ["0.6%", "6%", "16%", "26%", "36%"]
    }

    const time = 100

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
                            <CountDown time={time} /> 
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
                            姓名：张三
                        </Typography>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            marginTop={2}
                            sx={{ flexGrow: 1 }}
                        >
                            学号：12010110086
                        </Typography>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            marginTop={2}
                            sx={{ flexGrow: 1 }}
                        >
                            科目：生物化学
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
                    {/*题目 */}
                    <SingleChoiceQuestion title={question1.title} options={question1.options}/>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function Examing() {
    return <DashboardContent />;
}