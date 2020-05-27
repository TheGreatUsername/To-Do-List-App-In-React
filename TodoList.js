import React from "react";
import Todo from "./Todo";
import {
  Transition,
  animated,
} from "react-spring/renderprops";

export default function TodoList({ todos, toggleTodo }) {
  const items = todos.map((todo) => {
    return <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo} />;
  });
  return (
    <Transition
      native
      items={items}
      keys={(item) => item.key}
      from={{ opacity: 0, marginLeft: 500 }}
      enter={{ opacity: 1, marginLeft: 0 }}
      leave={{ opacity: 0, marginLeft: -100 }}
    >
      {(item) => (props) => (
        <animated.div key={item.id} style={props}>
          {item}
        </animated.div>
      )}
    </Transition>
  );
}
