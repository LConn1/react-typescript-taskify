import React from "react";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";
import "./styles.css";
import { Actions } from "./../reducer/ToDoReducer";

interface Props {
  toDos: Todo[];
  dispatch: React.Dispatch<Actions>;
}

const TodoList: React.FC<Props> = ({ toDos, dispatch }) => {
  return (
    <div className="todos">
      {toDos.map((toDo) => (
        <SingleTodo
          toDo={toDo}
          key={toDo.id}
          toDos={toDos}
          dispatch={dispatch}
        />
      ))}
    </div>
  );
};

export default TodoList;
