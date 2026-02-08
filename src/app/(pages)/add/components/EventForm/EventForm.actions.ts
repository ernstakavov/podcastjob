'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import type { EventInsert } from '@/server/db/schema';
import type { z } from 'zod';
import { EVENT_FORM_SCHEMA } from './EventForm.constants';

// Type for form values
type EventFormValues = z.infer<typeof EVENT_FORM_SCHEMA>;

// Map form values to database structure
function mapFormToDb(
  formData: EventFormValues,
): Omit<EventInsert, 'created_at' | 'updated_at' | 'id'> {
  return {
    title: formData.title,
    date: formData.date.toISOString(),
    location: formData.location,
    conditions: formData.conditions || null,
    program: formData.program || null,
    contact: formData.contact,
  };
}

export async function createEvent(formData: EventFormValues) {
  const supabase = createClient();

  // Map form data to database structure
  const dbData = mapFormToDb(formData);

  // Insert the event
  const { data, error } = await supabase
    .from('event')
    .insert({
      id: crypto.randomUUID(),
      ...dbData,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating event:', error);
    return {
      success: false,
      error: 'Failed to create event. Please try again.',
    };
  }

  // Revalidate the page to show the new event
  revalidatePath('/');

  return {
    success: true,
    data,
  };
}

export async function updateEvent(
  id: string,
  formData: Partial<EventFormValues>,
) {
  const supabase = createClient();

  // Map form data to database structure
  const dbData = mapFormToDb(formData as EventFormValues);

  // Remove undefined values
  const updateData = Object.fromEntries(
    Object.entries(dbData).filter(([_, v]) => v !== undefined),
  ) as Partial<Omit<EventInsert, 'created_at' | 'updated_at' | 'id'>>;

  // Update the event
  const { data, error } = await supabase
    .from('event')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating event:', error);
    return {
      success: false,
      error: 'Failed to update event. Please try again.',
    };
  }

  revalidatePath('/');

  return {
    success: true,
    data,
  };
}

export async function deleteEvent(id: string) {
  const supabase = createClient();

  // Delete the event
  const { error } = await supabase.from('event').delete().eq('id', id);

  if (error) {
    console.error('Error deleting event:', error);
    return {
      success: false,
      error: 'Failed to delete event. Please try again.',
    };
  }

  revalidatePath('/');

  return {
    success: true,
  };
}

export async function getEvents() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('event')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching events:', error);
    return {
      success: false,
      error: 'Failed to fetch events',
      data: [],
    };
  }

  return {
    success: true,
    data,
  };
}
