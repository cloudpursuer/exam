import * as React from 'react'
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { useGetExamContentMutation, useGetRecentExamQuery } from '../store/examApi';
import { useDispatch } from 'react-redux';
import { examSlice } from '../store/examSlice';
import { useNavigate } from 'react-router-dom';
import SimpleBackdrop from './components/backdrop';



const theme = createTheme();

export default function Exam() {

    const [course, setCourse] = React.useState('');
    //@ts-ignore
    const { data, isFetching, isSuccess } = useGetRecentExamQuery()
    const [getContent] = useGetExamContentMutation()
    const dispatch = useDispatch()
    const navigate=useNavigate()

    const handleChange = (event: SelectChangeEvent) => {
        setCourse(event.target.value as string);
    };
    const submit = (event: any) => {
        event.preventDefault()
        getContent({"id":course}).then((res) => {
            //@ts-ignore
        res.data.data[0] && dispatch(examSlice.actions.init(res.data.data[0]))
            
        }).catch((e)=>{console.log(e)})
        navigate("/examing")
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
                    {isFetching && <SimpleBackdrop/>}
                    {isSuccess && data.data[0] && <>
                        <Typography component="h1" variant="h5">
                            请选择考试科目
                        </Typography>
                        <FormControl fullWidth sx={{ marginTop: 8 }}>
                            <InputLabel id="course-select-label">考试科目</InputLabel>
                            <Select
                                labelId="course-select-label"
                                id="course-select"
                                value={course}
                                label="Course"
                                onChange={handleChange}
                            >
                                {//@ts-ignore 
                                    data.data[0].map((item, _) => <MenuItem value={item.id} key={item.id} onClick={() => setCourse(item.id)}>{item.name}</MenuItem>)
                                }
                            </Select>
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 4, mb: 2 }}
                            onClick={submit}
                        >
                            进入考试
                        </Button>
                    </>}
                    <Box>
                        {isSuccess &&(!data.data[0])&&<Typography sx={{marginTop:20}} variant="h4" component="h3">当前没有考试</Typography>}
                    </Box>

                </Box>
            </Container>
        </ThemeProvider>
    );
}
