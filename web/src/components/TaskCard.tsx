// /src/components/TaskCard.tsx
import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import Task from '@/model/Task';

interface TaskCardProps {
  task: Task;
  onComplete: (task: Task) => void;
  onInProgress: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onComplete, onInProgress }) => {
  return (
    <Card style={{ marginBottom: '16px' }}>
      <CardContent>
        <Typography variant="h5">{task.title}</Typography>
        <Typography variant="body2">{task.description}</Typography>
        <div>
          {task.status === 'todo' && (
            <Button variant="outlined" onClick={() => onInProgress(task)}>Start</Button>
          )}
          {task.status === 'inprogress' && (
            <Button variant="outlined" color="success" onClick={() => onComplete(task)}>Complete</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
