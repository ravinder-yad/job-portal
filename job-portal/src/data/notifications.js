import { FiBell, FiBriefcase, FiHeart, FiSettings, FiTarget, FiUserPlus, FiShield, FiDatabase } from 'react-icons/fi';

export const notificationFilters = ['All', 'Unread', 'Jobs', 'Applications', 'System', 'Admin Alerts'];

export const notificationStyles = {
  Jobs: {
    icon: FiBriefcase,
    iconClass: 'bg-blue-50 text-blue-600',
  },
  Saved: {
    icon: FiHeart,
    iconClass: 'bg-rose-50 text-rose-600',
  },
  Applications: {
    icon: FiTarget,
    iconClass: 'bg-emerald-50 text-emerald-600',
  },
  System: {
    icon: FiSettings,
    iconClass: 'bg-slate-100 text-slate-600',
  },
  Security: {
    icon: FiShield,
    iconClass: 'bg-amber-50 text-amber-600',
  },
  Users: {
    icon: FiUserPlus,
    iconClass: 'bg-purple-50 text-purple-600',
  },
  Database: {
    icon: FiDatabase,
    iconClass: 'bg-indigo-50 text-indigo-600',
  },
  Default: {
    icon: FiBell,
    iconClass: 'bg-indigo-50 text-indigo-600',
  },
};

export const notificationGroups = [
  {
    label: 'Today',
    items: [
      {
        id: 1,
        type: 'Jobs',
        role: 'user',
        title: 'New React Developer job posted',
        message: 'TechNova added a remote React Developer role that matches your profile.',
        time: '2 min ago',
        action: 'View Job',
        unread: true,
      },
      {
        id: 201,
        type: 'Users',
        role: 'admin',
        title: 'New Recruiter Registered',
        message: 'A new recruiter from Google has just signed up and pending verification.',
        time: '5 min ago',
        action: 'Verify Now',
        unread: true,
      },
      {
        id: 2,
        type: 'Applications',
        role: 'user',
        title: 'Your application was viewed',
        message: 'Google reviewed your Frontend Engineer application.',
        time: '35 min ago',
        action: 'Check Status',
        unread: true,
      },
    ],
  },
  {
    label: 'Yesterday',
    items: [
      {
        id: 202,
        type: 'Security',
        role: 'admin',
        title: 'Suspicious Login Attempt',
        message: 'Multiple failed login attempts detected for account admin@jobify.com.',
        time: 'Yesterday',
        action: 'Review Logs',
        unread: true,
      },
      {
        id: 3,
        type: 'Saved',
        role: 'user',
        title: 'Saved job closing soon',
        message: 'Senior UI Engineer at DesignHub closes in 2 days.',
        time: 'Yesterday',
        action: 'Apply Now',
        unread: true,
      },
      {
        id: 4,
        type: 'System',
        role: 'all',
        title: 'Profile updated successfully',
        message: 'Your profile strength increased after adding new skills.',
        time: 'Yesterday',
        action: 'View Profile',
        unread: false,
      },
    ],
  },
  {
    label: 'Earlier',
    items: [
      {
        id: 203,
        type: 'Database',
        role: 'admin',
        title: 'Weekly Backup Complete',
        message: 'System database successfully backed up to cloud storage.',
        time: '3 days ago',
        action: 'Check Health',
        unread: false,
      },
      {
        id: 5,
        type: 'Applications',
        role: 'user',
        title: 'Interview invite received',
        message: 'DataFlow invited you for the Node.js Engineer interview round.',
        time: '3 days ago',
        action: 'View Details',
        unread: false,
      },
    ],
  },
];

export const getAllNotifications = () => notificationGroups.flatMap((group) => group.items);
