"use server"

import type { Event, EventFormData } from '@/types';

// Mock API endpoint for events
const EVENTS_API = 'https://api.hackthenorth.com/v3/events';

export async function getEvents(): Promise<Event[]> {
  try {
    const response = await fetch(EVENTS_API);
    if (!response.ok) throw new Error('Failed to fetch events');
    return response.json();
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

export async function getEventById(id: string): Promise<Event | null> {
  try {
    const events = await getEvents();
    return events.find(event => event.id === id) || null;
  } catch (error) {
    console.error('Error fetching event:', error);
    return null;
  }
}

export async function filterEvents(events: Event[], searchQuery?: string, eventType?: string, permission?: string): Promise<Event[]> {
  return events.filter(event => {
    const matchesSearch = !searchQuery || 
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = !eventType || event.eventType === eventType;
    const matchesPermission = !permission || event.permission === permission;

    return matchesSearch && matchesType && matchesPermission;
  });
} 