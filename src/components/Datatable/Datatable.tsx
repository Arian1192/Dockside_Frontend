'use client';
import React, { useEffect, useState } from 'react';
import { useTicketContext } from '@/_context/TicketContext';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerTrigger,
} from '../ui/drawer';
import { Button } from '../ui/button';
import Stepper from '../Stepper/Stepper';
import CardTicket from '../CardTicket/CardTicket';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAuthContext } from '@/_context/AuthContext';
import { ReusableDataTable } from '../ReusableDataTable/ReusableDataTable';
import { getAllTickets, getAllTicketsByCreatorId } from '@/_utils/apiTickets';
import { columns } from '@/types/Tickets';
import { jwtDecode } from 'jwt-decode';
const TicketFormSchema = z.object({
	title: z.string().min(2),
	description: z.string().min(2),
	department: z.string().min(2),
	priority: z.string().min(2),
});

export function DataTable() {
	const form = useForm<z.infer<typeof TicketFormSchema>>({
		resolver: zodResolver(TicketFormSchema),
	});

	const { selectedTicketId } = useTicketContext();
	const [currentStep, setCurrentStep] = useState<number>(0);

	const { user, setUser } = useAuthContext();
	const role = user?.role.toString();

		
	const isAdminUserGettingTickets = () => {
		if (user) {
			if (role === 'super_admin' || role === 'admin') {
				return getAllTickets();
			} else {
				return getAllTicketsByCreatorId(user?.sub?.toString());
			}
		}
	};

	useEffect(() => {
		const token = localStorage.getItem('access_token');
		if (!token) {
			return setUser(null);
		} else {
			const decodedToken = jwtDecode(token);
			setUser(decodedToken);
		}
	}, []);

	return (
		<div className="w-full -z-10">
			<ReusableDataTable
				_path={
					user?.role === 'admin' || user?.role === 'super_admin'
						? '/tickets'
						: `/tickets/id/${user?.sub}`
				}
				_columns={columns}
				_apiFunc={isAdminUserGettingTickets}
				_params={user?.role === 'admin' || user?.role === 'super_admin' ? {} : { id: user?.sub }}
				page
				filter
				sort
				pageSize={12}
			>
				<div className="flex items-center gap-2 mr-2 ">
					<Drawer>
						<DrawerTrigger asChild className="ml-4">
							<Button variant="activate">Create Ticket</Button>
						</DrawerTrigger>
						<DrawerContent>
							<div className="mx-auto w-full max-w-sm">
								<Stepper
									currentStep={currentStep}
									setCurrentStep={setCurrentStep}
									numberOfSteps={4}
									form={form}
								>
									<div className="w-full h-64 mt-5 mb-10">
										<CardTicket
											currentStep={currentStep}
											form={form}
											departments={user?.departments}
										/>
									</div>
								</Stepper>
								<DrawerFooter>
									<DrawerClose asChild>
										<Button variant="outline">Close</Button>
									</DrawerClose>
								</DrawerFooter>
							</div>
						</DrawerContent>
					</Drawer>
				</div>
			</ReusableDataTable>
		</div>
	);
}
