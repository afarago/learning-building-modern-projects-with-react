export const CREATE_TODO = "CREATE_TODO";
// this is action creator - abstracts away all actual code for actions
export const createTodo = (text) => ({
  type: CREATE_TODO,
  payload: { text },
});

export const REMOVE_TODO = "REMOVE_TODO";
export const removeTodo = (text) => ({
  type: REMOVE_TODO,
  // unique id is text - not ideal, bot for this iteration is OK.
  payload: { text },
});

export const MARK_TODO_AS_COMPLETED = "MARK_TODO_AS_COMPLETED";
export const markTodoAsCompleted = (text) => ({
  type: MARK_TODO_AS_COMPLETED,
  // unique id is text - not ideal, bot for this iteration is OK.
  payload: { text },
});
