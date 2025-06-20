import { VercelRequest, VercelResponse } from '@vercel/node';

function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({ message: 'Hello from Vercel API!' });
}

module.exports = handler; 