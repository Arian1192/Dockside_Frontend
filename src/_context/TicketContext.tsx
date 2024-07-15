"use client"
import {createContext, useContext, useState} from "react";


export type TicketContextType = {
    selectedTicketId: string | null,
    setSelectedTicketId: React.Dispatch<React.SetStateAction<string | null>>
}
const ITicketContextState = {
    selectedTicketId: null,
    setSelectedTicketId: () => {}
}

const TicketContext = createContext<TicketContextType>(ITicketContextState);

interface IProps {
    children: React.ReactNode
}

export function TicketContextProvider({children} : IProps){
    const [selectedTicketId, setSelectedTicketId] = useState<string | null>("");

    return(
        <TicketContext.Provider value={{selectedTicketId, setSelectedTicketId}}>
            {children}
        </TicketContext.Provider>
    )
}

export function useTicketContext(){
    const context = useContext(TicketContext);
    if(!context){
        throw new Error("useTicketContext must be used within a TicketContextProvider");
    }
    return context;
}