import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  //load saved tasks upon refresh
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(prevTodos => [...prevTodos, ...storedTodos])
  }, [])

  //save tasks to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  //toggle tasks
  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  //add new task
  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    var id = 'id' + Math.random().toString(16).slice(2)
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
      <h1 className='text-center p-3'>To-Do List⚛</h1>


      <div className='d-flex flex-column justify-content-center align-items-center p-1'>
        <div>
          <div className="input-group mb-3">
            <input className='form-control' ref={todoNameRef} type='text' />
            <div className="input-group-append">
              <button className='btn btn-add' onClick={handleAddTodo}>Add＋</button>
            </div>
          </div>
          <TodoList todos={todos} toggleTodo={toggleTodo} />
          <p>{todos.filter(todo => !todo.complete).length} left to do</p>
          <button className='btn btn-clear' onClick={handleClearTodos}>Clear Completed Tasks 🗑</button>
        </div>
      </div>
    </>
  )
}

export default App;
