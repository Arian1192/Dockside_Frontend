'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { JwtPayload } from 'jwt-decode';

export type AuthContextType = {
	user: JwtPayload | null;
	setUser: React.Dispatch<React.SetStateAction<JwtPayload | null>>;
};

const IAuthContextState = {
	user: null,
	setUser: () => {},
};

const AuthContext = createContext<AuthContextType>(IAuthContextState);

interface IProps {
	children: React.ReactNode;
}

export function AuthContextProvider({ children }: IProps) {
	const [user, setUser] = useState<JwtPayload | null>(null);
	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuthContext() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuthContext must be used within a AuthContextProvider');
	}
	return context;
}
