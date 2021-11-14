import React, { useCallback, useState } from 'react';

import { Todo, todoApi } from './store';

function App() {
  const [value, setValue] = useState<string>('');

  const { data: todos } = todoApi.useGetAllQuery();
  const [deleteTodo] = todoApi.useDeleteTodoMutation();
  const [updateTodo] = todoApi.useUpdateTodoMutation();
  const [addTodo] = todoApi.useAddTodoMutation();

  const onAdd = useCallback(
    (text) => {
      addTodo(text);
      setValue('');
    },
    [addTodo]
  );

  const onToggle = useCallback(
    (todo: Todo) => updateTodo({ ...todo, done: !todo.done }),
    [updateTodo]
  );

  const onDelete = useCallback((todo: Todo) => deleteTodo(todo), [deleteTodo]);

  return (
    <div className='App'>
      <div className='todos'>
        {todos?.map((todo) => (
          <React.Fragment key={todo.id}>
            <div>
              <input
                type='checkbox'
                checked={todo.done}
                onChange={() => onToggle(todo)}
              />
              <span>{todo.text}</span>
            </div>
            <button onClick={() => onDelete(todo)}>Delete</button>
          </React.Fragment>
        ))}
      </div>
      <div className='add'>
        <input
          placeholder='What to do ...'
          type='text'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={() => onAdd(value)}>Add</button>
      </div>
    </div>
  );
}

export default App;
