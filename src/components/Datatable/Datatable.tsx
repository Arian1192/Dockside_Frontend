'use client';
import {
	ColumnDef,
	ColumnFiltersState,
	getFilteredRowModel,
	flexRender,
	getCoreRowModel,
	useReactTable,
	SortingState,
	getSortedRowModel,
} from '@tanstack/react-table';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import React, { useState } from 'react';
import { useTicketContext } from '@/_context/TicketContext';
import TicketInformationCard from '../TicketInformationCard/TicketInformationCard';
import { Input } from '@/components/ui/input';
import { Ticket } from '@/types/Tickets';
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

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

const TicketFormSchema = z.object({
	title: z.string().min(2),
	description: z.string().min(2),
	department: z.string().min(2),
	priority: z.string().min(2),
});

export function DataTable<TData extends Ticket, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [filterValue, setFilterValue] = useState('');
	const [globalFilter, setGlobalFilter] = useState('');

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onGlobalFilterChange: setGlobalFilter,
		state: {
			sorting,
			columnFilters,
			globalFilter,
		},
	});

	const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setFilterValue(value);
		setGlobalFilter(value);
	};
	const form = useForm<z.infer<typeof TicketFormSchema>>({
		resolver: zodResolver(TicketFormSchema),
	});
	const { user } = useAuthContext();

	const { selectedTicketId } = useTicketContext();
	const [currentStep, setCurrentStep] = useState<number>(0);
	return (
		<div className="w-full">
			<div className="flex items-center py-4 gap-2">
				<Drawer>
					<DrawerTrigger asChild className='ml-4'>
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
								<div className="w-full h-64 mt-5">
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
				<Input
					placeholder="Filter by ID, title, status, or priority ..."
					value={filterValue}
					onChange={handleFilterChange}
					className="ml-2 max-w-sm"
				/>
			</div>
			<div className="rounded-none border-y">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext()
											  )}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows.length ? (
							table.getRowModel().rows.map((row) => (
								<React.Fragment key={row.id}>
									<TableRow data-state={row.getIsSelected() && 'selected'}>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</TableCell>
										))}
									</TableRow>
									{selectedTicketId === row.original._id && (
										<TableRow>
											<TableCell colSpan={columns.length}>
												<div className="ticket-details">
													<TicketInformationCard ticketInfo={row.original} />
													<div>
														Comments:
														{row.original.comments.map((comment: any) => (
															<div key={comment._id}>
																<p>{comment.content}</p>
																<p>
																	Created At:{' '}
																	{new Date(comment.createdAt).toLocaleString()}
																</p>
																<p>
																	Updated At:{' '}
																	{new Date(comment.updatedAt).toLocaleString()}
																</p>
															</div>
														))}
													</div>
												</div>
											</TableCell>
										</TableRow>
									)}
								</React.Fragment>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
