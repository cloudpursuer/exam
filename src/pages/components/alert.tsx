import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

interface Iprops {
    setAlert:(argu0:boolean)=>void
    children:string
}

type ComponentProps = React.PropsWithChildren<{children: string}>;

const Alerts =(action:Iprops,{children}:ComponentProps)=> {
  return (
    <Stack sx={{ width: '100%',zIndex:100 }}>
      <Alert onClose={()=>{action.setAlert(false)}} severity="error">
        <AlertTitle>出错了</AlertTitle>
        {children}
      </Alert>
    </Stack>
  );
}
export default Alerts