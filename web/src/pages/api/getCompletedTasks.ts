// pages/api/getCompletedTasks.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { getCompletedTasks } from '@/modules/taskManager';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(getCompletedTasks());
}
