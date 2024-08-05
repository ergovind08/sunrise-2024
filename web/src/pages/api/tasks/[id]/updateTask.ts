import { NextApiRequest, NextApiResponse } from 'next';
import { updateTask, completeTask } from '@/modules/taskManager';

export default function handlePutTask(req: NextApiRequest, res: NextApiResponse, id: string) {
  const taskId = parseInt(id);
  const { title, description, persona, group, completed } = req.body;

  if (completed) {
    completeTask(title);
  } else {
    updateTask(taskId, { title, description, persona, group });
  }

  res.status(200).json({ message: 'Task updated' });
}
