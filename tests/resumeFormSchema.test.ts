import { describe, it, expect } from 'vitest'
import {
  RESUME_FORM_SCHEMA,
  getResumeFormDefaultValues,
} from '@/app/(pages)/add/components/ResumeForm/ResumeForm.constants'

describe('RESUME_FORM_SCHEMA', () => {
  it('accepts the default sample values', () => {
    const result = RESUME_FORM_SCHEMA.safeParse(getResumeFormDefaultValues())
    expect(result.success).toBe(true)
  })

  it('rejects salary range with to < from', () => {
    const sample = {
      ...getResumeFormDefaultValues(),
      salary_from: 250000 as number | '',
      salary_to: 100000 as number | '',
    }
    const result = RESUME_FORM_SCHEMA.safeParse(sample)
    expect(result.success).toBe(false)
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path.join('.'))
      expect(paths).toContain('salary_to')
    }
  })

  it('rejects fixed salary type without an amount', () => {
    const sample = {
      ...getResumeFormDefaultValues(),
      salary_type: 'fixed',
      salary_fixed: '' as unknown as number | '',
    }
    const result = RESUME_FORM_SCHEMA.safeParse(sample)
    expect(result.success).toBe(false)
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path.join('.'))
      expect(paths).toContain('salary_fixed')
    }
  })

  it('flags invalid email and missing required fields', () => {
    const sample = {
      ...getResumeFormDefaultValues(),
      position: '',
      contact_email: 'not-an-email',
      roles: [] as string[],
    }
    const result = RESUME_FORM_SCHEMA.safeParse(sample)
    expect(result.success).toBe(false)
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path.join('.'))
      expect(paths).toContain('position')
      expect(paths).toContain('contact_email')
      expect(paths).toContain('roles')
    }
  })

  it('requires at least one employment_type', () => {
    const sample = {
      ...getResumeFormDefaultValues(),
      employment_type: [] as string[],
    }
    const result = RESUME_FORM_SCHEMA.safeParse(sample)
    expect(result.success).toBe(false)
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path.join('.'))
      expect(paths).toContain('employment_type')
    }
  })
})
