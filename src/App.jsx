import { useRef } from 'react'
import { useGetTodos, usePostTodo } from './services'
import TodoItem from './TodoItem'
import './App.css'

function App() {

  const inputRef = useRef()
  const { todos, isLoading, isError, error } = useGetTodos()
  const {
    isCreating,
    isSuccessCreating,
    isErrorCreating,
    errorCreateing,
    CreateTodo
  } = usePostTodo()

  if (isSuccessCreating) inputRef.current.value = ''

  const handleAddTodo = () => {
    const data = {
      todoName: inputRef.current.value,
      isComplete: false
    }

    CreateTodo(data)
  }

  return (
    <div className='App'>
      <h2>TODO APP</h2>
      <div className='input-form'>
        <span>
          <input type='text' ref={inputRef} />
          <button onClick={handleAddTodo}>Add Todo</button>
        </span>
        {isErrorCreating && <p>{errorCreateing.message}</p>}
      </div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>{error.message}</p>}
      <div className='content-container'>
        {todos && todos.map((todo, i) => <TodoItem key={i} {...todo} />)}
      </div>
      {isCreating && <p>Loading..</p>}
    </div>
  )
}

export default App
