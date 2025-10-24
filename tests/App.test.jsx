import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import App from '../src/App.jsx'
import store from '../store.js'
import axios from 'axios'

vi.mock('axios')

describe('<App />', () => {
  it('fetches anecdotes on mount and renders them', async () => {
    axios.get.mockResolvedValueOnce({
      data: [{ id: '1', content: 'If it hurts, do it more often', votes: 0 }]
    })

    render(
        <Provider store={store}>
          <App />
        </Provider>
    )

    expect(await screen.findByText(/If it hurts/i)).toBeVisible()
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3001/anecdotes')
  })
})
