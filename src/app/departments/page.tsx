'use client';
import { getAllDepartments } from '@/_utils/apiDepartments';
import { ReusableDataTable } from '@/components/ReusableDataTable/ReusableDataTable';
import { Button } from '@/components/ui/button';

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
