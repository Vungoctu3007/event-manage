<?php
namespace App\Repositories\Interfaces;
interface EventRepositoryInterface{
    public function findAllScheduleByEventId($eventId);
      public function getEventsPagination($perPage);

}