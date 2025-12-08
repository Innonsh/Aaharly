import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { listenForTokenRefresh } from '../services/tokenManager';
import auth from '@react-native-firebase/auth';

interface AuthContextType {
    token: string;
    user: any | null;
    isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
    token: '',
    user: null,
    isAuthenticated: false,
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [token, setToken] = useState<string>('');
    const [user, setUser] = useState<any | null>(null);

    useEffect(() => {
        // Start listening for token changes
        console.log('🔄 Starting token refresh listener...');
        const unsubscribe = listenForTokenRefresh((newToken) => {
            console.log('🎫 Token updated:', newToken ? `${newToken.substring(0, 20)}...` : 'No token');
            setToken(newToken);
        });

        // Also listen for auth state changes to track user
        const authStateUnsubscribe = auth().onAuthStateChanged((currentUser) => {
            console.log('👤 Auth state changed:', currentUser ? currentUser.email || currentUser.phoneNumber : 'No user');
            setUser(currentUser);
        });

        // Cleanup listeners on unmount
        return () => {
            console.log('🛑 Cleaning up token listeners...');
            unsubscribe();
            authStateUnsubscribe();
        };
    }, []);

    const value = {
        token,
        user,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
