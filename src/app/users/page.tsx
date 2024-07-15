'use client';
import { getAllUsers } from '@/_utils/apiUsers';
import { ReusableDataTable } from '@/components/ReusableDataTable/ReusableDataTable';

export default function Page() {
	const columns = [
		// {
		// 	accessorKey: '_id',
		// 	cell: (info: { getValue: () => any }) => info.getValue(),
		// 	enableColumnFilter: true,
		// 	header: 'ID',
		// },
		{
			accessorKey: 'name',
			cell: (info: { getValue: () => any }) => info.getValue(),
			enableColumnFilter: true,
			header: 'Name',
		},
		{
			accessorKey: 'email',
			cell: (info: { getValue: () => any }) => info.getValue(),
			enableColumnFilter: true,
			header: 'Email',
		},
		{
			accessorKey: 'role',
			cell: (info: { getValue: () => any }) => info.getValue(),
			enableColumnFilter: true,
			header: 'Role',
		},
	];

	return (
		<>
			<div>
				<ReusableDataTable
					_path="/users"
					_columns={columns}
					_apiFunc={getAllUsers}
					page={true}
					filter={true}
					sort={true}
				/>
			</div>
		</>
	);
}
