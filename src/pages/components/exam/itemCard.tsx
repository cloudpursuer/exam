import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField/TextField';

export interface QuestionT {
    "number":number,
    "title": string,
    "options": string[]|null
}

export function Question(props:QuestionT) {

    if(props.options){
        return(
            <Card sx={{ minWidth: 275, marginTop: 2, marginLeft: 5, marginRight: 5 }}>

            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    第 {props.number} 题
                </Typography>
                <Typography variant="h6" component="div">
                    {props.title}
                </Typography>
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label"/>
                    <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="none"
                        name="radio-buttons-group"
                    >
                        {props.options?.map((item, index) => {
                            return (<FormControlLabel value={index} control={<Radio />} label={item} key={index} />)
                        })}
                    </RadioGroup>
                </FormControl>
            </CardContent>
            <CardActions>
                <Button size="small" variant='outlined' sx={{marginLeft:1}}>保存</Button>
            </CardActions>
        </Card>
        )
    }else{
        return(
            <Card sx={{ minWidth: 275, marginTop: 2, marginLeft: 5, marginRight: 5 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    第 {props.number} 题
                </Typography>
                <Typography variant="h6" component="div">
                    {props.title}
                </Typography>
                <TextField size='medium' multiline rows={5} fullWidth />
            <CardActions>
                <Button size="small" variant='outlined' sx={{marginBottom:-3,marginLeft:-1}} >保存</Button>
            </CardActions>
            </CardContent>
        </Card>
        )
    }
}
