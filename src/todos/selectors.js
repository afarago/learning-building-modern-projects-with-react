/*
SELECTORS abstract the state's format transforming state data
*/

import { createSelector } from "reselect";

// selectors - space to transform data from what store has to what components can use
export const getTodos = (state) => state.todos.data;
export const getTodosLoading = (state) => state.todos.isLoading;

// "higher order selectors" have no idea on how the data is structured in the store - getTodos serve as an interface
// these are pure functions - thus should spare second call on the same to spare computational power 
//      creatSelector makes sure data is not recompoted twice behind the scene
export const getIncompleteTodos = createSelector(getTodos, (todos) =>
  todos.filter((todo) => !todo.isCompleted)
);

export const getCompletedTodos = createSelector(getTodos, (todos) =>
  todos.filter((todo) => todo.isCompleted)
);
