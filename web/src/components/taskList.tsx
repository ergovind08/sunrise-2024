import React, { useEffect, useState } from 'react';
import Task from '@/model/Task';
import { Card, CardContent, CardActions, Typography, Box, Button, Grid } from '@mui/material';
import { IoMdCheckmark } from "react-icons/io";
import { AiOutlineClockCircle } from "react-icons/ai"; // Upcoming icon
import Lottie from 'react-lottie';
import firecrackerAnimation from '@/animations/animation.json'; // Import your firecracker animation file

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [currentGroup, setCurrentGroup] = useState<number>(1);

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

    const cardStyle = {
        border: '2px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        background: 'rgba(20, 20, 20, 0.7)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
        },
    };

    const sectionStyle = {
        border: '1px dotted rgba(255, 255, 255, 0.09)',
        borderRadius: '30px',
        padding: '16px',
        background: 'rgba(20, 20, 20, 0.5)',
    };

    const allTasksCompleted = completedTasks.length === tasks.length;

    return (
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="flex-start" mt={4} pb={8} className="bg-neutral-960">
            {/* Pending tasks */}
            <Box width={{ xs: '100%', md: '30%' }} px={4} sx={sectionStyle} mb={{ xs: 2, md: 0 }}>
                <Typography variant="h5" gutterBottom className="text-stone-300">
                    To-Do <span className="px-2 py-1 rounded-full bg-gray-600">{incompleteTasks.length}</span>
                </Typography>
                {incompleteTasks.length > 0 ? (
                    <Grid container spacing={2}>
                        {incompleteTasks.map((task) => (
                            <Grid item xs={12} sm={6} key={task.id}>
                                <Card sx={cardStyle}>
                                    <CardContent>
                                        <Typography variant="h6" className="font-bold text-blue-500">{task.title}</Typography>
                                        <Typography variant="body2" className="text-white">{task.description}</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button 
                                            color="primary" 
                                            className="flex items-center" 
                                            startIcon={<AiOutlineClockCircle />} 
                                        >
                                            Start
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : null}
            </Box>

            {/* Vertical Line */}
            <Box 
                sx={{
                    width: '2px',
                    backgroundColor: 'white',
                    height: 'auto', // Set height to auto to fill available space
                    borderStyle: 'dotted',
                    margin: '0 16px',
                }} 
            />

            {/* In progress tasks */}
            <Box width={{ xs: '100%', md: '30%' }} px={2} sx={sectionStyle} mb={{ xs: 2, md: 0 }}>
                <Typography variant="h5" gutterBottom className="text-stone-300">
                    In Progress <span className="px-2 py-1 rounded-full bg-blue-800">{filteredTasks.length}</span>
                </Typography>
                {allTasksCompleted ? (
                    <Box textAlign="center">
                        <Typography variant="h6" className="text-green-500">
                            Hurray! You have completed all tasks!
                        </Typography>
                        <Box mt={2}>
                            <Lottie
                                options={{
                                    loop: true,
                                    autoplay: true,
                                    animationData: firecrackerAnimation,
                                    rendererSettings: {
                                        preserveAspectRatio: 'xMidYMid slice',
                                    },
                                }}
                                height={200}
                                width={200}
                            />
                        </Box>
                    </Box>
                ) : (
                    <>
                        {filteredTasks.length > 0 ? (
                            <Grid container spacing={2}>
                                {filteredTasks.map((task) => (
                                    <Grid item xs={12} sm={6} key={task.id}>
                                        <Card sx={{ ...cardStyle, borderColor: 'paleyellow' }}>
                                            <CardContent>
                                                <Typography variant="h6" className="font-bold text-yellow-600">{task.title}</Typography>
                                                <Typography variant="body2" className="text-gray-400">{task.description}</Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button 
                                                    variant="contained" 
                                                    color="warning" 
                                                    className="flex items-center" 
                                                    startIcon={<IoMdCheckmark />}
                                                    onClick={() => markAsCompleted(task.id)}
                                                >
                                                    Done
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        ) : null}
                    </>
                )}
            </Box>

            {/* Vertical Line */}
            <Box 
                sx={{
                    width: '2px',
                    backgroundColor: 'white',
                    height: 'auto', // Set height to auto to fill available space
                    borderStyle: 'dotted',
                    margin: '0 16px',
                }} 
            />

            {/* Completed tasks */}
            <Box width={{ xs: '100%', md: '30%' }} px={2} sx={sectionStyle}>
                <Typography variant="h5" gutterBottom className="text-stone-200">
                    Completed Tasks <span className="px-2 py-1 rounded-full bg-green-600">{completedTasks.length}</span>
                </Typography>
                {completedTasks.length > 0 ? (
                    <Grid container spacing={2}>
                        {completedTasks.map((task) => (
                            <Grid item xs={12} sm={6} key={task.id}>
                                <Card sx={{ ...cardStyle, borderColor: 'green' }}>
                                    <CardContent>
                                        <Typography variant="h6" className="font-bold text-green-600">{task.title}</Typography>
                                        <Typography variant="body2" className="text-gray-400">{task.description}</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button 
                                            color="success" 
                                            className="flex items-center" 
                                        >
                                            Completed
                                        </Button>
                                    </CardActions>
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
