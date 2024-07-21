import Link from 'next/link';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '../ui/tooltip';
import {
	BookUser,
	Home,
	LineChart,
	Package,
	Settings,
	ShoppingCart,
	Ticket,
	Users2,
	Workflow,
} from 'lucide-react';

const Sidebar = () => {
	return (
		<TooltipProvider >
			<aside className="h-screen inset-y-0 left-0 z-50 hidden w-14 flex-col border-r bg-background sm:flex ">
				<nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href="/"
								className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
							>
								<Home className="h-5 w-5" />
								<span className="sr-only">Dashboard</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">Dashboard</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href="/tickets"
								className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
							>
								<Ticket className="h-5 w-5" />
								<span className="sr-only">Tickets</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">Tickets</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href="/departments"
								className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
							>
								<BookUser className="h-5 w-5" />
								<span className="sr-only">Departments</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">Departments</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href="/users"
								className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
							>
								<Users2 className="h-5 w-5" />
								<span className="sr-only">Users</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">Users</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href="#"
								className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
							>
								<LineChart className="h-5 w-5" />
								<span className="sr-only">Analytics</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">Analytics</TooltipContent>
					</Tooltip>
				</nav>
				<nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href="#"
								className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
							>
								<Settings className="h-5 w-5" />
								<span className="sr-only">Settings</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">Settings</TooltipContent>
					</Tooltip>
				</nav>
			</aside>
		</TooltipProvider>
	);
};

export default Sidebar;
