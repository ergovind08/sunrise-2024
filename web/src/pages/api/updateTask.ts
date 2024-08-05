// pages/api/updateTask.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { updateTask } from '@/modules/taskManager';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, updatedTask } = req.body;
  updateTask(id, updatedTask);
  res.status(200).json({ message: 'Task updated successfully' });
}
