export interface Event {
  id: string;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  eventType: 'workshop' | 'activity' | 'tech_talk';
  permission: 'public' | 'private';
  speakers?: string[];
  location?: string;
  relatedEvents?: string[];
}

export type EventFormData = Omit<Event, 'id'>;

export interface EventFilters {
  searchQuery?: string;
  eventType?: Event['eventType'];
  permission?: Event['permission'];
} 