import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { addTodoRequest } from "./thunks";
import { getTodos } from "./selectors";

const NewTodoFormContainer = styled.div`
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 4px 8px grey;
`;

const NewTodoInput = styled.input`
  font-size: 16px;
  padding: 8px;
  border: none;
  border-bottom: 2px solid #ddd;
  border-radius: 8px;
  width: 70%;
  outline: none;
`;

const NewTodoButton = styled.button`
  font-size: 16px;
  padding: 8px;
  border: none;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  margin-left: 8px;
  width: 20%;
  background-color: #22ee22;
`;

// best practices: export both connected and unconnected version for testing + app usage
export const NewTodoForm = ({ todos, onCreatePressed }) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <NewTodoFormContainer>
      <NewTodoInput
        type="text"
        placeholder="Type your new todo here..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <NewTodoButton
        onClick={() => {
          const isDuplicateText = todos.some(
            (todo) => todo.text === inputValue
          );
          if (!isDuplicateText) {
            onCreatePressed(inputValue);
            setInputValue("");
          }
        }}
      >
        Create Todo
      </NewTodoButton>
    </NewTodoFormContainer>
  );
};

// NewTodoForm component gets access to the todos in our global state
const mapStateToProps = (state) => ({
  todos: getTodos(state),
});

// allows component to trigger actions that the redux store will respond to
const mapDispatchToProps = (dispatch) => ({
  onCreatePressed: (text) => dispatch(addTodoRequest(text)),
});

// connect()() - higher order function
export default connect(mapStateToProps, mapDispatchToProps)(NewTodoForm);
