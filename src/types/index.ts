export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface Shortcut {
  id: string;
  name: string;
  description: string;
  actions: ShortcutAction[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ShortcutAction {
  id: string;
  type: ShortcutActionType;
  parameters: Record<string, unknown>;
  order: number;
}

export enum ShortcutActionType {
  Location = 'location',
  Time = 'time',
  Bluetooth = 'bluetooth',
  WiFi = 'wifi',
  Notification = 'notification',
  DeviceControl = 'deviceControl',
}

export interface User {
  id: string;
  email: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  shortcuts: Shortcut[];
}