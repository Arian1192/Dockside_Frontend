'use client';
import { useEffect, useState } from 'react';
import TicketTable from '../../types/Tickets';
import { useQuery } from '@tanstack/react-query';
import {getAllTicketsByCreatorId } from '@/_utils/apiTickets';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jwtDecode } from 'jwt-decode';
import { useAuthContext } from '@/_context/AuthContext';

export default function Page() {
	const [domLoaded, setDomLoaded] = useState(false);

	const { data: tickets, isLoading } = useQuery({
		queryKey: ['tickets'],
		queryFn: getAllTicketsByCreatorId,
	});

	const { setUser } = useAuthContext(); // NO ESTA FUNCIONANDO BIEN

	useEffect(() => {
		const token = localStorage.getItem('access_token');
		if (!token) {
			// Redirect to login page
		} else {
			const decodedToken = jwtDecode(token);
			setUser(decodedToken);
		}
		setDomLoaded(true);
	}, []);

	return (
		<>
			{domLoaded && (
				<>
					<TicketTable tickets={tickets?.data} isLoading={isLoading} />
				</>
			)}
		</>
	);
}
