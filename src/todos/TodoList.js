import React, { useEffect } from "react";
import TodoListItem from "./TodoListItem.js";
import NewTodoForm from "./NewTodoForm.js";
import { connect } from "react-redux";
import {
  loadTodos,
  removeTodoRequest,
  markTodoAsCompletedRequest,
} from "./thunks";
import "./TodoList.css";

export const TodoList = ({
  todos = [],
  onRemovePressed,
  onCompletedPressed,
  isLoading,
  startLoadingTodos,
}) => {
  useEffect(() => {
    startLoadingTodos();
  }, []);

  const loadingMessage = <div>Loading todos...</div>;
  const content = (
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
  return isLoading ? loadingMessage : content;
};

// NewTodoForm component gets access to the todos in our global state
const mapStateToProps = (state) => ({
  isLoading: state.isLoading,
  todos: state.todos,
});

// allows component to trigger actions that the redux store will respond to
const mapDispatchToProps = (dispatch) => ({
  startLoadingTodos: () => dispatch(loadTodos(dispatch)),
  onRemovePressed: (id) => dispatch(removeTodoRequest(id)),
  onCompletedPressed: (id) => dispatch(markTodoAsCompletedRequest(id)),
});

// best practice: consider which component to connect to Redux store
//  connecting a component to the Redux store makes it less reusable
//  should avoid connecting component to the store if we plan to reuse the component
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
