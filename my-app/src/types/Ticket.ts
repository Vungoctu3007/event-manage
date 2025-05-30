// @/types/Ticket.ts
export interface TicketType {
    ticketId: string | number | undefined; 
    ticketName: string;
    price: number;
    isFree: boolean;
    totalQuantity: number;
    minPerOrder: number;
    maxPerOrder: number;
    startSaleDate: string | Date | undefined;
    endSaleDate: string | Date | undefined;
    description: string;
    image: File | null;
}

export interface CreateTicketData {
    event_id: number;
    schedule_type: string;
    start_time: string;
    end_time: string;
    ticket_name: string;
    ticket_type: string;
    price: number;
    total_quantity: number;
    sold_quantity?: number;
    sale_start: string;
    sale_end: string;
    description?: string;
    image_url?: string;
}

export interface UpdateTicketData {
    ticket_name?: string;
    ticket_type?: string;
    price?: number;
    total_quantity?: number;
    sold_quantity?: number;
    sale_start?: string;
    sale_end?: string;
    description?: string;
    image_url?: string;
}

export interface TicketResponse {
    ticket: {
        ticket_id: number;
        schedule_id: number;
        ticket_name: string;
        ticket_type: string;
        price: number;
        total_quantity: number;
        sold_quantity: number;
        sale_start: string;
        sale_end: string;
        description?: string;
        image_url?: string;
        created_at: string;
        updated_at: string;
    };
    schedule: {
        schedule_id: number;
        event_id: number;
        schedule_type: string;
        start_time: string;
        end_time: string;
        created_at: string;
        updated_at: string;
    };
}
