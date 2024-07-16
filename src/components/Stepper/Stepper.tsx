import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '@/_context/AuthContext';
import { createTicket } from '@/_utils/apiTickets';
interface IStepperProps {
	numberOfSteps: number;
	isVertical?: boolean;
	children?: React.ReactNode;
	currentStep: number;
	setCurrentStep: (value: number) => void;
	form: any;
}

interface ITicket {
	title: string;
	description: string;
	department: string;
	priority: string;
}

const Stepper = ({
	currentStep,
	setCurrentStep,
	numberOfSteps,
	isVertical,
	children,
	form,
}: IStepperProps) => {
	const [ticket, setTicket] = useState<ITicket>({
		title: '',
		description: '',
		department: '',
		priority: '',
	});

	useEffect(() => {
		// Sync form values with ticket state
		Object.keys(ticket).forEach((key) => {
			form.setValue(key, (ticket as any)[key]);
		});
	}, [currentStep]);
	const activeColor = (index: number) =>
		currentStep >= index ? 'bg-primary' : 'bg-gray-300';

	const isFinalStep = (index: number) => index === numberOfSteps - 1;
	const { user } = useAuthContext();
	const queryClient = useQueryClient();

	const authMutation = useMutation({
		mutationFn: createTicket,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['tickets'],
			});
			setCurrentStep(0);
			setTicket({
				title: '',
				description: '',
				department: '',
				priority: '',
			});
		},
	});

	const onSubmit = (data: any) => {
		console.log('data', data);
		authMutation.mutate({ ...data, creatorId: user?.sub });
	};

	const goToNextStep = () => {
		const formData = form.getValues();
		setTicket((prevTicket) => ({
			...prevTicket,
			...formData,
		}));
		setCurrentStep(
			currentStep >= numberOfSteps ? currentStep : currentStep + 1
		);
	};

	const goToPreviousStep = () => {
		setCurrentStep(currentStep <= 0 ? currentStep : currentStep - 1);
	};

	return (
		<div className="max-w-lg flex flex-col justify-center items-center">
			<div className={`flex items-center ${isVertical ? 'flex-col' : ''}`}>
				{Array.from({ length: numberOfSteps }).map((_, index) => {
					const colorClass = activeColor(index);
					return (
						<React.Fragment key={index}>
							<div
								className={`w-10 h-10 rounded-full flex justify-center items-center text-white ${colorClass}`}
							>
								{index + 1}
							</div>
							{!isFinalStep(index) && (
								<div
									className={`h-2 w-28 bg-gray-300 ${
										activeColor(index + 1) === 'bg-primary' ? 'bg-primary' : ''
									}`}
								/>
							)}
						</React.Fragment>
					);
				})}
			</div>
			{children}

			<div className="flex justify-center mt-2 gap-4">
				<button
					className={`${
						currentStep === 0 &&
						'disabled:opacity-50 disabled:cursor-not-allowed bg-gray-500'
					} bg-primary text-white px-4 py-2 rounded-lg ml-4`}
					onClick={goToPreviousStep}
					disabled={currentStep === 0}
				>
					Previous
				</button>
				<button
					className={`${
						currentStep === numberOfSteps - 1 ? 'bg-lime-500' : 'bg-primary'
					} text-white px-4 py-2 rounded-lg ml-4 w-24`}
					onClick={
						currentStep === numberOfSteps - 1
							? form.handleSubmit(onSubmit)
							: goToNextStep
					}
				>
					{currentStep === numberOfSteps - 1 ? 'Create' : 'Next'}
				</button>
			</div>
		</div>
	);
};

export default Stepper;
