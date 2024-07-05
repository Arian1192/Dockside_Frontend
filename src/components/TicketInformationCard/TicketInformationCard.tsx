import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Ticket } from "@/types/Tickets";
import { Badge } from '../ui/badge';
const TicketInformationCard = ({ ticketInfo }: { ticketInfo: Ticket }) => {
    const {
        _id,
        title,
        description,
        status,
        priority,
        createdAt,
        updatedAt,
        closedAt,
        creatorId,
        agentId,
        categoryId,
        comments,
    } = ticketInfo;

    return (
        <Card className="bg-white shadow-xl overflow-hidden max-w-2xl mx-auto mt-5">
            <CardHeader className="bg-gradient-to-r from-primary to-zinc-500 text-white p-6">
                <CardTitle className="lg:text-3xl md:text-xl  font-bold">{`${title} - ${_id}`}</CardTitle>
                <CardDescription className="text-base mt-2">{description}</CardDescription>
            </CardHeader>
            <CardContent className="p-3">
                <section className="mb-3">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <h3 className="text-lg font-semibold">Status:</h3>
                            <Badge variant={status}>
                                <p className="text-md font-bold text-white m-2">{status.toUpperCase()}</p>
                            </Badge>

                            
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Priority:</h3>
                            <Badge variant={priority}>
                                <p className="text-md font-bold text-white m-2">{priority.toUpperCase()}</p>
                            </Badge>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Created At:</h3>
                            <p className="text-md text-gray-800">{new Date(createdAt).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Updated At:</h3>
                            <p className="text-md text-gray-800">{new Date(updatedAt).toLocaleDateString()}</p>
                        </div>
                        {closedAt && (
                            <div>
                                <h3 className="text-lg font-semibold">Closed At:</h3>
                                <p className="text-md text-gray-800">{new Date(closedAt).toLocaleDateString()}</p>
                            </div>
                        )}
                    </div>
                </section>
                <section className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Details:</h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-md font-medium">Creator:</h4>
                            <p className="text-sm text-gray-800">{creatorId}</p>
                        </div>
                        <div>
                            <h4 className="text-md font-medium">Agent:</h4>
                            <p className="text-sm text-gray-800">{agentId}</p>
                        </div>
                        <div>
                            <h4 className="text-md font-medium">Category:</h4>
                            <p className="text-sm text-gray-800">{categoryId}</p>
                        </div>
                    </div>
                </section>
               
            </CardContent>
            <CardFooter className="bg-gray-100 p-6 text-right">
                <h2>Botonera para manejar la tarjeta por ejemplo un selector de cambio de prioridad o status. //TODO</h2>
            </CardFooter>
        </Card>
    );
}

export default TicketInformationCard;
