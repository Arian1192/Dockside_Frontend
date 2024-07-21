'use client';
// Objective 1: Create a context to manage the socket connection

import io from 'socket.io-client';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { getPrivateIp } from '@/_utils/getPrivateIp';
import { useRouter } from 'next/navigation';

export type SocketContextType = {
	socket: any;
	ip: string | null;
};

const ISocketContextState = {
	socket: null,
	ip: null,
};

const SocketContext = createContext<SocketContextType>(ISocketContextState);

interface IProps {
	children: React.ReactNode;
}

export function SocketContextProvider({ children }: IProps) {
	const router = useRouter();
	const [socket, setSocket] = useState<any>(null);
	const [ip, setIp] = useState<string | null>(null);

	useEffect(() => {
		const newSocket = io(
			'http://192.168.1.133:3001' || 'http://localhost:3001'
		);
		setSocket(newSocket);

		newSocket.on('wantToControl', (data: any) => {
			console.log('wantToControl', data);
			toast('Admin wants to control your screen', {
				position: 'top-right',
				description: 'Click to accept',
				duration: 5000,
				action: {
					label: 'Accept',
					onClick: () => {
						newSocket.emit('acceptControl');
					},
				},
			});
		});

		newSocket.on('controlAccepted', (data: any) => {
			setIp(data.ip);
			router.push('/canvas');
		});

		return () => {
			newSocket.off('wantToControl');
			newSocket.off('controlAccepted');
			newSocket.close();
		};
	}, []);

	return (
		<SocketContext.Provider value={{ socket, ip }}>
			{children}
		</SocketContext.Provider>
	);
}

export function useSocketContext() {
	const context = useContext(SocketContext);
	if (!context) {
		throw new Error(
			'useSocketContext must be used within a SocketContextProvider'
		);
	}
	return context;
}
