import { User } from '../types';

// In a real app, passwords should be hashed. For this demo, we use plaintext.
export const users: User[] = [
  { id: '1', name: 'admin', password: 'admin', role: 'Admin' },
  { id: '2', name: 'supervisor', password: 'supervisor', role: 'Supervisor' },
  { id: '3', name: 'operator', password: 'operator', role: 'Operator' },
];