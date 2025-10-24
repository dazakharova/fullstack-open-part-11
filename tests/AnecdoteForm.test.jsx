import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import AnecdoteForm from '../src/components/AnecdoteForm.jsx'
import * as actions from '../src/reducers/anecdoteReducer.js'

// Minimal dummy reducer – component doesn't read from state
const dummyRoot = (state = {}) => state

describe('<AnecdoteForm />', () => {
  it('dispatches createAnecdote with input value', async () => {
    const store = configureStore({ reducer: dummyRoot })
    const dispatchSpy = vi.spyOn(store, 'dispatch')

    const createSpy = vi.spyOn(actions, 'createAnecdote')
        // return a plain action so we don't need to wait for thunk
        .mockReturnValue({ type: 'TEST' })

    render(
        <Provider store={store}>
          <AnecdoteForm />
        </Provider>
    )

    // AnecdoteForm has a single textbox
    await userEvent.type(screen.getByRole('textbox'), 'new text')
    await userEvent.click(screen.getByRole('button', { name: /create/i }))

    expect(createSpy).toHaveBeenCalledWith('new text')
    expect(dispatchSpy).toHaveBeenCalledWith({ type: 'TEST' })
  })
})
