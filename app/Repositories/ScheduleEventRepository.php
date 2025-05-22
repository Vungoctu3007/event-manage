<?php

namespace App\Repositories;

use App\Models\ScheduleEvent;
use App\Repositories\BaseRepository;
use App\Repositories\Interfaces\ScheduleEventRepositoryInterface;
use Illuminate\Support\Facades\DB;

class ScheduleEventRepository  implements ScheduleEventRepositoryInterface
{
    public function getTicketsByEventId(int $eventId)
    {
        return ScheduleEvent::with('tickets')
            ->where('event_id', $eventId)
            ->get();
    }
}
