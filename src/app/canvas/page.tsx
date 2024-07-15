'use client';
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Stepper from '@/components/Stepper/Stepper';
import CardTicket from '@/components/CardTicket/CardTicket';

const TicketFormSchema = z.object({
	title: z.string().min(2),
	description: z.string().min(2),
	department: z.string().min(2),
	priority: z.string().min(2),
});

export default function Page() {
	const [currentStep, setCurrentStep] = useState<number>(0);

	const form = useForm<z.infer<typeof TicketFormSchema>>({
		resolver: zodResolver(TicketFormSchema),
	});
	return (
		<div className="p-24">
			<Stepper
				currentStep={currentStep}
				setCurrentStep={setCurrentStep}
				numberOfSteps={4}
				form={form}
			>
				<div className="w-full h-64 mt-5">
					<CardTicket currentStep={currentStep} form={form} />
				</div>
			</Stepper>
		</div>
	);
}
