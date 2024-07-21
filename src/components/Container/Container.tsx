'use client';
import { NextFont } from 'next/dist/compiled/@next/font';
import Sidebar from '../Sidebar/Sidebar';
import { usePathname } from 'next/navigation';
import AuthPage from '@/app/auth/page';
import Navbar from '@/components/Navbar/Navbar';
import {
	ResizablePanelGroup,
	ResizableHandle,
	ResizablePanel,
} from '../ui/resizable';

interface Props {
	inter: NextFont;
	children: React.ReactNode;
}

const Container: React.FC<Props> = ({ inter, children }) => {
	const pathname = usePathname();

	return (
		<div className="flex flex-col h-screen">
			{pathname === '/auth' ? (
				<AuthPage />
			) : (
				<div>
					<Navbar />
					<div className="hidden fixed md:block top-[72px] bottom-0 bg-primary">
						<Sidebar />
					</div>
					<div className="flex-1 mt-[80px] md:ml-[60px] overflow-y-auto">
						{children}
					</div>
				</div>
			)}
		</div>
	);
};

export default Container;
