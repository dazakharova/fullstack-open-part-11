import { describe, it, expect } from 'vitest'
import reducer, { appendAnecdote, vote, setAnecdotes } from '../../src/reducers/anecdoteReducer.js'

describe('anecdoteReducer', () => {
  it('sets anecdotes', () => {
    const next = [{ id: '1', content: 'hello', votes: 0 }]
    expect(reducer([], setAnecdotes(next))).toEqual(next)
  })

  it('appends anecdote', () => {
    const item = { id: '2', content: 'new', votes: 0 }
    const state = reducer([], appendAnecdote(item))
    expect(state).toHaveLength(1)
    expect(state[0]).toEqual(item)
  })

  it('increments votes', () => {
    const init = [{ id: 'a', content: 'A', votes: 0 }]
    const state = reducer(init, vote('a'))
    expect(state[0].votes).toBe(1)
  })
})
