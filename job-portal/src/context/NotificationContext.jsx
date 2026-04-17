import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { getAllNotifications } from '../data/notifications';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Initialize notifications from static data
  useEffect(() => {
    if (isAuthenticated && user) {
      const initial = getAllNotifications().filter(n => n.role === 'all' || n.role === user.role);
      setNotifications(initial);
      setUnreadCount(initial.filter(n => n.unread).length);
    } else {
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [isAuthenticated, user]);

  const addNotification = useCallback((newNotif) => {
    setNotifications(prev => [newNotif, ...prev]);
    setUnreadCount(prev => prev + 1);
  }, []);

  const markAsRead = useCallback((id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
    setUnreadCount(prev => Math.max(0, prev - 1));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
    setUnreadCount(0);
  }, []);

  // Live Simulation: Add a new notification after 45 seconds of session
  useEffect(() => {
    if (isAuthenticated && user) {
      const timer = setTimeout(() => {
        const liveNotif = {
          id: Date.now(),
          type: user.role === 'admin' ? 'Security' : 'Jobs',
          role: user.role,
          title: user.role === 'admin' ? 'Live System Alert' : 'Priority Job Match',
          message: user.role === 'admin' ? 'A new login attempt from a new device was verified.' : 'A high-matching role at SpaceX was just posted for you!',
          time: 'Just now',
          action: 'View Details',
          unread: true,
          isLive: true
        };
        addNotification(liveNotif);
      }, 45000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, user, addNotification]);

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, addNotification, markAsRead, clearAll }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotifications must be used within a NotificationProvider');
  return context;
};
