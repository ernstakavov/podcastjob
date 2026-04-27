import { describe, it, expect } from 'vitest'
import {
  VACANCY_FORM_SCHEMA,
  getVacancyFormDefaultValues,
} from '@/app/(pages)/add/components/VacancyForm/VacancyForm.constants'

describe('VACANCY_FORM_SCHEMA', () => {
  it('accepts the default sample values', () => {
    const result = VACANCY_FORM_SCHEMA.safeParse(getVacancyFormDefaultValues())
    expect(result.success).toBe(true)
  })

  it('rejects salary range with max < min', () => {
    const sample = {
      ...getVacancyFormDefaultValues(),
      salary_min: 200000 as number | '',
      salary_max: 100000 as number | '',
    }
    const result = VACANCY_FORM_SCHEMA.safeParse(sample)
    expect(result.success).toBe(false)
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path.join('.'))
      expect(paths).toContain('salary_max')
    }
  })

  it('rejects fixed salary type without an amount', () => {
    const sample = {
      ...getVacancyFormDefaultValues(),
      salary_type: 'fixed',
      salary_fixed: '' as unknown as number | '',
    }
    const result = VACANCY_FORM_SCHEMA.safeParse(sample)
    expect(result.success).toBe(false)
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path.join('.'))
      expect(paths).toContain('salary_fixed')
    }
  })

  it('flags missing required string fields', () => {
    const sample = {
      ...getVacancyFormDefaultValues(),
      title: '',
      role: '',
    }
    const result = VACANCY_FORM_SCHEMA.safeParse(sample)
    expect(result.success).toBe(false)
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path.join('.'))
      expect(paths).toContain('title')
      expect(paths).toContain('role')
    }
  })
})
