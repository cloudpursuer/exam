import * as React from 'react';

interface time {
    "time": number
}

export default function CountDown({ time }: time) {

    const [min, setMin] = React.useState(--time)
    const [sec, setSec] = React.useState(60)

    const timer = () => {
        let time = sec
        setTimeout(() => { setSec(--time) }, 1000)
    }
    timer()

    React.useEffect(() => {
        let minute = min
        if (sec === 0) {
            setSec(59)
            setMin(minute-1)
        }
    })

    if(sec<10){
        return(<>{min} : 0{sec}</>)
    }else return (<>{min} : {sec}</>)
    
}