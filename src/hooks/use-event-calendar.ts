'use client';

import { useEffect } from 'react';
import { atom, useAtom } from 'jotai';
import uniqueId from 'lodash/uniqueId';
import { CalendarEvent } from '@/types';
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const eventAtom = atom<CalendarEvent[]>([]);
const filteredEventAtom = atom<CalendarEvent[]>([]);

export default function useEventCalendar() {
  const [events, setEvents] = useAtom(eventAtom);
  const [filteredEvents, setFilteredEvents] = useAtom(filteredEventAtom);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(`${apiUrl}/bookings/view`);
        const data = await response.json();
        const formattedData = data.map((event: any) => ({
          id: uniqueId(),
          start: new Date(event.checkInDate),
          end: new Date(event.checkOutDate),
          allDay: false,
          title: event.resortName || 'Booking',
          description: event.comments || '',
          location: event.resortName || '',
          transactionReference: event.transactionReference || '',
          paymentMode: event.paymentMode || '',
          base: event.base || 0,
          gst: event.gst || 0,
          primaryContact: event.primaryContact || '',
          primaryEmail: event.primaryEmail || '',
          specialRequest: event.specialRequest || '',
          status: event.status || '',
          resortIdentifier: event.resortIdentifier,
          color: event.status.toLowerCase() === 'confirmed' ? 'green' : 'default', // Add color based on status
        }));
        
        setEvents(formattedData);
        setFilteredEvents(formattedData);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }

    fetchEvents();
  }, [setEvents, setFilteredEvents]);

  function createEvent(event: CalendarEvent) {
    setEvents((prev) => [...prev, event]);
    setFilteredEvents((prev) => [...prev, event]);
  }

  function updateEvent(updatedEvent: CalendarEvent) {
    const updatedEvents = events.map((event) => (event.id === updatedEvent.id ? updatedEvent : event));
    setEvents(updatedEvents);
    setFilteredEvents(updatedEvents);
  }

  function deleteEvent(eventID: string) {
    const updatedEvents = events.filter((event) => event.id !== eventID);
    setEvents(updatedEvents);
    setFilteredEvents(updatedEvents);
  }

  return { events, filteredEvents, setFilteredEvents, createEvent, updateEvent, deleteEvent };
}