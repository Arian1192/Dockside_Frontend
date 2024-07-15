import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from '@/components/ui/command';
// Next Link
import Link from 'next/link';

const Sidebar = () => {
	return (
		<Command className="bg-secondary text-slate-700 rounded-none border-r">
			<CommandInput placeholder="Type a command or search..." />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup heading="Suggestions">
					<CommandItem>
						<Link href={'/'}>Dashboard</Link>
					</CommandItem>
					<CommandItem>
						<Link href={'/departments'}>Departments</Link>
					</CommandItem>
					<CommandItem>
						<Link href={'/users'}>Users</Link>
					</CommandItem>
					<CommandItem>
						<Link href={'/tickets'}>Tickets</Link>
					</CommandItem>
					<CommandItem>
						<Link href={'/config'}>Config</Link>
					</CommandItem>
				</CommandGroup>
				<CommandSeparator />
				<CommandGroup heading="Tickets">
					<CommandItem>TK-01</CommandItem>
					<CommandItem>TK-02</CommandItem>
					<CommandItem>TK-03</CommandItem>
				</CommandGroup>
			</CommandList>
		</Command>
	);
};

export default Sidebar;
