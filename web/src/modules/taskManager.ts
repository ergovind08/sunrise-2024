// import Task from "../model/Task";
// import { initialTasks } from "../utils/TaskList";

// let tasks: Task[] = [...initialTasks];

// export function initializeTasks() {
//   tasks = [...initialTasks];
// }

// export function getActiveTasks(): Task[] {
//   const firstIncompleteGroup = Math.min(
//     ...tasks.filter(task => !task.completed).map(task => task.group)
//   );
  
//   return tasks.filter(task => !task.completed && task.group === firstIncompleteGroup);
// }


// export function getCompletedTasks(): Task[] {
//   return tasks.filter((task) => task.completed);
// }

// export function getAllTasks(): Task[] {
//   return tasks;
// }

// export function completeTask(taskTitle: string): void {
//   const taskIndex = tasks.findIndex((task) => task.title === taskTitle);
//   if (taskIndex !== -1) {
//     tasks[taskIndex].completed = true;
//     const currentTaskGroup = tasks[taskIndex].group;

//     // Check if all tasks in the current group are completed
//     const allGroupTasksCompleted = tasks
//       .filter((task) => task.group === currentTaskGroup)
//       .every((task) => task.completed);

//     if (allGroupTasksCompleted) {
//       // If all tasks in the current group are completed, mark tasks in the next group as active
//       tasks
//         .filter((task) => task.group === currentTaskGroup + 1)
//         .forEach((task) => (task.completed = false));
//     }
//   }
// }

// export function createTask(
//   title: string,
//   description: string,
//   persona: string,
//   group: number
// ): void {
//   const newTask: Task = new Task(
//     tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1,
//     title,
//     description,
//     persona,
//     group,
//     false
//   );
//   tasks.push(newTask);
// }

// export function updateTask(
//   taskId: number,
//   updatedTask: Partial<Omit<Task, "id">>
// ): void {
//   const taskIndex = tasks.findIndex((task) => task.id === taskId);
//   if (taskIndex !== -1) {
//     tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
//   }
// }

// export function deleteTask(taskId: number): void {
//   tasks = tasks.filter((task) => task.id !== taskId);
// }


import Task from "@/model/Task";
import { initialTasks } from "@/utils/TaskList";

let tasks: Task[] = [...initialTasks];

export function initializeTasks() {
    if (tasks.length === 0) {
        tasks.push(new Task(1, "Initial Task", "This is the initial task", "Employee 1", 1, false));
    }
}

export function getActiveTasks(): Task[] {

    const firstIncompleteGroup = Math.min(
        ...tasks.filter(task => !task.completed).map(task => task.group)
    );
    return tasks.filter(task => !task.completed && task.group === firstIncompleteGroup);
}

export function getCompletedTasks(): Task[] {
    return tasks.filter(task => task.completed);
}

export function getAllTasks(): Task[] {
    return tasks;
}

export function completeTask(taskTitle: string): void {
    const task = tasks.find(task => task.title === taskTitle);
    if (task) {
        task.completed = true;

        const nextTaskInGroup = tasks.find(t => t.group === task.group && !t.completed);
        if (!nextTaskInGroup) {

            const nextGroupTasks = tasks.filter(t => t.group === task.group + 1 && !t.completed);
            if (nextGroupTasks.length > 0) {
                nextGroupTasks[0].completed = false;
            }
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
