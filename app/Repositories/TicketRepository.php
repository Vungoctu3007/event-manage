<?php

namespace App\Repositories;

use App\Models\ScheduleEvent;
use App\Models\Ticket;
use App\Repositories\Interfaces\TicketRepositoryInterface;

class TicketRepository implements TicketRepositoryInterface
{
    public function createScheduleEvent(array $data): ScheduleEvent
    {
        return ScheduleEvent::create($data);
    }

    public function createTicket(array $data): Ticket
    {
        return Ticket::create($data);
    }

    public function findScheduleEvent($schedule_id): ?ScheduleEvent
    {
        return ScheduleEvent::find($schedule_id);
    }

    public function findTicket($ticket_id): ?Ticket
    {
        return Ticket::find($ticket_id);
    }

    public function updateTicket($ticket_id, array $data): Ticket
    {
        $ticket = Ticket::findOrFail($ticket_id);
        $ticket->update($data);
        return $ticket;
    }

     public function deleteTicket($ticket_id): void
    {
        Ticket::findOrFail($ticket_id)->delete();
    }
}
