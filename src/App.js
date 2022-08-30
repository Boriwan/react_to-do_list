import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import Button from 'react-bootstrap/Button';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  //load saved todos upon refresh
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(prevTodos => [...prevTodos, ...storedTodos])
  }, [])

  //save todos
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  //toggle todos
  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  //add new todos
  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    var id = "id" + Math.random().toString(16).slice(2)
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: id, name: name, complete: false }]
    })
    todoNameRef.current.value = null
  }

  //clear finished todos
  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <h1 className="text-center">To-Do List⚛</h1>

      <div className="d-flex flex-row justify-content-center align-items-center">
        <div>
          <input ref={todoNameRef} type="text" />
          <Button onClick={handleAddTodo}>Add+</Button>
          <Button variant="danger" onClick={handleClearTodos}>Clear Completed Tasks</Button>
          <TodoList todos={todos} toggleTodo={toggleTodo} />
          <p>{todos.filter(todo => !todo.complete).length} left to do</p>
        </div>
      </div>
    </>
  )
}

export default App;
