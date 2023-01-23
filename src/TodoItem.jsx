import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTodoFn, updateTodoFn } from './api'

const TodoItem = ({ _id, todoName, isComplete }) => {
  const queryClient = useQueryClient()
  const { mutate: deleteTodo } = useMutation(
    (id) => deleteTodoFn(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['todos'])
      }
    }
  )

  const { isLoading, mutate: updateTodo } = useMutation(
    ({ id, data }) => updateTodoFn({ id, data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['todos'])
      }
    }
  )

  const handleUpdateTodo = (id, isComplete) => {
    const data = { isComplete: !isComplete }
    updateTodo({ id, data })
  }

  return (
    <>
      <p className='contents'>
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          <>
            <span style={{ textDecoration: isComplete ? 'line-through' : 'none' }}>{todoName}</span>
            <span>
              <input type='checkbox' checked={isComplete ? true : false} onChange={() => handleUpdateTodo(_id, isComplete)} />
              <i className="fa-solid fa-trash" onClick={() => deleteTodo(_id)}></i>
            </span>
          </>
        )}
      </p>
      <hr />
    </>
  )
}

export default TodoItem
