'use client';
import { getAllDepartments } from '@/_utils/apiDepartments';
import { ReusableDataTable } from '@/components/ReusableDataTable/ReusableDataTable';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

export default function Page() {
	const columns = [
		{
			accessorKey: '_id',
			cell: (info: { getValue: () => any }) => info.getValue(),
			enableColumnFilter: true,
			header: 'ID',
		},
		{
			accessorKey: 'name',
			cell: (info: { getValue: () => any }) => info.getValue(),
			enableColumnFilter: true,
			header: 'Name',
		},
		{
			accessorKey: 'description',
			cell: (info: { getValue: () => any }) => info.getValue(),
			enableColumnFilter: true,
			header: 'Description',
		},
		// {
		// 	accesorKey: 'actions',
		// 	cell: (row: any) => {
		// 		const id = row.original;
		// 		return (
		// 			<Dialog>
		// 				<DialogTrigger>
		// 					<Button variant="menu">Delete</Button>

		// 				</DialogTrigger>
		// 				<DialogContent>
		// 					<DialogHeader>
		// 						<DialogTitle>Are you absolutely sure?</DialogTitle>
		// 						<DialogDescription>
		// 							This action cannot be undone. This will permanently delete
		// 							your account and remove your data from our servers.
		// 						</DialogDescription>
		// 					</DialogHeader>
		// 				</DialogContent>
		// 			</Dialog>
		// 		);
		// 	},
		// 	enableColumnFilter: false,
		// 	header: 'Actions',
		// },
	];

	return (
		<div>
			<ReusableDataTable
				_path="/departments"
				_columns={columns}
				_apiFunc={getAllDepartments}
				page={true}
				filter={true}
				sort={true}
			/>
		</div>
	);
}
