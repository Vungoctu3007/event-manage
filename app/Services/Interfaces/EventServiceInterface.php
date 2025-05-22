<?php

namespace App\Services\Interfaces;

interface EventServiceInterface
{
    public function createEvent(array $data): \App\Models\Event;

    public function getTicketsByEventId(int $eventId);
    public function getPaginatedEvents(int $perPage);
}
