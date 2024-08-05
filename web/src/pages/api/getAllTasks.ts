// pages/api/getAllTasks.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllTasks } from '@/modules/taskManager';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(getAllTasks());
}
