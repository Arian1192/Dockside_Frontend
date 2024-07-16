import React from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from '@/components/ui/select';
import { Textarea } from '../ui/textarea';

const Title = ({ currentStep }: { currentStep: number }) => {
	switch (currentStep) {
		case 0:
			return 'Create ticket title';
		case 1:
			return 'Create description about ticket';
		case 2:
			return 'Select department';
		case 3:
			return 'Select priority level';
		default:
			return 'Create ticket title';
	}
};

const CardContentSection = ({
	currentStep,
	form,
	departments,
}: {
	currentStep: number;
	form: any;
	departments?: string[];
}) => {
	const { register, setValue } = form;
	console.log('departments on CardContentSection', departments);
	const handleSelectChange = (name: string, value: string) => {
		setValue(name, value);
	};

	switch (currentStep) {
		case 0:
			return <Input {...register('title')} />;
		case 1:
			return <Textarea {...register('description')} />;
		case 2:
			return (
				<Select
					onValueChange={(value) => handleSelectChange('department', value)}
				>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Department" />
					</SelectTrigger>
					<SelectContent>
						{departments?.map((department) => (
							<SelectItem key={department._id} value={department._id}>
								{department.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			);
		case 3:
			return (
				<Select
					onValueChange={(value) => handleSelectChange('priority', value)}
				>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Priority" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="low">Low</SelectItem>
						<SelectItem value="medium">Medium</SelectItem>
						<SelectItem value="high">High</SelectItem>
						<SelectItem value="critical">Critical</SelectItem>
					</SelectContent>
				</Select>
			);
		default:
			return null;
	}
};

const CardTicket = ({
	currentStep,
	form,
	departments,
}: {
	currentStep: number;
	form: any;
	departments?: string[];
}) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-xl">Create new Ticket</CardTitle>
				<CardDescription>
					<Title currentStep={currentStep} />
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={form.handleSubmit((data: any) => console.log(data))}>
					<CardContentSection
						currentStep={currentStep}
						form={form}
						departments={departments}
					/>
				</form>
			</CardContent>
			<CardFooter>
				<p className="text-slate-400">
					"When you type the title, move to the next section."
				</p>
			</CardFooter>
		</Card>
	);
};

export default CardTicket;
