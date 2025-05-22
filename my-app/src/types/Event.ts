export interface Event {
  organizer_id: number;
  category_id: number;
  venue_id: number;
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  status: string;
  logo_image?: File;
  background_image?: File;
  banner_image?: File;
}


export interface EventResponse {
  message: string;
  data: {
    event_id: number;
    organizer_id: number;
    category_id: number;
    venue_id: number;
    title: string;
    description: string;
    start_time: string;
    end_time: string;
    status: string;
    logo_url: string;
    background_url: string;
    banner_url: string;
  };
}

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  prev_page_url: string | null;
  per_page: number;
  to: number;
  total: number;
}

export interface CreateEventData {
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  status: 'active' | 'cancelled' | 'sold_out';
  logo_url: File | null;
  background_url: File | null;
  organizer_url: File | null;
  category_id: string;
  organization_name: string;
  organizer_description?: string;
  venue_name: string;
  venue_city?: string;
  venue_address?: string;
  map_url?: File | null;
}