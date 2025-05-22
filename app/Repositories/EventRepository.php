<?php

namespace App\Repositories;

use App\Models\Event;
use App\Repositories\BaseRepository;
use App\Repositories\Interfaces\EventRepositoryInterface;

class EventRepository extends BaseRepository implements EventRepositoryInterface
{
    public function __construct(Event $event)
    {
        parent::__construct($event);
    }
    public function findAllScheduleByEventId($eventId)
    {
        return $this->model->with('schedules')->where('event_id', $eventId)->get();
    }
    
    //Get list events pagination
    public function getEventsPagination($perPage = 5){
        return Event::paginate($perPage);   
    }
}
