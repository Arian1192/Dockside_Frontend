"use client"
import { DataTable } from '@/components/Datatable/Datatable';
import {useEffect, useState} from 'react';
import {Tickets, columns} from '../../types/Tickets';
import TicketTable from "../../types/Tickets"

export default function Page() {
    const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

    return (
        <>
           {domLoaded && <TicketTable />}
        </>
    );
  }