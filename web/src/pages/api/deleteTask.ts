// pages/api/deleteTask.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteTask } from '@/modules/taskManager';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body;
  deleteTask(id);
  res.status(200).json({ message: 'Task deleted successfully' });
}
