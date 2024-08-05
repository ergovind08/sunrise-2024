// pages/api/createTask.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { createTask } from '@/modules/taskManager';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { title, description, persona, group } = req.body;
  createTask(title, description, persona, group);
  res.status(200).json({ message: 'Task created successfully' });
}
