import type { CreateTicketData, TicketResponse, UpdateTicketData } from "@/types/Ticket";
import httpRequest from "@/utils/HttpRequest";

interface DeleteTicketResponse {
    ticket_id: number;
    schedule_id: number;
    message: string;
}

interface ScheduleWithTicketsResponse {
    [key: string]: any;
}

export const createTicket = async (data: CreateTicketData): Promise<TicketResponse> => {
    const response = await httpRequest.post("/ticket/create", data);
    return response.data;
};

export const updateTicket = async (
    scheduleId: number,
    ticketId: number,
    data: UpdateTicketData
): Promise<TicketResponse> => {
    const response = await httpRequest.patch(`/ticket/${scheduleId}/${ticketId}`, data);
    return response.data;
};

export const deleteTicket = async (scheduleId: number, ticketId: number): Promise<DeleteTicketResponse> => {
    const response = await httpRequest.delete(`/ticket/${scheduleId}/${ticketId}`);
    return response.data;
};

export const getSchedulesWithTickets = async (eventId: number): Promise<ScheduleWithTicketsResponse> => {
    const response = await httpRequest.get(`/event/${eventId}/schedules`);
    return response.data;
};

