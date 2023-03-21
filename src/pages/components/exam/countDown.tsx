import * as React from 'react';
import { useSelector } from 'react-redux';


export default function CountDown() {
    //@ts-ignore
    let examState= useSelector(state=>state.exam)
    let time= Number(examState.duration as string)
    
    const [min, setMin] = React.useState(--time)
    const [sec, setSec] = React.useState(60)
    
    React.useEffect(()=>{
        setMin(time)
    },[time])

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