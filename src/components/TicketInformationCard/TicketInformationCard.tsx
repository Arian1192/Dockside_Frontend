import React from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Ticket } from '@/types/Tickets';
import { Badge } from '../ui/badge';
import {} from '@midudev/tailwind-animations';
import { get } from 'http';
import {
	BicepsFlexed,
	CircleUserIcon,
	PersonStanding,
	User,
} from 'lucide-react';
const TicketInformationCard = ({ ticketInfo }: { ticketInfo: Ticket }) => {
	const {
		_id,
		title,
		description,
		status,
		priority,
		createdAt,
		updatedAt,
		closedAt,
		creatorId,
		agentId,
		categoryId,
		comments,
	} = ticketInfo;

	const getStatusClass = (status: string) => {
		switch (status) {
			case 'pending':
				return 'text-gray-500 text-md animate-pulse';
			case 'open':
				return 'text-blue-500 text-md animate-pulse'; // Asegúrate de definir la animación flash
			case 'assigned':
				return 'text-indigo-500 text-md animate-bounce';
			case 'in progress':
				return 'text-yellow-500 text-md animate-spin';
			case 'done':
				return 'text-green-500 text-md animate-fade-in';
			case 'elevated':
				return 'text-red-500 text-md animate-shake'; // Asegúrate de definir la animación shake
			default:
				return 'text-gray-500';
		}
	};

	const getPriorityClass = (priority: string) => {
		switch (priority) {
			case 'high':
				return 'text-red-500 text-md animate-heartbeat repeat-infinite';
			case 'medium':
				return 'text-yellow-500 text-md animate-bounce';
			case 'low':
				return 'text-green-500 text-md animate-fade-in';
			case 'critical':
				return 'text-purple-500 text-md animate-pulse'; // Define la animación si no existe
			default:
				return 'text-gray-500 text-md';
		}
	};

	return (
		<>
			<div className="w-full max-w-4xl mx-auto p-6 bg-secondary-foreground text-slate-100 rounded-lg shadow-lg">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="col-span-1 lg:col-span-2">
						<h1 className="text-3xl lg:text-4xl font-bold">
							{title}
						</h1>
						<p className="text-lg  mt-4">{description}</p>
						<div className="mt-4 col-span-1 bg-primary-foreground text-accent-foreground   rounded-lg p-6 shadow-lg space-y-6">
							<div className="flex items-center gap-3  ">
								<CircleUserIcon size={24} />
								<span className="font-medium">Creator:</span>
								<span className="">{creatorId.name}</span>
							</div>
							<div className="flex items-center gap-3 mt-4 ">
								<BicepsFlexed size={24} />
								<span className="font-medium">Agent:</span>
								<span className="">{`${
									agentId?.name ? agentId.name : 'Not assigned yet'
								}`}</span>
							</div>
						</div>
					</div>
					<div className="col-span-1 bg-primary-foreground text-accent-foreground rounded-lg p-6 shadow-lg space-y-1">
						<h2 className="text-2xl lg:text-3xl font-semibold  border-b pb-2">
							Details
						</h2>

						{/* Estado */}
						<div className="flex items-center">
							<p className="text-md ">Status:</p>
							<span
								className={`${getStatusClass(
									status
								)} ml-4 px-3 py-1 rounded-full text-sm font-semibold transition-all duration-3000  `}
							>
								{status.toUpperCase()}
							</span>
						</div>

						{/* Prioridad */}
						<div className="flex items-center">
							<p className="text-md ">Priority:</p>
							<span
								className={`${getPriorityClass(
									priority
								)} ml-4 px-3 py-1 rounded-full text-sm font-semibold transition-all duration-3000  `}
							>
								{priority.toUpperCase()}
							</span>
						</div>

						{/* Fecha de Creación */}
						<div className="flex items-center pb-1">
							<p className="text-md ">Created:</p>
							<p className=" lg:text-md ml-4">
								{new Date(createdAt).toLocaleDateString()}
							</p>
						</div>

						{/* Fecha de Actualización */}
						<div className="flex items-center">
							<p className="text-md ">Updated:</p>
							<p className="lg:text-md ml-4">
								{new Date(updatedAt).toLocaleDateString()}
							</p>
						</div>

						{/* Fecha de Cierre (opcional) */}
						{closedAt && (
							<div className="flex items-center">
								<p className="text-lg text-white">Closed:</p>
								<p className="text-base lg:text-lg text-gray-300 ml-4">
									{isOpen
										? new Date(closedAt).toLocaleDateString()
										: 'Not closed'}
								</p>
								<button
									className="ml-2 focus:outline-none "
									onClick={() => setIsOpen(!isOpen)}
								>
									{isOpen ? 'Hide' : 'Show'}
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default TicketInformationCard;
