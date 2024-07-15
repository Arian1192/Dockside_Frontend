'use client';
import { useEffect, useState } from 'react';
import TicketTable from '../../types/Tickets';
import { useQuery } from '@tanstack/react-query';
import { getAllTickets } from '@/_utils/apiTickets';
import { z } from 'zod';
import Stepper from '@/components/Stepper/Stepper';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CardTicket from '@/components/CardTicket/CardTicket';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { jwtDecode } from 'jwt-decode';
import { useAuthContext } from '@/_context/AuthContext';

const TicketFormSchema = z.object({
	title: z.string().min(2),
	description: z.string().min(2),
	department: z.string().min(2),
	priority: z.string().min(2),
});

export default function Page() {
	const [domLoaded, setDomLoaded] = useState(false);
	const [currentStep, setCurrentStep] = useState<number>(0);

	const form = useForm<z.infer<typeof TicketFormSchema>>({
		resolver: zodResolver(TicketFormSchema),
	});
	const { data: tickets, isLoading } = useQuery({
		queryKey: ['tickets'],
		queryFn: getAllTickets,
	});

	const { setUser, user } = useAuthContext(); // NO ESTA FUNCIONANDO BIEN

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
					<Drawer>
						<DrawerTrigger asChild>
							<Button variant="outline">Create Ticket</Button>
						</DrawerTrigger>
						<DrawerContent>
							<div className="mx-auto w-full max-w-sm">
								<Stepper
									currentStep={currentStep}
									setCurrentStep={setCurrentStep}
									numberOfSteps={4}
									form={form}
								>
									<div className="w-full h-64 mt-5">
										<CardTicket currentStep={currentStep} form={form} departments={user?.departments} />
									</div>
									z
								</Stepper>

								<DrawerFooter>
									<DrawerClose asChild>
										<Button variant="outline">Close</Button>
									</DrawerClose>
								</DrawerFooter>
							</div>
						</DrawerContent>
					</Drawer>
					<TicketTable tickets={tickets?.data} isLoading={isLoading} />
				</>
			)}
		</>
	);
}
