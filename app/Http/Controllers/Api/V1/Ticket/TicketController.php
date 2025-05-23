<?php

namespace App\Http\Controllers\Api\V1\Ticket;

use App\Http\Controllers\Controller;
use App\Services\TicketService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    protected $ticketService;
    public function __construct(TicketService $ticketService)
    {
        $this->ticketService = $ticketService;
    }
    //create schedule ticket 
    public function createScheduleTicket(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'event_id' => 'required|exists:events,event_id',
            'schedule_type' => 'required|string|max:255',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
            'ticket_name' => 'required|string|max:255',
            'ticket_type' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'total_quantity' => 'required|integer|min:1',
            'sold_quantity' => 'nullable|integer|min:0',
            'sale_start' => 'required|date',
            'sale_end' => 'required|date|after:sale_start',
            'description' => 'nullable|string',
            'image_url' => 'nullable|url'
        ]);

        try {
            $result = $this->ticketService->createTicket($validated);
            return response()->json([
                'message' => 'Vé được tạo thành công',
                'data' => $result
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Tạo vé thất bại',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // update ticket 
    public function updateTicket(Request $request, $schedule_id, $ticket_id): JsonResponse
    {
        $validated = $request->validate([
            'ticket_name' => 'sometimes|string|max:255',
            'ticket_type' => 'sometimes|string|max:255',
            'price' => 'sometimes|numeric|min:0',
            'total_quantity' => 'sometimes|integer|min:1',
            'sold_quantity' => 'sometimes|integer|min:0',
            'sale_start' => 'sometimes|date',
            'sale_end' => 'sometimes|date|after:sale_start',
            'description' => 'sometimes|string',
            'image_url' => 'sometimes|url'
        ]);

        try {
            $result = $this->ticketService->updateTicket($schedule_id, $ticket_id, $validated);
            return response()->json([
                'message' => 'Vé được cập nhật thành công',
                'data' => $result
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Cập nhật vé thất bại',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    //delete ticket 
    public function deleteTicket($schedule_id, $ticket_id): JsonResponse
    {
        try {
            $result = $this->ticketService->deleteTicket($schedule_id, $ticket_id);
            return response()->json([
                'message' => 'Vé được xóa thành công',
                'data' => $result
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Xóa vé thất bại',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
