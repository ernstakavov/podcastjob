'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import type { ResumeInsert } from '@/server/db/schema';
import type { z } from 'zod';
import { RESUME_FORM_SCHEMA } from './ResumeForm.constants';

// Type for form values
type ResumeFormValues = z.infer<typeof RESUME_FORM_SCHEMA>;

// Map form values to database structure
function mapFormToDb(
  formData: ResumeFormValues,
): Omit<ResumeInsert, 'created_at' | 'updated_at' | 'id'> {
  return {
    position: formData.position,
    employment_type: formData.employment_type,
    salary_expected: formData.salary_expected,
    experience: formData.experience,
    achievements: formData.achievements || null,
    skills: formData.skills,
    contact: formData.contact,
  };
}

export async function createResume(formData: ResumeFormValues) {
  const supabase = createClient();

  // Map form data to database structure
  const dbData = mapFormToDb(formData);

  // Insert the resume
  const { data, error } = await supabase
    .from('resume')
    .insert({
      id: crypto.randomUUID(),
      ...dbData,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating resume:', error);

    return {
      success: false,
      error: 'Failed to create resume. Please try again.',
    };
  }

  // Revalidate the page to show the new resume
  revalidatePath('/');

  return {
    success: true,
    data,
  };
}

export async function updateResume(
  id: string,
  formData: Partial<ResumeFormValues>,
) {
  const supabase = createClient();

  // Map form data to database structure
  const dbData = mapFormToDb(formData as ResumeFormValues);

  // Remove undefined values
  const updateData = Object.fromEntries(
    Object.entries(dbData).filter(([_, v]) => v !== undefined),
  ) as Partial<Omit<ResumeInsert, 'created_at' | 'updated_at' | 'id'>>;

  // Update the resume
  const { data, error } = await supabase
    .from('resume')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating resume:', error);
    return {
      success: false,
      error: 'Failed to update resume. Please try again.',
    };
  }

  revalidatePath('/');

  return {
    success: true,
    data,
  };
}

export async function deleteResume(id: string) {
  const supabase = createClient();

  // Delete the resume
  const { error } = await supabase.from('resume').delete().eq('id', id);

  if (error) {
    console.error('Error deleting resume:', error);
    return {
      success: false,
      error: 'Failed to delete resume. Please try again.',
    };
  }

  revalidatePath('/');

  return {
    success: true,
  };
}

export async function getResumes() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('resume')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching resumes:', error);
    return {
      success: false,
      error: 'Failed to fetch resumes',
      data: [],
    };
  }

  return {
    success: true,
    data,
  };
}
