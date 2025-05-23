<?php

namespace App\Repositories\Interfaces;

interface ScheduleEventRepositoryInterface
{
    public function getTicketsByEventId(int $eventId);
    public function createScheduleEvent(array $data);
}
