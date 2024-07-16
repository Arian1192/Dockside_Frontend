import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
	PaginationState,
	SortingState,
	getSortedRowModel,
	ColumnFiltersState,
	getFilteredRowModel,
} from '@tanstack/react-table';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '../ui/pagination';
import { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ArrowUpDown } from 'lucide-react';

interface IReusableDataTableProps<TData, TValue> {
	_path: string;
	_columns: ColumnDef<TData, TValue>[];
	_apiFunc: Function;
	page?: boolean;
	filter?: boolean;
	sort?: boolean;
	pageSize?: number;
}

export function ReusableDataTable<TData, TValue>({
	_path,
	_columns,
	_apiFunc,
	page = false,
	filter = false,
	sort = false,
	pageSize = 12,
}: IReusableDataTableProps<TData, TValue>) {
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: pageSize,
	});
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [filterValue, setFilterValue] = useState('');
	const [globalFilter, setGlobalFilter] = useState('');

	const { data, isLoading } = useQuery({
		queryKey: [_path],
		queryFn: () => _apiFunc(),
	});
	console.log(data?.data);

	const table = useReactTable({
		data: data?.data || [],
		columns: _columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: page ? getPaginationRowModel() : undefined,
		getFilteredRowModel: filter ? getFilteredRowModel() : undefined,
		getSortedRowModel: sort ? getSortedRowModel() : undefined,
		onSortingChange: sort ? setSorting : undefined,
		onColumnFiltersChange: filter ? setColumnFilters : undefined,
		onGlobalFilterChange: filter ? setGlobalFilter : undefined,
		rowCount: page ? data?.data.length : undefined,
		state: {
			pagination,
			sorting,
			columnFilters,
			globalFilter,
		},
		onPaginationChange: page ? setPagination : undefined,
	});

	const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		console.log(value);
		setFilterValue(value);
		setGlobalFilter(value);
	};

	console.log(table.getPageCount());

	//TODO: REFACTOR CONDITIONAL RENDERING OF FILTER AND PAGINATION
	return (
		<div className=" p-3">
			<div className="w-full flex justify-evenly items-center mb-12">
				{filter && (
					<Input
						placeholder="Filter"
						value={filterValue}
						onChange={handleFilterChange}
						className="max-w-sm"
					/>
				)}
				{page && (
					<Pagination className="justify-end">
						{table.getPageCount() > 1 && (
							<>
								<PaginationPrevious
									onClick={() =>
										setPagination({
											...pagination,
											pageIndex: Math.max(pagination.pageIndex - 1, 0),
										})
									}
								/>
								<PaginationContent>
									{Array.from({ length: table.getPageCount() }).map(
										(_, index) => (
											<PaginationItem key={index}>
												<PaginationLink
													onClick={() =>
														setPagination({
															...pagination,
															pageIndex: index,
														})
													}
													isActive={index === pagination.pageIndex}
													className={
														index === pagination.pageIndex
															? 'bg-primary/20'
															: ''
													}
												>
													{index + 1}
												</PaginationLink>
											</PaginationItem>
										)
									)}
								</PaginationContent>
								<PaginationNext
									onClick={() =>
										setPagination({
											...pagination,
											pageIndex: Math.min(
												pagination.pageIndex + 1,
												table.getPageCount() - 1
											),
										})
									}
								/>
							</>
						)}
					</Pagination>
				)}
			</div>
			<Table className="border mb-2">
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								const HeaderContent = header.column.columnDef.header;
								return (
									<TableHead key={header.id}>
										{sort === true ? (
											<Button
												variant="ghost"
												onClick={() =>
													header.column.toggleSorting(
														header.column.getIsSorted() === 'asc'
													)
												}
											>
												{typeof HeaderContent === 'function' ? (
													<HeaderContent {...header.getContext()} />
												) : (
													HeaderContent
												)}
												<ArrowUpDown className="ml-2 h-4 w-4" />
											</Button>
										) : typeof HeaderContent === 'function' ? (
											<HeaderContent {...header.getContext()} />
										) : (
											HeaderContent
										)}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows.length > 0 ? (
						table.getRowModel().rows.map((row) => (
							<TableRow key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id} align="left" >
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={_columns.length} className="h-24 text-center">
								No results found.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
