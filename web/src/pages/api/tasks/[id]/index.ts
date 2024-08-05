import { NextApiRequest, NextApiResponse } from 'next';
import handlePutTask from './updateTask';
import handleDeleteTask from './deleteTask';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  switch (req.method) {
    case 'PUT':
      return handlePutTask(req, res, id as string);
    case 'DELETE':
      return handleDeleteTask(req, res, id as string);
    default:
      res.setHeader('Allow', ['PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
