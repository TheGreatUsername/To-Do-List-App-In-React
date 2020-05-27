import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import uuidv4 from "uuid/v4";

const localStorageKey = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(localStorageKey));
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === "") return;
    console.log(name);
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        { id: uuidv4(), name: name, complete: false, toremove: false },
      ];
    });
    todoNameRef.current.value = null;
  }

  function handleClearTodos() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }

  function handleKeyPress(event) {
    if (event.which === 13 || event.keyCode === 13) {
      handleAddTodo(null);
    }
  }

  return (
    <>
      <div style={{ margin: "auto", maxWidth: "500px" }}>
        <h1 style={{ color: "white", margin: "1vh" }}>To Do List</h1>
        <hr></hr>
        <TodoList todos={todos} toggleTodo={toggleTodo} />
        <hr></hr>
        <div style={{ display: "flex", marginBottom: "0.3rem" }}>
          <input
            ref={todoNameRef}
            type="text"
            onKeyPress={handleKeyPress}
            placeholder="Enter new todo here"
            style={textboxstyle}
          />

          <button onClick={handleAddTodo} style={addbuttonstyle}>
            Add Todo
          </button>
        </div>
        <div>
          <button onClick={handleClearTodos} style={clearbuttonstyle}>
            Clear Completed Todos
          </button>
        </div>

        <div style={alertstyle}>
          {todos.filter((todo) => !todo.complete).length} left to do
        </div>
      </div>
    </>
  );
}

const fontsize = "2vh";

const textboxstyle = {
  border: "none",
  paddingLeft: "7px",
  flexGrow: 1,
  borderRadius: "1rem",
  fontSize: fontsize,
};

const addbuttonstyle = {
  borderColor: "steelblue",
  borderRadius: "1rem",
  fontSize: fontsize,
};

const clearbuttonstyle = {
  borderColor: "steelblue",
  width: "100%",
  borderRadius: "1rem",
  fontSize: fontsize,
};

const alertstyle = {
  border: "3px white",
  float: "center",
  color: "white",
  textAlign: "center",
  margin: "5px",
};

export default App;
