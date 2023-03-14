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

export interface singleChoiceQuestionT {
    "title": string,
    "options": [string, string, string, string, string | null]
}

export function SingleChoiceQuestion(props:singleChoiceQuestionT) {

    return (
        <Card sx={{ minWidth: 275, marginTop: 2, marginLeft: 5, marginRight: 5 }}>

            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    第 1 题
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
                        {props.options.map((item, index) => {
                            return (<FormControlLabel value={index} control={<Radio />} label={item} key={index} />)
                        })}
                    </RadioGroup>
                </FormControl>
            </CardContent>
            <CardActions>
                <Button size="small" variant='outlined'>保存</Button>
            </CardActions>
        </Card>
    );
}
