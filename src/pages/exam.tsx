import * as React from 'react'
import axios from 'axios'
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';


const theme = createTheme();

export default function Exam() {

    const [course, setCourse] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
    setCourse(event.target.value as string);
  };

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
                    <Typography component="h1" variant="h5">
                        请选择考试科目
                    </Typography>
                        <FormControl fullWidth sx={{marginTop:8}}>
                            <InputLabel id="course-select-label">考试科目</InputLabel>
                            <Select
                                labelId="course-select-label"
                                id="course-select"
                                value={course}
                                label="Course"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>局部解剖学</MenuItem>
                                <MenuItem value={20}>高等数学</MenuItem>
                                <MenuItem value={30}>中国近代史纲要</MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 4, mb: 2 }}
                        >
                            进入考试
                        </Button>
                    </Box>
            </Container>
        </ThemeProvider>
    );
}
