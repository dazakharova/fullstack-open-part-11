import { describe, it, expect } from 'vitest'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import Notification from '../src/components/Notification.jsx'
import notificationReducer from '../src/reducers/notificationReducer.js'
import anecdotes from '../src/reducers/anecdoteReducer.js'
import filter from '../src/reducers/filterReducer.js'

const makeStore = (preloaded) =>
    configureStore({ reducer: { notification: notificationReducer, anecdotes, filter }, preloadedState: preloaded })

describe('<Notification />', () => {
  it('renders when there is text', () => {
    const store = makeStore({ notification: 'hi', anecdotes: [], filter: '' })
    render(<Provider store={store}><Notification /></Provider>)
    expect(screen.getByText('hi')).toBeInTheDocument()
  })

  it('does not render when empty', () => {
    const store = makeStore({ notification: '', anecdotes: [], filter: '' })
    render(<Provider store={store}><Notification /></Provider>)
    expect(screen.queryByText(/.+/)).toBeNull()
  })
})
