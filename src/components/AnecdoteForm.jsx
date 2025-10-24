import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer.js'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const content = new FormData(form).get('anecdote')?.toString() || ''
    form.reset()

    dispatch(createAnecdote(content))
  }

  return (
      <div>
        <h2>create new</h2>
          <form onSubmit={addAnecdote}>
            <div>
              <label htmlFor="anecdote-input">anecdote</label>{' '}
              <input id="anecdote-input" name="anecdote" type="text" />
            </div>
            <button type="submit">create</button>
          </form>
      </div>
  )
}

export default AnecdoteForm