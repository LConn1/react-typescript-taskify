import { Todo } from "./../model";

export type Actions =
  | { type: "add"; payload: string }
  | { type: "edit"; payload: { id: number; toDo: string } }
  | { type: "done"; payload: number }
  | { type: "remove"; payload: number };

export const ToDoReducer = (state: Todo[], action: Actions) => {
  switch (action.type) {
    case "add":
      return [
        ...state,
        { id: Date.now(), toDo: action.payload, isDone: false },
      ];
    case "remove":
      return state.filter((toDo) => toDo.id !== action.payload);
    case "edit":
      return state.map((toDo) =>
        toDo.id === action.payload.id
          ? { ...toDo, toDo: action.payload.toDo }
          : toDo
      );
    case "done":
      return state.map((toDo) =>
        toDo.id === action.payload ? { ...toDo, isDone: !toDo.isDone } : toDo
      );
    default:
      return state;
  }
};
