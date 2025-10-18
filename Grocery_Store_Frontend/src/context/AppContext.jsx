import React, { createContext, useContext, useState, useEffect } from 'react';
import { deliveryAPI } from '../services/deliveryAPI';
import { useAuthStore } from '../store/useAuthStore';

const AppContext = createContext(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  // console.log(user);
  

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        if (!user || !user.roleId) return;
        const [profileData, statsData] = await Promise.all([
          deliveryAPI.getProfile(user.roleId),
          deliveryAPI.getStats()
        ]);
        setProfile(profileData);
        setStats(statsData);
      } catch (error) {
        console.error('Failed to load initial data:', error);
      }
    };

    loadInitialData();
  }, [user]);

  const updateProfile = (updatedProfile) => {
    if (profile) {
      setProfile({ ...profile, ...updatedProfile });
    }
  };

  const toggleAvailability = async () => {
    if (profile) {
      const newStatus = !profile.isOnline;
      try {
        await deliveryAPI.toggleAvailability(user.roleId,newStatus);
        setProfile({ ...profile, isOnline: newStatus });
      } catch (error) {
        console.error('Failed to toggle availability:', error);
      }
    }
  };

  const refreshStats = async () => {
    try {
      const statsData = await deliveryAPI.getStats();
      setStats(statsData);
    } catch (error) {
      console.error('Failed to refresh stats:', error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        profile,
        stats,
        sidebarOpen,
        setSidebarOpen,
        updateProfile,
        toggleAvailability,
        refreshStats
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
