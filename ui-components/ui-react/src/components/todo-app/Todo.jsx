import { useState, useRef } from "react";
export default function Todo() {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef("");

  const handleAddTodo = () => {
    if (inputRef.current.value.trim()) {
      const title = inputRef.current.value;
      setTodos((previousTodos) => {
        const todo = {
          id: Date.now(),
          title,
          isCompleted: false,
        };

        return [todo, ...previousTodos];
      });
      inputRef.current.value = "";
    }
  };

  const handleDelete = (id) => {
    setTodos((previousTodos) => {
      const updatedTodos = previousTodos.filter((todo) => todo.id !== id);

      return updatedTodos;
    });
  };

  const markAsComplete = (id) => {
    setTodos((previousTodos) => {
      const index = previousTodos.findIndex((todo) => todo.id === id);
      if (index >= 0) {
        const todo = {
          ...previousTodos[index],
          isCompleted: !previousTodos[index].isCompleted,
        };

        return previousTodos.toSpliced(index, 1, todo);
      }
      return previousTodos;
    });
  };
  let todoList = <p>No todo found!</p>;

  if (todos.length) {
    todoList = todos.map((todo) => (
      <li
        key={todo.id}
        style={{ backgroundColor: todo.isCompleted ? "green" : "#fff" }}
      >
        <span>{todo.title}</span>
        <button type="button" onClick={() => handleDelete(todo.id)}>
          X
        </button>
        <button type="button" onClick={() => markAsComplete(todo.id)}>
          Toggle Completed
        </button>
      </li>
    ));
  }

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input ref={inputRef} type="text" placeholder="Add your task" />
        <div>
          <button onClick={handleAddTodo}>Submit</button>
        </div>
      </div>
      <ul>{todoList}</ul>
    </div>
  );
}
