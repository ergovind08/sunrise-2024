import Task from "@/model/Task";
import { initialTasks } from "@/utils/TaskList";

let tasks: Task[] = [];

// Initialize tasks with the initial state
export function initializeTasks() {
    tasks = [...initialTasks];
}

export function getActiveTasks(): Task[] {

    const firstIncompleteGroup = Math.min(
        ...tasks.filter(task => !task.completed).map(task => task.group)
    );
    return tasks.filter(task => !task.completed && task.group === firstIncompleteGroup);}

export function getCompletedTasks(): Task[] {
    return tasks.filter(task => task.completed);
}

export function getAllTasks(): Task[] {
    return tasks;
}

export function completeTask(taskTitle: string): void {
    const task = tasks.find(task => task.title === taskTitle);
    if (!task || task.completed) return;

   
    const previousTasks = tasks.filter(t => t.group === task.group && t.id < task.id);
    if (!previousTasks.every(t => t.completed)) {
        throw new Error(`Cannot complete task "${taskTitle}" because not all previous tasks in Group ${task.group} are completed.`);
    }

    task.completed = true;

    
    const nextTaskInGroup = tasks.find(t => t.group === task.group && !t.completed);
    if (!nextTaskInGroup) {
        
        const nextGroupTasks = tasks.filter(t => t.group === task.group + 1 && !t.completed);
        if (nextGroupTasks.length > 0) {
            nextGroupTasks[0].completed = false;
        }
    }
}

export function createTask(title: string, description: string, persona: string, group: number): void {
    const newTask = new Task(tasks.length + 1, title, description, persona, group);
    tasks.push(newTask);
}

export function updateTask(taskId: number, updatedTask: Partial<Omit<Task, 'id'>>): void {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
    }
}

export function deleteTask(taskId: number): void {
    tasks = tasks.filter(task => task.id !== taskId);
}
