import React from "react";
import TodoListItem from "./TodoListItem.js";
import NewTodoForm from "./NewTodoForm.js";
import { connect } from "react-redux";
import { removeTodo, markTodoAsCompleted } from "./actions";
import "./TodoList.css";

export const TodoList = ({
  todos = [],
  onRemovePressed,
  onCompletedPressed,
}) => (
  <div className="list-wrapper">
    <NewTodoForm />
    {todos.map((todo, key) => (
      <TodoListItem
        todo={todo}
        onRemovePressed={onRemovePressed}
        onCompletedPressed={onCompletedPressed}
        key={key}
      />
    ))}
  </div>
);

// NewTodoForm component gets access to the todos in our global state
const mapStateToProps = (state) => ({
  todos: state.todos,
});

// allows component to trigger actions that the redux store will respond to
const mapDispatchToProps = (dispatch) => ({
  onRemovePressed: (text) => dispatch(removeTodo(text)),
  onCompletedPressed: (text) => dispatch(markTodoAsCompleted(text)),
});

// best practice: consider which component to connect to Redux store
//  connecting a component to the Redux store makes it less reusable
//  should avoid connecting component to the store if we plan to reuse the component
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
