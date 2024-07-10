'use client';
import { useEffect, useState } from 'react';
import TicketTable from '../../types/Tickets';
import { useQuery } from '@tanstack/react-query';
import { getAllTickets } from '@/_utils/apiTickets';

export default function Page() {
	const [domLoaded, setDomLoaded] = useState(false);

	const { data: tickets, isLoading } = useQuery({
		queryKey: ['tickets'],
		queryFn: getAllTickets,
	});

	console.log(tickets?.data);
	useEffect(() => {
		setDomLoaded(true);
	}, []);

	return <>{domLoaded && <TicketTable tickets={tickets?.data} isLoading={isLoading} />}</>;
}
