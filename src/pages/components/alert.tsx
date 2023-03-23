import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

interface Iprops {
    setAlert:(argu0:boolean)=>void
    severity:"error"|"warning"|"info"|"success"
    children:string
}

type ComponentProps = React.PropsWithChildren<{children: string}>;

const Alerts =(e:Iprops,{children}:ComponentProps)=> {
  return (
    <Stack sx={{ width: '100%',zIndex:100 }}>
      <Alert onClose={()=>{e.setAlert(false)}} severity={e.severity}>
        <AlertTitle>{children}</AlertTitle>
      </Alert>
    </Stack>
  );
}
export default Alerts