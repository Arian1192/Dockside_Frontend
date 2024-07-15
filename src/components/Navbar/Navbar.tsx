import { deleteAccesTokenFromLocalStorage } from '@/_utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DoorOpenIcon, Settings, Settings2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
	const router = useRouter();
	const handleLogout = () => {
		deleteAccesTokenFromLocalStorage();
		router.push('/auth');
	};

	return (
		<div className="bg-primary p-4 flex justify-between text-white fixed z-10 w-full top-0">
			<div>
				<h1 className="font-bold py-2">
					Dock<span className=" text-purple-500">Side</span>
				</h1>
			</div>

			<DropdownMenu>
				<DropdownMenuTrigger className="outline-none">
					<Avatar>
						<AvatarImage src="https://github.com/shadcn.png" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>Mi Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem className="hover:cursor-pointer">
						<Link href="/profile" className="flex justify-center items-center">
							{' '}
							<Settings className="h-4 w-4 mr-4" />
							Profile
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={handleLogout}
						className="hover:cursor-pointer"
					>
						<DoorOpenIcon className="h-4 w-4 mr-4" />
						Logout
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};
export default Navbar;
