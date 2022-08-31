import React from 'react'

export default function Todo({ todo, toggleTodo }) {
    function handleTodoClick() {
        toggleTodo(todo.id)
    }
    return (
        <>
            <div className='d-flex flex-column mt-4 mb-4'>
                <div className='card'>
                    <div class='card-body'>
                        <div className='form-check'>
                        <input className='form-check-input' type='checkbox' checked={todo.complete} onChange={handleTodoClick} />
                            <label className='form-check-label'>
                                {todo.name}
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}