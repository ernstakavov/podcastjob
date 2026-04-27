import { describe, it, expect } from 'vitest'
import {
  EVENT_FORM_SCHEMA,
  getEventFormDefaultValues,
} from '@/app/(pages)/add/components/EventForm/EventForm.constants'

describe('EVENT_FORM_SCHEMA', () => {
  it('accepts the default sample values', () => {
    const result = EVENT_FORM_SCHEMA.safeParse(getEventFormDefaultValues())
    expect(result.success).toBe(true)
  })

  it('rejects offline format without a location', () => {
    const sample = {
      ...getEventFormDefaultValues(),
      event_format: 'offline',
      location: '',
    }
    const result = EVENT_FORM_SCHEMA.safeParse(sample)
    expect(result.success).toBe(false)
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path.join('.'))
      expect(paths).toContain('location')
    }
  })

  it('rejects online format without a platform', () => {
    const sample = {
      ...getEventFormDefaultValues(),
      event_format: 'online',
      location: '   ',
    }
    const result = EVENT_FORM_SCHEMA.safeParse(sample)
    expect(result.success).toBe(false)
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path.join('.'))
      expect(paths).toContain('location')
    }
  })

  it('rejects range date_type without date_end', () => {
    const sample = {
      ...getEventFormDefaultValues(),
      date_end: undefined as unknown as Date | undefined,
    }
    const result = EVENT_FORM_SCHEMA.safeParse(sample)
    expect(result.success).toBe(false)
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path.join('.'))
      expect(paths).toContain('date_end')
    }
  })

  it('rejects date_end earlier than date_start', () => {
    const start = new Date('2026-06-01T00:00:00.000Z')
    const end = new Date('2026-05-30T00:00:00.000Z')
    const sample = {
      ...getEventFormDefaultValues(),
      date_start: start,
      date_end: end,
    }
    const result = EVENT_FORM_SCHEMA.safeParse(sample)
    expect(result.success).toBe(false)
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path.join('.'))
      expect(paths).toContain('date_end')
    }
  })

  it('rejects paid cost_type without cost_amount', () => {
    const sample = {
      ...getEventFormDefaultValues(),
      cost_type: 'paid',
      cost_amount: '' as unknown as number | '',
    }
    const result = EVENT_FORM_SCHEMA.safeParse(sample)
    expect(result.success).toBe(false)
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path.join('.'))
      expect(paths).toContain('cost_amount')
    }
  })

  it('flags missing target_audience and short_description', () => {
    const sample = {
      ...getEventFormDefaultValues(),
      target_audience: [] as string[],
      short_description: '',
    }
    const result = EVENT_FORM_SCHEMA.safeParse(sample)
    expect(result.success).toBe(false)
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path.join('.'))
      expect(paths).toContain('target_audience')
      expect(paths).toContain('short_description')
    }
  })
})
