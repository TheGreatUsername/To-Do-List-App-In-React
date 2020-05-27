import React from "react";

export default function Todo({ todo, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id);
  }

  return (
    <div style={todo.complete ? todostyleselected : todostyle}>
      <label>
        <input
          type="checkbox"
          checked={todo.complete}
          onChange={handleTodoClick}
        />
        {todo.name}
      </label>
    </div>
  );
}

const todostyle = {
  background: "steelblue",
  color: "white",
  padding: "0.5rem",
  paddingLeft: "0",
};

const todostyleselected = {
  background: "steelblue",
  color: "yellow",
  padding: "0.5rem",
  paddingLeft: "0",
};
