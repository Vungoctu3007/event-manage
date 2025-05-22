import httpRequest from "@/utils/HttpRequest";
import {
    type CreateEventData,
    type EventResponse,
    type PaginatedResponse,
} from "@/types/Event";

export const getPaginatedEvents = async (
    page: number = 1,
    params: {
        search?: string;
        sort?: string;
        status?: string;
        per_page?: number;
    } = {}
): Promise<PaginatedResponse<EventResponse["data"]>> => {
    const query = new URLSearchParams({
        page: page.toString(),
        per_page: (params.per_page || 3).toString(), // Mặc định 3 sự kiện mỗi trang
        ...(params.search && { search: params.search }),
        ...(params.sort && { sort: params.sort }),
        ...(params.status && { status: params.status }), // Thêm tham số status
    });
    const response = await httpRequest.get(`/event/pagination?${query}`);
    return response.data;
};

export const createEvent = async (
    data: CreateEventData
): Promise<EventResponse> => {
    const formData = new FormData();
    formData.append("title", data.title);
    if (data.description) formData.append("description", data.description);
    formData.append("start_time", data.start_time);
    formData.append("end_time", data.end_time);
    formData.append("status", data.status);
    if (data.logo_url) formData.append("logo_url", data.logo_url);
    if (data.background_url)
        formData.append("background_url", data.background_url);
    if (data.organizer_url)
        formData.append("organizer_url", data.organizer_url);
    formData.append("category_id", data.category_id); // Thêm category_id
    formData.append("organization_name", data.organization_name); // Thêm organization_name
    if (data.organizer_description)
        formData.append("organizer_description", data.organizer_description); // Thêm organizer_description
    formData.append("venue_name", data.venue_name); // Thêm venue_name
    if (data.venue_city) formData.append("venue_city", data.venue_city); // Thêm venue_city
    if (data.venue_address)
        formData.append("venue_address", data.venue_address); // Thêm venue_address

    const response = await httpRequest.post("/event/create", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};
