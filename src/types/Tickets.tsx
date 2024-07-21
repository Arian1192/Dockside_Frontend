'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { DataTable } from '@/components/Datatable/Datatable';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTicketContext } from '@/_context/TicketContext';
import { Badge } from '@/components/ui/badge';
import { useSocketContext } from '@/_context/SocketContext';

export type Ticket = {
	_id: string;
	title: string;
	description: string;
	status: Status;
	priority: PRIORITY;
	createdAt: Date;
	updatedAt: Date;
	closedAt: Date;
	creatorId: {
		_id: string;
		name: string;
		email: string;
		role: string;
	};
	agentId: string;
	categoryId: string;
	comments: Array<{
		_id: string;
		content: string;
		createdAt: Date;
		updatedAt: Date;
	}>;
};

enum Status {
	OPEN = 'open',
	IN_PROGRESS = 'in progress',
	DONE = 'done',
	CLOSED = 'closed',
}

enum PRIORITY {
	LOW = 'low',
	MEDIUM = 'medium',
	HIGH = 'high',
}

export const columns = [
	{
		accessorKey: '_id',
		enableColumnFilter: true,
		cell: (info: { getValue: () => any }) => info.getValue(),
		header: ({ column }: any) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					ID
				</Button>
			);
		},
	},
	{
		accessorKey: 'title',
		enableColumnFilter: true,
		cell: (info: { getValue: () => any }) => info.getValue(),
		header: ({ column }: any) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Title
				</Button>
			);
		},
	},
	{
		accessorKey: 'status',
		enableColumnFilter: true,
		cell: (info: { getValue: () => any }) => info.getValue(),
		header: ({ column }: any) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Status
				</Button>
			);
		},
	},
	{
		accessorKey: 'priority',
		enableColumnFilter: true,
		cell: ({ row }: any) => (
			<Badge
				variant={row.original.priority}
				className="text-xs text-primary-foreground justify-center items-center w-/4 xl:w-2/4 2xl:w-1/4"
			>
				{row.original.priority}
			</Badge>
		),
		header: ({ column }: any) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Priority
				</Button>
			);
		},
	},
	{
		accessorKey: 'action',
		header: 'Actions',
		id: 'actions',
		cell: ({ row }: any) => {
			const ticket = row.original;
			const { setSelectedTicketId } = useTicketContext();
			const { socket } = useSocketContext();
			const handleRequestConnection = (email: string) => {
				console.log('Requesting connection');
				socket?.emit('requestControl', {
					data: email,
				});
			};
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0 outline-none">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() => {
								console.log(ticket);
								navigator.clipboard.writeText(ticket._id);
							}}
						>
							Copy ticket id
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => {
								console.log(ticket);
								handleRequestConnection(ticket.creatorId.email);
							}}
						>
							Request Connection
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => {
								setSelectedTicketId(ticket._id);
							}}
						>
							View Ticket
						</DropdownMenuItem>
						<DropdownMenuItem>View Comments About Ticket</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

const TicketTable = () => {
	return <DataTable />;
};

export default TicketTable;
