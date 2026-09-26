"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser, AuthContextType, UserRole } from '../types';
import { createClient } from '../lib/supabase/client';
import { User } from '@supabase/supabase-js';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function mapSupabaseUser(sbUser: User): AuthUser {
  const meta = sbUser.user_metadata || {};
  return {
    id: sbUser.id,
    name: meta.name || sbUser.email?.split('@')[0] || 'User',
    email: sbUser.email || '',
    phone: meta.phone || undefined,
    role: (meta.role as UserRole) || 'customer',
    businessName: meta.business_name || (meta.role === 'professional' ? `${meta.name || 'Studio'} Celebrations` : undefined),
    avatarUrl: meta.avatar_url || undefined,
  };
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const supabase = createClient();

  useEffect(() => {
    let mounted = true;

    // Check active session on initial load
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      if (session?.user) {
        setUser(mapSupabaseUser(session.user));
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    // Listen to auth state transitions
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      if (session?.user) {
        setUser(mapSupabaseUser(session.user));
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  const login = async (
    email: string,
    passwordOrRole?: string | UserRole,
    roleOrName?: UserRole | string,
    _name?: string
  ): Promise<{ error?: string } | void> => {
    setIsLoading(true);
    try {
      // Determine if 2nd param is password or role
      let password = 'Password123!';
      let role: UserRole = 'customer';

      if (passwordOrRole === 'customer' || passwordOrRole === 'professional') {
        role = passwordOrRole;
      } else if (typeof passwordOrRole === 'string' && passwordOrRole.length > 0) {
        password = passwordOrRole;
        if (roleOrName === 'customer' || roleOrName === 'professional') {
          role = roleOrName;
        }
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // If login failed, return error message
        return { error: error.message };
      }

      if (data.user) {
        setUser(mapSupabaseUser(data.user));
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed';
      return { error: message };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: {
    name: string;
    email: string;
    phone?: string;
    role: UserRole;
    businessName?: string;
    password?: string;
  }): Promise<{ error?: string } | void> => {
    setIsLoading(true);
    try {
      const password = userData.password || 'Password123!';
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password,
        options: {
          data: {
            name: userData.name,
            phone: userData.phone,
            role: userData.role,
            business_name: userData.businessName,
          },
        },
      });

      if (error) {
        return { error: error.message };
      }

      if (data.user) {
        setUser(mapSupabaseUser(data.user));
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Signup failed';
      return { error: message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
