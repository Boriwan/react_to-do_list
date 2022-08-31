import React from 'react'

export default function Todo({ todo, toggleTodo }) {
    function handleTodoClick() {
        toggleTodo(todo.id)
    }
    return (
        <>
                <div className='card'>
                    <div class='card-body'>
                        <label className='d-flex justify-content-between'>
                            <input type='checkbox' checked={todo.complete} onChange={handleTodoClick} />
                            <h5 className='card-title'>{todo.name}</h5>
                        </label>
                    </div>
                </div>
        </>
    )
}