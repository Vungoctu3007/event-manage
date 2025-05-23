<?php

namespace App\Services;

use App\Models\Event;
use App\Models\Organizer;
use App\Models\SeatingMap;
use App\Models\Venue;
use App\Repositories\EventRepository;
use App\Repositories\ScheduleEventRepository;
use App\Services\Interfaces\EventServiceInterface;
use Cloudinary\Cloudinary;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class EventService  implements EventServiceInterface
{
    protected $cloudinary;
    protected $eventRepository;
    protected $scheduleEventRepository;

    public function __construct(EventRepository $eventRepository, ScheduleEventRepository $schedule)
    {
        $this->cloudinary = new Cloudinary(config('cloudinary'));
        $this->eventRepository = $eventRepository;
        $this->scheduleEventRepository = $schedule;
    }


    public function createEvent(array $data): Event
    {
        // Log dữ liệu đầu vào
        Log::info('Create event data:', $data);

        // Validation cho các trường bắt buộc
        $validator = validator($data, [
            'title' => 'required|string|max:100',
            'description' => 'required|string',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
            'category_id' => 'required|integer|exists:categories,category_id',
            'organization_name' => 'required|string|max:100',
            'venue_name' => 'required|string|max:100',
        ], [
            'title.required' => 'Vui lòng nhập tiêu đề sự kiện',
            'description.required' => 'Vui lòng nhập mô tả sự kiện',
            'start_time.required' => 'Vui lòng nhập thời gian bắt đầu',
            'end_time.required' => 'Vui lòng nhập thời gian kết thúc',
            'end_time.after' => 'Thời gian kết thúc phải sau thời gian bắt đầu',
            'category_id.required' => 'Vui lòng chọn thể loại sự kiện',
            'category_id.exists' => 'Thể loại không tồn tại',
            'organization_name.required' => 'Vui lòng nhập tên ban tổ chức',
            'venue_name.required' => 'Vui lòng nhập tên địa điểm',
        ]);

        if ($validator->fails()) {
            Log::error('Validation failed', $validator->errors()->toArray());
            throw new ValidationException($validator);
        }

        $imageFields = [
            'logo_url' => 'logo_url',          
            'background_url' => 'banner_url',   
            'organizer_url' => 'organizer_url', 
            'map_url' => 'background_image',   
        ];

        $uploadedImages = [];

        foreach ($imageFields as $inputField => $dbField) {
            if (isset($data[$inputField]) && $data[$inputField] instanceof \Illuminate\Http\UploadedFile) {
                Log::info("Processing image field: $inputField");

                $validator = validator($data, [
                    $inputField => 'required|image|mimes:jpeg,png,jpg,gif|max:51200',
                ], [
                    "$inputField.required" => "Vui lòng chọn ảnh cho $inputField",
                    "$inputField.image" => "Tệp tải lên cho $inputField không phải là ảnh",
                    "$inputField.mimes" => "Chỉ hỗ trợ các định dạng jpeg, png, jpg, gif cho $inputField",
                    "$inputField.max" => "Kích thước tệp tối đa là 50MB cho $inputField",
                ]);

                if ($validator->fails()) {
                    Log::error("Validation failed for $inputField", $validator->errors()->toArray());
                    throw new ValidationException($validator);
                }

                try {
                    $uploadedFile = $data[$inputField];
                    $folder = ($inputField === 'organizer_url') ? '/images/organizer' : ($inputField === 'map_url' ? '/images/seating_map' : '/images/event_background');
                    $uploadResult = $this->cloudinary->uploadApi()->upload($uploadedFile->getRealPath(), [
                        'folder' => $folder,
                        'public_id' => uniqid(),
                        'resource_type' => 'image',
                        'overwrite' => true,
                    ]);

                    if (isset($uploadResult['secure_url'])) {
                        $uploadedImages[$dbField] = $uploadResult['secure_url'];
                        Log::info("Uploaded $inputField to $dbField: " . $uploadResult['secure_url']);
                        unset($data[$inputField]);
                    } else {
                        throw new \Exception('Upload failed: No secure_url returned');
                    }
                } catch (\Exception $e) {
                    Log::error("Upload image failed for $inputField: " . $e->getMessage());
                    throw new \Exception("Upload image failed for $inputField: " . $e->getMessage());
                }
            } else {
                Log::warning("Field $inputField not found or not a valid file");
            }
        }

        $organizerData = [
            'organization_name' => $data['organization_name'] ?? null,
            'description' => $data['organizer_description'] ?? null,
            'organizer_url' => $uploadedImages['organizer_url'] ?? null,
        ];

        Log::info('Organizer data before saving:', $organizerData);

        $organizer = Organizer::create($organizerData);
        $data['organizer_id'] = $organizer->organizer_id;

        Log::info('Organizer created:', $organizer->toArray());

        unset($data['organization_name']);
        unset($data['organizer_description']);

        $venueData = [
            'name' => $data['venue_name'] ?? null,
            'city' => $data['venue_city'] ?? null, 
            'address' => $data['venue_address'] ?? null,
        ];

        Log::info('Venue data before saving:', $venueData);

        $venue = Venue::create($venueData);
        $data['venue_id'] = $venue->venue_id;

        Log::info('Venue created:', $venue->toArray());

        unset($data['venue_name']);
        unset($data['venue_city']);
        unset($data['venue_address']);

        if (isset($uploadedImages['banner_url'])) {
            $data['banner_url'] = $uploadedImages['banner_url'];
        }
        if (isset($uploadedImages['logo_url'])) {
            $data['logo_url'] = $uploadedImages['logo_url'];
        }

        unset($data['event_type']);
        unset($data['map_url']);

        Log::info('Data after processing:', $data);

        $event = $this->eventRepository->create($data);

        Log::info('Event created:', $event->toArray());

        if (isset($uploadedImages['background_image'])) {
            $seatingMapData = [
                'event_id' => $event->event_id,
                'venue_id' => $data['venue_id'],
                'background_image' => $uploadedImages['background_image'],
                'map_type' => $data['map_type'] ?? 'fixed', 
                'configuration' => $data['configuration'] ?? [], 
                'width' => $data['width'] ?? 1370, 
                'height' => $data['height'] ?? 416, 
                'scale_ratio' => $data['scale_ratio'] ?? 1.0, 
            ];

            Log::info('Seating map data before saving:', $seatingMapData);

            $seatingMap = SeatingMap::create($seatingMapData);

            Log::info('Seating map created:', $seatingMap->toArray());
        } else {
            Log::warning('No background_image provided for seating_map');
        }

        if (isset($uploadedImages['background_image'])) {
            $event->load('seatingMap');
            Log::info('Loaded seating_map relation:', $event->toArray());
        } else {
            Log::info('No seating_map relation loaded due to missing background_image');
        }

        Log::info('Final event data with relations:', $event->toArray());

        return $event;
    }
    public function getTicketsByEventId(int $eventId)
    {
        return $this->scheduleEventRepository->getTicketsByEventId($eventId);
    }


    public function getPaginatedEvents(
        int $page = 1,
        int $perPage = 3,
        ?string $search = null,
        string $sort = 'created_at',
        ?string $status = null
    ): LengthAwarePaginator {
        $query = Event::query();

        if ($status === 'past') {
            $query->where(function ($q) {
                $q->where('status', 'cancelled')
                    ->orWhere(function ($subQ) {
                        $subQ->where('status', 'active')
                            ->where('end_time', '<', now());
                    });
            });
        } elseif ($status === 'active') {
            $query->where('status', 'active')
                ->where('end_time', '>=', now());
        } elseif ($status === 'sold_out') {
            $query->where('status', 'sold_out');
        }

        if ($search) {
            $query->where('title', 'like', '%' . $search . '%');
        }

        $query->orderBy($sort);

        return $query->paginate($perPage, ['*'], 'page', $page);
    }

    // creat scheduel event ( creat ticket + time)

  
}
