import express, { Request, Response } from 'express';
import { UserProfile } from '../types';

const app = express();
app.use(express.json());

// In a real app, this would be in a database
let userProfile: UserProfile = {
  name: 'John Doe',
  trainingPlan: 'Monday: Chest and Triceps\nWednesday: Back and Biceps\nFriday: Legs and Shoulders',
};

app.get('/api/profile', (_req: Request, res: Response) => {
  res.json(userProfile);
});

app.put('/api/profile', (req: Request, res: Response) => {
  userProfile = req.body;
  res.json(userProfile);
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
}); 