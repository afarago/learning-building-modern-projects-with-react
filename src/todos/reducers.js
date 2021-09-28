import {
  CREATE_TODO,
  REMOVE_TODO,
  MARK_TODO_AS_COMPLETED,
  LOAD_TODOS_IN_PROGRESS,
  LOAD_TODOS_SUCCESS,
  LOAD_TODOS_FAILURE,
} from "./actions";

export const isLoading = (state = false, action) => {
  const { type } = action;
  switch (type) {
    case LOAD_TODOS_IN_PROGRESS:
      return true;
    case LOAD_TODOS_SUCCESS:
    case LOAD_TODOS_FAILURE:
      return false;
    default:
      return state;
  }
};

// reducer is a function
// aim: take the current state of the Redux store and combine it with an action to
//   provide an updated version of the state
// any action is fired anywhere, out function is call, it can change the state based on the action
// reducer take the action adn state and decide what the new state will be
export const todos = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_TODO: {
      const { todo } = payload;
      if (todo) {
        // best practice: keep Redux actions and async operations out of your reducers, such as fetching data
        // const newTodo = { text, isCompleted: false };
        // return state.concat(newTodo); // important not to mutate the state!
        return state.concat(todo);
      } else {
        return state;
      }
    }
    case REMOVE_TODO: {
      const { todo: removedTodo } = payload;
      return state.filter((todo) => todo.id !== removedTodo.id);
    }
    case MARK_TODO_AS_COMPLETED: {
      const { todo: updatedTodo } = payload;
      return state.map((todo) => {
        todo.id === updatedTodo.id ? updatedTodo : todo;
      });
    }
    case LOAD_TODOS_SUCCESS: {
      const { todos } = payload;
      return todos;
    }

    case LOAD_TODOS_IN_PROGRESS:
    case LOAD_TODOS_FAILURE:
    default:
      return state;
  }
};
