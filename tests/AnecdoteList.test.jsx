import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import store from '../store.js'
import App from '../src/App.jsx'
import axios from 'axios'

vi.mock('axios')

describe('<AnecdoteList />', () => {
  it('filters anecdotes by input', async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        { id: '1', content: 'Premature optimization is the root of all evil.', votes: 6 },
        { id: '2', content: 'Any fool can write code that a computer can understand.', votes: 2 }
      ]
    })

    render(<Provider store={store}><App /></Provider>)

    expect(await screen.findByText(/Premature optimization/i)).toBeVisible()
    expect(screen.getByText(/Any fool can write code/i)).toBeVisible()

    await userEvent.type(screen.getByRole('textbox', { name: /filter/i }), 'optimization')

    expect(screen.getByText(/Premature optimization/i)).toBeVisible()
    expect(screen.queryByText(/Any fool can write code/i)).toBeNull()
  })
})
