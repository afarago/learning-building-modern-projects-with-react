import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import TodoListItem from "./TodoListItem.js";
import NewTodoForm from "./NewTodoForm.js";
import {
  loadTodos,
  removeTodoRequest,
  markTodoAsCompletedRequest,
} from "./thunks";
import {
  getTodosLoading,
  getCompletedTodos,
  getIncompleteTodos,
} from "./selectors";


/* STYLED COMPONENTS --------------------------------
// // `` -> tag function
// const BigRedText = styled.div`
//   font-size: 48px;
//   color: #ff0000;
// `;
-------------------------------- */

const ListWrapper = styled.div`
  max-width: 700px;
  margin: auto;
`;

export const TodoList = ({
  completedTodos,
  incompleteTodos,
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
    <ListWrapper>
      <NewTodoForm />
      <h3>Incomplete:</h3>
      {incompleteTodos.map((todo, key) => (
        <TodoListItem
          todo={todo}
          onRemovePressed={onRemovePressed}
          onCompletedPressed={onCompletedPressed}
          key={key}
        />
      ))}
      <h3>Completed:</h3>
      {completedTodos.map((todo, key) => (
        <TodoListItem
          todo={todo}
          onRemovePressed={onRemovePressed}
          onCompletedPressed={onCompletedPressed}
          key={key}
        />
      ))}
    </ListWrapper>
  );
  return isLoading ? loadingMessage : content;
};

// NewTodoForm component gets access to the todos in our global state
const mapStateToProps = (state) => ({
  completedTodos: getCompletedTodos(state),
  incompleteTodos: getIncompleteTodos(state),
  isLoading: getTodosLoading(state),
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
