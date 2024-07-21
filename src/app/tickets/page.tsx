'use client';
import { useEffect, useState } from 'react';
import TicketTable from '../../types/Tickets';
import { jwtDecode } from 'jwt-decode';
import { useAuthContext } from '@/_context/AuthContext';

export default function Page() {
	const [domLoaded, setDomLoaded] = useState(false);
	const { user, setUser } = useAuthContext();
	useEffect(() => {
		const token = localStorage.getItem('access_token');
		if (!token) {
			return setUser(null);
		} else {
			const decodedToken = jwtDecode(token);
			setUser(decodedToken);
		}
		setDomLoaded(true);
	}, []);

	return domLoaded ? <TicketTable /> : <p>Loading...</p>;
}
