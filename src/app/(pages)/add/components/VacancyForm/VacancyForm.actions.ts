'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import type { VacancyInsert } from '@/server/db/schema';
import type { z } from 'zod';
import { VACANCY_FORM_SCHEMA } from './VacancyForm.constants';

// Type for form values
type VacancyFormValues = z.infer<typeof VACANCY_FORM_SCHEMA>;

// Map form values to database structure
function mapFormToDb(
  formData: VacancyFormValues,
): Omit<VacancyInsert, 'created_at' | 'updated_at' | 'id'> {
  return {
    title: formData.title,
    employer: formData.company_name,
    position: formData.position,
    salary_min: formData.salary_min,
    salary_max: formData.salary_max,
    experience: formData.experience || null,
    employment_type: formData.employment,
    work_mode: formData.work_mode,
    schedule: formData.working_schedule,
    responsibilities: formData.responsibilities,
    requirements: formData.requirements,
    additional_requirements: formData.additional_requirements || null,
    working_conditions: formData.working_conditions,
    contact: formData.contact,
    close_date: formData.close_date
      ? formData.close_date.toISOString()
      : undefined,
  };
}

export async function createVacancy(formData: VacancyFormValues) {
  const supabase = createClient();

  // Map form data to database structure
  const dbData = mapFormToDb(formData);

  // Insert the vacancy
  const { data, error } = await supabase
    .from('vacancy')
    .insert({
      id: crypto.randomUUID(),
      ...dbData,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating vacancy:', error);
    return {
      success: false,
      error: 'Failed to create vacancy. Please try again.',
    };
  }

  // Revalidate the page to show the new vacancy
  revalidatePath('/');

  return {
    success: true,
    data,
  };
}

export async function updateVacancy(
  id: string,
  formData: Partial<VacancyFormValues>,
) {
  const supabase = createClient();

  // Map form data to database structure
  const dbData = mapFormToDb(formData as VacancyFormValues);

  // Remove undefined values
  const updateData = Object.fromEntries(
    Object.entries(dbData).filter(([_, v]) => v !== undefined),
  ) as Partial<Omit<VacancyInsert, 'created_at' | 'updated_at' | 'id'>>;

  // Update the vacancy
  const { data, error } = await supabase
    .from('vacancy')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating vacancy:', error);
    return {
      success: false,
      error: 'Failed to update vacancy. Please try again.',
    };
  }

  revalidatePath('/');

  return {
    success: true,
    data,
  };
}

export async function deleteVacancy(id: string) {
  const supabase = createClient();

  // Delete the vacancy
  const { error } = await supabase.from('vacancy').delete().eq('id', id);

  if (error) {
    console.error('Error deleting vacancy:', error);
    return {
      success: false,
      error: 'Failed to delete vacancy. Please try again.',
    };
  }

  revalidatePath('/');

  return {
    success: true,
  };
}

export async function getVacancies() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('vacancy')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching vacancies:', error);
    return {
      success: false,
      error: 'Failed to fetch vacancies',
      data: [],
    };
  }

  return {
    success: true,
    data,
  };
}
