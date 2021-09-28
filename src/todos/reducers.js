import { CREATE_TODO, REMOVE_TODO, MARK_TODO_AS_COMPLETED } from "./actions";

// reducer is a function
// aim: take the current state of the Redux store and combine it with an action to
//   provide an updated version of the state
// any action is fired anywhere, out function is call, it can change the state based on the action
// reducer take the action adn state and decide what the new state will be
export const todos = (state = [], action) => {
  const { type, payload } = action;
  switch (action.type) {
    case CREATE_TODO: {
      const { text } = payload;
      console.log(text);
      if (text) {
        // best practice: keep Redux actions and async operations out of your reducers, such as fetching data
        const newTodo = { text, isCompleted: false };
        return state.concat(newTodo); // important not to mutate the state!
      } else {
        return state;
      }
    }
    case REMOVE_TODO: {
      console.log("REMOVE_TODO called");
      const { text } = payload;
      return state.filter((todo) => todo.text !== text);
    }
    case MARK_TODO_AS_COMPLETED: {
      const { text } = payload;
      return state.map((todo) => {
        if (todo.text === text) {
          return { ...todo, isCompleted: true };
        }
        return todo;
      });
    }
    default:
      return state;
  }
};
