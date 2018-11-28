/* eslint react/prop-types: 0 */


import React from 'react'


const actionFor = {
  voting(id) {
    return{
      type: 'VOTE',
      data: { id: id }
    }
  },
  anecdoteCreation(text) {
    return {
      type: 'CREATE',
      data: {content: text}
    }
  }
}

class App extends React.Component {

  vote = (id) => () => {
    this.props.store.dispatch(
      actionFor.voting(id)
    )
  }

  createAnecdote = (event) => {
    event.preventDefault()
    const text = event.target.text.value
    if (text.length > 0){
      this.props.store.dispatch(
        actionFor.anecdoteCreation(text)
      )
    }
  }

  sortAnecdotes = (anecdotes) => {
    anecdotes.sort((a, b) =>{
      if (a.votes < b.votes) return 1
      else if (a.votes > b.votes) return -1
      else return 0
    })
    return anecdotes
  }

  render() {
    const anecdotes = this.sortAnecdotes(this.props.store.getState())
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.createAnecdote}>
          <div><input name='text' /></div>
          <button type='submit'>create</button>
        </form>
      </div>
    )
  }
}

export default App
