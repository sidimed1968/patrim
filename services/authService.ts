import { User, Tab } from '../types';

export const hasPermission = (user: User, permission: string): boolean => {
  if (user.role === 'SUPER_ADMIN') return true;

  const permissions: Record<string, string[]> = {
    'view_users': ['SUPER_ADMIN'],
    'manage_users': ['SUPER_ADMIN'],
    'manage_settings': ['SUPER_ADMIN'],
    'view_all_assets': ['SUPER_ADMIN', 'MINISTRY_ADMIN'],
    'edit_assets': ['SUPER_ADMIN', 'MINISTRY_ADMIN', 'EDITOR'],
    'view_assets': ['SUPER_ADMIN', 'MINISTRY_ADMIN', 'EDITOR', 'VIEWER'],
  };

  return permissions[permission]?.includes(user.role) || false;
};

export const canAccessTab = (user: User, tab: Tab): boolean => {
  if (user.role === 'SUPER_ADMIN') return true;

  const tabPermissions: Record<Tab, string[]> = {
    [Tab.DASHBOARD]: ['SUPER_ADMIN', 'MINISTRY_ADMIN', 'EDITOR', 'VIEWER'],
    [Tab.DIRECTORY]: ['SUPER_ADMIN', 'MINISTRY_ADMIN', 'EDITOR', 'VIEWER'],
    [Tab.MAP]: ['SUPER_ADMIN', 'MINISTRY_ADMIN', 'EDITOR', 'VIEWER'],
    [Tab.DECLARATION]: ['SUPER_ADMIN', 'MINISTRY_ADMIN', 'EDITOR'],
    [Tab.ASSISTANT]: ['SUPER_ADMIN', 'MINISTRY_ADMIN', 'EDITOR', 'VIEWER'],
    [Tab.USERS]: ['SUPER_ADMIN'],
    [Tab.SETTINGS]: ['SUPER_ADMIN'],
  };

  return tabPermissions[tab]?.includes(user.role) || false;
};

const DEMO_USERS: User[] = [
  {
    id: 'demo-super',
    username: 'admin',
    password: 'admin123',
    fullName: 'Administrateur Système',
    role: 'SUPER_ADMIN',
  },
  {
    id: 'demo-ministry',
    username: 'finances',
    password: 'finances123',
    fullName: 'M. Ahmed (Finances)',
    role: 'MINISTRY_ADMIN',
    ministryId: '00000000-0000-0000-0000-000000000001',
  },
  {
    id: 'demo-editor',
    username: 'sante',
    password: 'sante123',
    fullName: 'Dr. Fatimetou (Santé)',
    role: 'EDITOR',
    ministryId: '00000000-0000-0000-0000-000000000002',
  },
];

export const authenticateUser = (username: string, password: string): User | null => {
  const user = DEMO_USERS.find(u => u.username === username && u.password === password);
  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  }
  return null;
};
