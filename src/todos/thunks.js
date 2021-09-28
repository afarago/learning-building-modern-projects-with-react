import {
  loadTodosInProgress,
  loadTodosSuccess,
  loadTodosFailure,
  createTodo,
  removeTodo,
  markTodoAsCompleted,
} from "./actions";

// in Redux, a thunk is simply a function that returns another function, which contains the actual logic that we want to perform when it's triggered.
export const displayAlert = (text) => () => {
  alert(text);
};

//const delay = ms => new Promise(res => setTimeout(res, ms));
// helper usage: await delay(2000);

export const loadTodos = () => async (dispatch, getState) => {
  try {
    dispatch(loadTodosInProgress());
    const response = await fetch("http://localhost:8080/todos");
    const todos = await response.json();

    dispatch(loadTodosSuccess(todos));
  } catch (e) {
    dispatch(loadTodosFailure());
    dispatch(displayAlert, e);
  }
};

export const addTodoRequest = (text) => async (dispatch) => {
  try {
    const body = JSON.stringify({ text });
    const response = await fetch("http://localhost:8080/todos", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body,
    });
    const todo = await response.json();

    dispatch(createTodo(todo));
  } catch (e) {
    dispatch(displayAlert, e);
  }
};

export const removeTodoRequest = (id) => async (dispatch) => {
  try {
    const body = JSON.stringify({ id });
    const response = await fetch(`http://localhost:8080/todos/${id}`, {
      headers: { "Content-Type": "application/json" },
      method: "DELETE",
      body,
    });
    const removedTodo = await response.json();

    dispatch(removeTodo(removedTodo));
  } catch (e) {
    dispatch(displayAlert, e);
  }
};

export const markTodoAsCompletedRequest = (id) => async (dispatch) => {
  try {
    const body = JSON.stringify({ id });
    const response = await fetch(
      `http://localhost:8080/todos/${id}/completed`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body,
      }
    );
    const todo = await response.json();

    dispatch(markTodoAsCompleted(todo));
  } catch (e) {
    dispatch(displayAlert, e);
  }
};
