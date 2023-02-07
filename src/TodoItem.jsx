import { useDelteTodo, useUpdateTodo } from './services'

const TodoItem = ({ _id, todoName, isComplete }) => {
  const {
    isUpdating,
    isErrorUpdating,
    errorUpdating,
    UpdateTodo
  } = useUpdateTodo()

  const {
    isDeleting,
    isErrorDeleting,
    errorDeleting,
    DeleteTodo
  } = useDelteTodo()

  const handleUpdateTodo = (id, isComplete) => {
    const data = { isComplete: !isComplete }
    UpdateTodo({ id, data })
  }

  return (
    <>
      <p className='contents'>
        {isUpdating || isErrorUpdating ? (
          <span>{isUpdating ? 'Updating...' : errorUpdating}</span>
        ) : isDeleting || isErrorDeleting ? (
          <span>{isDeleting ? 'Deleting...' : errorDeleting}</span>
        ) : (
          <>
            <span style={{ textDecoration: isComplete ? 'line-through' : 'none' }}>{todoName}</span>
            <span>
              <input type='checkbox' checked={isComplete ? true : false} onChange={() => handleUpdateTodo(_id, isComplete)} />
              <i className="fa-solid fa-trash" onClick={() => DeleteTodo(_id)}></i>
            </span>
          </>
        )}
      </p>
      <hr />
    </>
  )
}

export default TodoItem
