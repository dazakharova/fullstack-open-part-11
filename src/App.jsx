import { useEffect } from 'react'
import AnecdoteList from './components/AnecdoteList.jsx'
import NewAnecdote from './components/AnecdoteForm.jsx'
import Filter from "./components/Filter.jsx"
import Notification from './components/Notification.jsx'
import { initializeAnecdotes } from './reducers/anecdoteReducer.js'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [])

  return (
    <div>
      <Notification />
      <Filter />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <NewAnecdote />
    </div>
  )
}

export default App