import axios from "axios";

const url = 'https://odd-blue-yak-slip.cyclic.app/'

export const API = axios.create({
  baseURL: url
})

export const getAllTodosFn = async () => {
  const res = await API.get('todos')
  return res.data
}

export const postTodoFn = async (data) => {
  const res = await API.post('todos', data)
  return res.data
}

export const deleteTodoFn = async (id) => {
  const res = await API.delete(`todos/${id}`)
  return res.data
}

export const updateTodoFn = async ({ id, data }) => {
  const res = await API.put(`todos/${id}`, data)
  return res.data
}