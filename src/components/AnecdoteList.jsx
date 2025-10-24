import { useDispatch, useSelector } from 'react-redux'
import { updateAnecdote } from '../reducers/anecdoteReducer.js'
import { setNotification } from '../reducers/notificationReducer.js'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
      <>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => handleClick(anecdote.id)}>vote</button>
        </div>
      </>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (!filter) {
      return anecdotes
    }

    return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  })

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  const handleVote = (anecdote) => {
    dispatch(updateAnecdote(anecdote))
    dispatch(setNotification(`you voted ${anecdote.content}`, 10))
  }

  return(
      <div>
        {sortedAnecdotes.map(anecdote => {
          return <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => handleVote(anecdote)} />
        })}
      </div>
  )
}

export default AnecdoteList