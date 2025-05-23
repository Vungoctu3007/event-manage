<?php

namespace App\Repositories\Interfaces;

interface TicketRepositoryInterface
{
    public function createScheduleEvent(array $data);

    public function createTicket(array $data);

    public function findScheduleEvent($schedule_id);
    public function findTicket($ticket_id);
    public function updateTicket($ticket_id, array $data);
    public function deleteTicket($ticket_id);
}
