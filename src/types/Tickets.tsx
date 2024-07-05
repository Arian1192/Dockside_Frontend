import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { DataTable } from "@/components/Datatable/Datatable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTicketContext } from "@/_context/TicketContext";

export type Ticket = {
  _id: string;
  title: string;
  description: string;
  status: Status;
  priority: PRIORITY;
  createdAt: Date;
  updatedAt: Date;
  closedAt: Date;
  creatorId: string;
  agentId: string;
  categoryId: string;
  comments: Array<{ _id: string; content: string; createdAt: Date; updatedAt: Date }>;
};

enum Status {
  OPEN = "open",
  IN_PROGRESS = "in progress",
  DONE = "done",
  CLOSED = "closed",
}

enum PRIORITY {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export const Tickets: Ticket[] = [
  {
    _id: "9078243983441",
    title: "TK-01",
    description: "This is a description",
    status: Status.OPEN,
    priority: PRIORITY.HIGH,
    createdAt: new Date(),
    updatedAt: new Date(),
    closedAt: new Date(),
    creatorId: "9078243983443",
    agentId: "9078243983443",
    categoryId: "9078243983443",
    comments: [
      {
        _id: "9078243983443",
        content: "This is a comment",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: "9078243983443",
        content: "This is a comment",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
  {
    _id: "9078243983487",
    title: "TK-02",
    description: "This is a description",
    status: Status.OPEN,
    priority: PRIORITY.LOW,
    createdAt: new Date(),
    updatedAt: new Date(),
    closedAt: new Date(),
    creatorId: "9078243983443",
    agentId: "9078243983443",
    categoryId: "9078243983443",
    comments: [
      {
        _id: "9078243983443",
        content: "This is a comment",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: "9078243983443",
        content: "This is a comment",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
  {
    _id: "9078243983442",
    title: "TK-02",
    description: "This is a description",
    status: Status.OPEN,
    priority: PRIORITY.LOW,
    createdAt: new Date(),
    updatedAt: new Date(),
    closedAt: new Date(),
    creatorId: "9078243983443",
    agentId: "9078243983443",
    categoryId: "9078243983443",
    comments: [
      {
        _id: "9078243983443",
        content: "This is a comment",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: "9078243983443",
        content: "This is a comment",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
  {
    _id: "9078243983412",
    title: "TK-02",
    description: "This is a description",
    status: Status.OPEN,
    priority: PRIORITY.LOW,
    createdAt: new Date(),
    updatedAt: new Date(),
    closedAt: new Date(),
    creatorId: "9078243983443",
    agentId: "9078243983443",
    categoryId: "9078243983443",
    comments: [
      {
        _id: "9078243983443",
        content: "This is a comment",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: "9078243983434",
        content: "This is a comment",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
  {
    _id: "9078243983445",
    title: "TK-02",
    description: "This is a description",
    status: Status.OPEN,
    priority: PRIORITY.LOW,
    createdAt: new Date(),
    updatedAt: new Date(),
    closedAt: new Date(),
    creatorId: "9078243983443",
    agentId: "9078243983443",
    categoryId: "9078243983443",
    comments: [
      {
        _id: "9078243983443",
        content: "This is a comment",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: "9078243983443",
        content: "This is a comment",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
];
  export const columns = [
    {
      accessorKey: "_id",
      enableColumnFilter: true,
      cell: (info: { getValue: () => any; }) => info.getValue(),
      header: ({ column }: any) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "title",
      enableColumnFilter: true,
      cell: (info: { getValue: () => any; }) => info.getValue(),
      header: ({ column }: any) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "status",
      enableColumnFilter: true,
      cell: (info: { getValue: () => any; }) => info.getValue(),
      header: ({ column }: any) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "priority",
      enableColumnFilter: true,
      cell: (info: { getValue: () => any; }) => info.getValue(),
      header: ({ column }: any) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Priority
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "action",
      header: "Actions",
      id: "actions",
      cell: ({row}:any) => {
        const ticket = row.original;
        const { setSelectedTicketId } = useTicketContext();
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 outline-none">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(ticket._id)}>
                Copy ticket id
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {
                setSelectedTicketId(ticket._id);
              }}>
                View Ticket
              </DropdownMenuItem>
              <DropdownMenuItem>View Comments About Ticket</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

 const TicketTable = () => {
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

    return <DataTable columns={columns} data={Tickets}/>
    
  }

  export default TicketTable;