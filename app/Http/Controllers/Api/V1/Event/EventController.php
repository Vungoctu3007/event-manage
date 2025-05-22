<?php

namespace App\Http\Controllers\Api\V1\Event;

use App\FormRequest\EventRequest;
use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Services\Interfaces\EventServiceInterface;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
class EventController extends Controller
{
    protected $eventService;
    public function __construct(EventServiceInterface $eventService)
    {
        $this->eventService = $eventService;
    }

    // create info event
    public function createEvent(Request $request)
    {
        try {
            $data = $request->all();
            $event = $this->eventService->createEvent($data);

            return response()->json([
                'success' => true,
                'message' => 'Event created successfully',
                'data' => $event,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create event: ' . $e->getMessage(),
            ], 500);
        }
    }

    //  get all schedule_events
    public function getSchedulesWithTickets($eventId)
    {
        $schedules = $this->eventService->getTicketsByEventId($eventId);
        return response()->json($schedules);
    }

    //get list events pagination 
    public function getListEventsPagination(Request $request): JsonResponse
    {
        $perPage = $request->query('per_page', 3);
        $page = $request->query('page', 1); 
        $search = $request->query('search');
        $sort = $request->query('sort', 'created_at');
        $status = $request->query('status'); 

        try {
            $events = $this->eventService->getPaginatedEvents($page, $perPage, $search, $sort, $status);
            return response()->json($events);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Lỗi khi lấy danh sách sự kiện'], 500);
        }
    }
}
