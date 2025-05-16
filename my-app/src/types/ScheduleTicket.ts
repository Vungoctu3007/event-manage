export interface ScheduleEvent {
  schedule_id: number;       
  event_id: number;          
  schedule_type: string;    
  start_time: string;        
  end_time: string;         
  description?: string;      
}
