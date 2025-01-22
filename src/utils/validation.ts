import { z } from 'zod';

export const messageSchema = z.object({
  id: z.string().uuid(),
  text: z.string().min(1).max(1000),
  isUser: z.boolean(),
  timestamp: z.date(),
});

export const shortcutActionSchema = z.object({
  id: z.string().uuid(),
  type: z.enum([
    'location',
    'time',
    'bluetooth',
    'wifi',
    'notification',
    'deviceControl',
  ]),
  parameters: z.record(z.unknown()),
  order: z.number().int().min(0),
});

export const shortcutSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().max(500),
  actions: z.array(shortcutActionSchema),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const userPreferencesSchema = z.object({
  theme: z.enum(['light', 'dark']),
  shortcuts: z.array(shortcutSchema),
});

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  preferences: userPreferencesSchema,
});