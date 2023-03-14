import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import ArticleIcon from '@mui/icons-material/Article';


interface Iprops{
  setState:(argu0:number)=>void
}

export const MainListItems =(action:Iprops)=> {
  return(
    <React.Fragment>
  <ListItemButton onClick={()=>{action.setState(1)}}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="考试状况"/>
    </ListItemButton>
    <ListItemButton onClick={()=>{action.setState(2)}}>
      <ListItemIcon>
        <ReceiptLongIcon />
      </ListItemIcon>
      <ListItemText primary="考试管理" />
    </ListItemButton>
    <ListItemButton onClick={()=>{action.setState(3)}}>
      <ListItemIcon>
        <SchoolIcon />
      </ListItemIcon>
      <ListItemText primary="学生管理" />
    </ListItemButton>
    <ListItemButton onClick={()=>{action.setState(4)}}>
      <ListItemIcon>
      <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="监考人员管理" />
    </ListItemButton>
    <ListItemButton onClick={()=>{action.setState(5)}}>
      <ListItemIcon>
        <FactCheckIcon />
      </ListItemIcon>
      <ListItemText primary="试卷批改" />
    </ListItemButton>
  </React.Fragment>
  )
};

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      已完结的考试
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <ArticleIcon />
      </ListItemIcon>
      <ListItemText secondary="xx月xx日xx考场xx科目" sx={{marginInline:-3}}/>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
      <ArticleIcon />
      </ListItemIcon>
      <ListItemText secondary="xx月xx日xx考场xx科目" sx={{marginInline:-3}}/>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ArticleIcon />
      </ListItemIcon>
      <ListItemText secondary="xx月xx日xx考场xx科目" sx={{marginInline:-3}}/>
    </ListItemButton>
  </React.Fragment>
);