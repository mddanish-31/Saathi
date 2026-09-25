"use client";

import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';
import { EnquiryProvider } from '../context/EnquiryContext';

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <EnquiryProvider>
          {children}
        </EnquiryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};
