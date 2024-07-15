'use client';
import { DndContext, DragOverlay, closestCenter } from '@dnd-kit/core';
import {
	SortableContext,
	arrayMove,
	rectSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import ChartRadar from '@/components/Charts/ChartRadar';
import { useState } from 'react';

export default function Home() {
	const dashboardChartsComponents = [
		{ id: '1', component: ChartRadar },
		{ id: '2', component: ChartRadar },
		{ id: '3', component: ChartRadar },
		{ id: '4', component: ChartRadar },
		{ id: '5', component: ChartRadar },
		{ id: '6', component: ChartRadar },
	];
	const [charts, setCharts] = useState<any>(dashboardChartsComponents);
	const handleDragEnd = (event: any) => {
		const { active, over } = event;
		setCharts((charts: any) => {
			const oldIndex = charts.findIndex((chart: any) => chart.id === active.id);
			const newIndex = charts.findIndex((chart: any) => chart.id === over.id);
			return arrayMove(charts, oldIndex, newIndex);
		});
	};

	const dashboardCharts = [
		{
			id: '1',
			month: 'January',
			tickets: {
				Fronts: 5,
				Reorders: 20,
				Administration: 10,
				CreditControl: 15,
				CustomerService: 5,
			},
		},
		{
			id: '2',
			month: 'February',
			tickets: {
				Fronts: 20,
				Reorders: 25,
				Administration: 15,
				CreditControl: 10,
				CustomerService: 5,
			},
		},
		{
			id: '3',
			month: 'March',
			tickets: {
				Fronts: 15,
				Reorders: 20,
				Administration: 25,
				CreditControl: 10,
				CustomerService: 5,
			},
		},
		{
			id: '4',
			month: 'April',
			tickets: {
				Fronts: 10,
				Reorders: 15,
				Administration: 20,
				CreditControl: 25,
				CustomerService: 5,
			},
		},
		{
			id: '5',
			month: 'May',
			tickets: {
				Fronts: 5,
				Reorders: 10,
				Administration: 15,
				CreditControl: 20,
				CustomerService: 25,
			},
		},
		{
			id: '6',
			month: 'June',
			tickets: {
				Fronts: 5,
				Reorders: 10,
				Administration: 15,
				CreditControl: 20,
				CustomerService: 25,
			},
		},
	];

	return (
		<div className="h-screen overflow-hidden p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
			<DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
				<SortableContext items={charts} strategy={rectSortingStrategy}>
					{charts.map((chart: any) => (
						<div key={chart.id} className="w-full aspect-w-16 aspect-h-9">
							<chart.component chartData={dashboardCharts} id={chart.id} />
						</div>
					))}
				</SortableContext>
			</DndContext>
		</div>
	);
}
