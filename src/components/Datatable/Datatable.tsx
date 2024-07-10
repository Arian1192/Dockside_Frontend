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

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function DataTable<TData extends Ticket, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	console.log('DATA', data);
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

	console.log(table.getRowModel().rows.length);

	const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setFilterValue(value);
		setGlobalFilter(value);
	};

	const { selectedTicketId } = useTicketContext();

	return (
		<div>
			<div className="flex items-center py-4">
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
