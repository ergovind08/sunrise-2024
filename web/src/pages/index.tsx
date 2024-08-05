import Head from "next/head";
import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Modal,
  TextField,
  Box,
  Grid,
} from "@mui/material";
import axios from "axios";
import Task from "@/model/Task";
import TaskCard from "@/components/TaskCard";
import styles from "./index.module.css";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]); 
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false); 
  const [newTask, setNewTask] = useState<{ title: string; description: string; persona: string; group: number }>({
    title: "",
    description: "",
    persona: "",
    group: 0,
  });

  const fetchTasks = async () => {
    try {
      const response = await axios.get<Task[]>("/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async () => {
    try {
      const response = await axios.post("/api/tasks", { ...newTask });
      setTasks([...tasks, response.data]);
      setIsModalVisible(false);
      setNewTask({ title: "", description: "", persona: "", group: 0 });
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleInProgress = async (task: Task) => {
    try {
     
      const updatedTask = { ...task, status: "inprogress" };
      await axios.put(`/api/tasks`, updatedTask);
      
      setTasks((prevTasks: Task[]) => 
        prevTasks.map((t) => (t.id === task.id ? updatedTask : t))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleComplete = async (task: Task) => {
    try {
     
      const updatedTask = { ...task, status: "completed" };
      await axios.put(`/api/tasks`, updatedTask);
     
      setTasks((prevTasks: Task[]) =>
        prevTasks.map((t) => (t.id === task.id ? updatedTask : t))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Task Board</title>
        <meta name="description" content="Task management application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Task Board
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={styles.main}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsModalVisible(true)}
          className={styles.createButton}
        >
          Create Task
        </Button>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="h5" className={styles.columnTitle}>
              To Do
            </Typography>
            {tasks
              .filter((task) => task.status === "todo")
              .map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onComplete={handleComplete}
                  onInProgress={handleInProgress}
                />
              ))}
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5" className={styles.columnTitle}>
              In Progress
            </Typography>
            {tasks
              .filter((task) => task.status === "inprogress")
              .map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onComplete={handleComplete}
                  onInProgress={handleInProgress}
                />
              ))}
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5" className={styles.columnTitle}>
              Completed
            </Typography>
            {tasks
              .filter((task) => task.status === "completed")
              .map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onComplete={handleComplete}
                  onInProgress={handleInProgress}
                />
              ))}
          </Grid>
        </Grid>

        <Modal open={isModalVisible} onClose={() => setIsModalVisible(false)}>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
      borderRadius: '8px',
    }}
  >
    <Typography variant="h6">Create Task</Typography>
    <TextField
      label="Title"
      value={newTask.title}
      onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Description"
      value={newTask.description}
      onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Persona"
      value={newTask.persona}
      onChange={(e) => setNewTask({ ...newTask, persona: e.target.value })}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Group"
      type="number"
      value={newTask.group}
      onChange={(e) => setNewTask({ ...newTask, group: Number(e.target.value) })}
      fullWidth
      margin="normal"
    />
    <Button
      variant="contained"
      color="primary"
      onClick={handleCreate}
      style={{ marginTop: '20px' }}
    >
      Create
    </Button>
  </Box>
</Modal>

      </main>
    </>
  );
}
