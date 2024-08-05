import { NextApiRequest, NextApiResponse } from 'next';
import { deleteTask } from '@/modules/taskManager';

export default function handleDeleteTask(req: NextApiRequest, res: NextApiResponse, id: string) {
  const taskId = parseInt(id);
  deleteTask(taskId);
  res.status(200).json({ message: 'Task deleted' });
}
