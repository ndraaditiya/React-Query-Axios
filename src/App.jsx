import React, { useRef } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAllTodosFn, postTodoFn } from './api'
import TodoItem from './TodoItem'
import './App.css'

function App() {
  const inputRef = useRef()
  const queryClient = useQueryClient()

  const { isLoading, isError, error, data: todos } = useQuery({
    queryKey: ['todos'],
    queryFn: ({ signal }) => getAllTodosFn(signal),
    select: (data) => data?.data
  })

  const { isLoading: isLoadingAddTodo, mutate: addTodo } = useMutation(
    (data) => postTodoFn(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['todos'])
        inputRef.current.value = ''
      }
    }
  )

  if (isLoading) return 'Loading...'

  if (isError) return `${error.message}`

  const handleAddTodo = () => {
    const data = {
      todoName: inputRef.current.value,
      isComplete: false
    }

    addTodo(data)
  }

  return (
    <div>
      <h2>TODO APP</h2>
      <div className='input-form'>
        <span>
          <input type='text' ref={inputRef} />
          <button onClick={handleAddTodo}>Add Todo</button>
        </span>
      </div>
      <div className='content-container'>
        {todos && todos.map((todo, i) => <TodoItem key={i} {...todo} />)}
      </div>
    </div>
  )
}

export default App
