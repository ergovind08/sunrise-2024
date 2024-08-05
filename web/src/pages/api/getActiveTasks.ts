// pages/api/getActiveTasks.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { getActiveTasks } from '@/modules/taskManager';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(getActiveTasks());
}
