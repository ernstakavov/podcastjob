import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { logger } from '@/lib/logger'

describe('logger', () => {
  let errorSpy: ReturnType<typeof vi.spyOn>
  let warnSpy: ReturnType<typeof vi.spyOn>
  let logSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('emits a JSON line on error level via console.error', () => {
    logger.error('createVacancy failed', { code: '23505' })

    expect(errorSpy).toHaveBeenCalledOnce()
    const payload = JSON.parse(errorSpy.mock.calls[0][0] as string)
    expect(payload).toMatchObject({
      level: 'error',
      message: 'createVacancy failed',
      code: '23505',
    })
    expect(typeof payload.timestamp).toBe('string')
    expect(Number.isNaN(Date.parse(payload.timestamp))).toBe(false)
  })

  it('routes warn to console.warn and info to console.log', () => {
    logger.warn('soft issue')
    logger.info('routine')

    expect(warnSpy).toHaveBeenCalledOnce()
    expect(logSpy).toHaveBeenCalledOnce()
    expect(JSON.parse(warnSpy.mock.calls[0][0] as string).level).toBe('warn')
    expect(JSON.parse(logSpy.mock.calls[0][0] as string).level).toBe('info')
  })

  it('omits context fields when none are passed', () => {
    logger.info('hello')
    const payload = JSON.parse(logSpy.mock.calls[0][0] as string)
    expect(Object.keys(payload).sort()).toEqual(
      ['level', 'message', 'timestamp'].sort(),
    )
  })
})
