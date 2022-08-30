import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(prevTodos => [...prevTodos, ...storedTodos])
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    var id = "id" + Math.random().toString(16).slice(2)
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: id, name: name, complete: false }]
    })
    todoNameRef.current.value = null
  }

  return (
    <>
      <h1>My React Native To-Do List⚛</h1>
      <TodoList todos={todos} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add+</button>
      <button>Finished</button>
      <div>0 left to do</div>
    </>
  )
}

export default App;
