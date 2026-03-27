import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserData } from '../types';

interface UserContextType {
  user: UserData | null;
  registerUser: (data: UserData) => void;
  isRegistered: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(() => {
    const saved = localStorage.getItem('user_data');
    return saved ? JSON.parse(saved) : null;
  });

  const registerUser = (data: UserData) => {
    setUser(data);
    localStorage.setItem('user_data', JSON.stringify(data));
  };

  const isRegistered = !!user;

  return (
    <UserContext.Provider value={{ user, registerUser, isRegistered }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};
