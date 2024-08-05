import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import TaskList from '@/components/taskList';

const Home: React.FC = () => {
  return (
    <div className='min-h-[100vh] bg-neutral-950 '>
      <AppBar position="static" className='bg-slate-900 border-r-slate-900'> 
        <Toolbar>
          
<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Board
          </Typography>
        </Toolbar>
      </AppBar>
      <TaskList  />
    </div>
  );
};

export default Home;
