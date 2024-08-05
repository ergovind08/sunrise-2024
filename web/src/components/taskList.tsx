import React, { useEffect, useState } from 'react';
import Task from '@/model/Task';
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Box,
    Button,
    Grid,
} from '@mui/material';
import { IoMdCheckmark } from "react-icons/io";

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [currentGroup, setCurrentGroup] = useState<number>(1); // Default to group 1

    useEffect(() => {
        fetch('/api/tasks')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch tasks');
                }
                return res.json();
            })
            .then((data) => {
                setTasks(data);
                updateCurrentGroup(data);
            })
            .catch((error) => setError(error.message));
    }, []);

    const markAsCompleted = (taskId: number) => {
        fetch(`/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: true }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to update task');
                }
                return res.json();
            })
            .then(() => {
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task.id === taskId ? { ...task, completed: true } : task
                    )
                );
                updateCurrentGroup(tasks);
            })
            .catch((error) => setError(error.message));
    };

    const updateCurrentGroup = (tasks: Task[]) => {
        const completedGroups = new Set<number>();
        tasks.forEach(task => {
            if (task.completed) {
                completedGroups.add(task.group);
            }
        });

        let nextGroup = 1;
        while (completedGroups.has(nextGroup)) {
            nextGroup++;
        }

        setCurrentGroup(nextGroup);
    };

    const incompleteTasks = tasks.filter((task) => !task.completed);
    const completedTasks = tasks.filter((task) => task.completed);
    const filteredTasks = tasks.filter(
        (task) => !task.completed && task.group === currentGroup
    );

    if (error) {
        return <Typography color="error">Error: {error}</Typography>;
    }

    return (
        <Box display="flex" justifyContent="space-evenly" mt={4} pb={8}>
            {/* Pending tasks */}
            <Box width="30%" px={2}>
                <Typography variant="h5" gutterBottom>
                    To-Do <span style={{ padding: '2px 8px', borderRadius: '12px', backgroundColor: '#cfd8dc' }}>{incompleteTasks.length}</span>
                </Typography>
                {incompleteTasks.length > 0 ? (
                    <Grid container spacing={2}>
                        {incompleteTasks.map((task) => (
                            <Grid item xs={6} key={task.id}>
                                <Card elevation={3}>
                                    <CardContent>
                                        <Typography variant="h6">Task {task.id}</Typography>
                                        <Typography variant="body2" color="textSecondary">{task.title}</Typography>
                                        <Typography variant="body2" color="textSecondary">{task.description}</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button disabled={task.completed}  startIcon={<IoMdCheckmark />} >
                                            Done
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : null}
            </Box>

            {/* In progress tasks */}
            <Box width="30%" px={2}>
                <Typography variant="h5" gutterBottom>
                    In Progress <span style={{ padding: '2px 8px', borderRadius: '12px', backgroundColor: '#bbdefb' }}>{filteredTasks.length}</span>
                </Typography>
                {filteredTasks.length > 0 ? (
                    <Grid container spacing={2}>
                        {filteredTasks.map((task) => (
                            <Grid item xs={6} key={task.id}>
                                <Card elevation={3}>
                                    <CardContent>
                                        <Typography variant="h6">Task {task.id}</Typography>
                                        <Typography variant="body2" color="textSecondary">{task.title}</Typography>
                                        <Typography variant="body2" color="textSecondary">{task.description}</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button variant="contained" color="primary" startIcon={<IoMdCheckmark />} onClick={() => markAsCompleted(task.id)}>
                                            Done
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : null}
            </Box>

            {/* Completed tasks */}
            <Box width="30%" px={2}>
                <Typography variant="h5" gutterBottom>
                    Completed Tasks <span style={{ padding: '2px 8px', borderRadius: '12px', backgroundColor: '#a5d6a7' }}>{completedTasks.length}</span>
                </Typography>
                {completedTasks.length > 0 ? (
                    <Grid container spacing={2}>
                        {completedTasks.map((task) => (
                            <Grid item xs={6} key={task.id}>
                                <Card elevation={3}>
                                    <CardContent>
                                        <Typography variant="h6">Task {task.id}</Typography>
                                        <Typography variant="body2" color="textSecondary">{task.title}</Typography>
                                        <Typography variant="body2" color="textSecondary">{task.description}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : null}
            </Box>
        </Box>
    );
};

export default TaskList;
