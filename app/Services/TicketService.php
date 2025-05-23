<?php

namespace App\Services;

use App\Repositories\Interfaces\TicketRepositoryInterface;
use App\Services\Interfaces\TicketServiceInterface;
use Illuminate\Support\Facades\DB;

class TicketService implements TicketServiceInterface
{
    protected $ticketRepository;
    public function __construct(TicketRepositoryInterface $ticketRepository)
    {
        $this->ticketRepository = $ticketRepository;
    }

    public function createTicket(array $data): array
    {
        return DB::transaction(function () use ($data) {
            // Create ScheduleEvent
            $scheduleEvent = $this->ticketRepository->createScheduleEvent([
                'event_id' => $data['event_id'],
                'schedule_type' => $data['schedule_type'],
                'start_time' => $data['start_time'],
                'end_time' => $data['end_time'],
            ]);

            // Create Ticket
            $ticket = $this->ticketRepository->createTicket([
                'schedule_id' => $scheduleEvent->schedule_id,
                'ticket_name' => $data['ticket_name'],
                'ticket_type' => $data['ticket_type'],
                'price' => $data['price'],
                'total_quantity' => $data['total_quantity'],
                'sold_quantity' => $data['sold_quantity'] ?? 0,
                'sale_start' => $data['sale_start'],
                'sale_end' => $data['sale_end'],
                'description' => $data['description'],
                'image_url' => $data['image_url'],
            ]);

            return [
                'ticket' => $ticket,
                'schedule' => $scheduleEvent
            ];
        });
    }

    public function updateTicket($schedule_id, $ticket_id, array $data): array
    {
        return DB::transaction(function () use ($schedule_id, $ticket_id, $data) {
            // Kiểm tra sự tồn tại của schedule và ticket
            $schedule = $this->ticketRepository->findScheduleEvent($schedule_id);
            if (!$schedule) {
                throw new \Exception('Schedule event not found');
            }

            $ticket = $this->ticketRepository->findTicket($ticket_id);
            if (!$ticket || $ticket->schedule_id != $schedule_id) {
                throw new \Exception('Ticket not found or does not belong to the schedule');
            }

            // Cập nhật ticket
            $updatedTicket = $this->ticketRepository->updateTicket($ticket_id, $data);

            return [
                'ticket' => $updatedTicket,
                'schedule' => $schedule
            ];
        });
    }

    public function deleteTicket($schedule_id, $ticket_id): array
    {
        return DB::transaction(function () use ($schedule_id, $ticket_id) {
            $schedule = $this->ticketRepository->findScheduleEvent($schedule_id);
            if (!$schedule) {
                throw new \Exception('Schedule event not found');
            }

            $ticket = $this->ticketRepository->findTicket($ticket_id);
            if (!$ticket || $ticket->schedule_id != $schedule_id) {
                throw new \Exception('Ticket not found or does not belong to the schedule');
            }

            $this->ticketRepository->deleteTicket($ticket_id);

            return [
                'ticket_id' => $ticket_id,
                'schedule_id' => $schedule_id,
                'message' => 'Ticket deleted successfully'
            ];
        });
    }
}
