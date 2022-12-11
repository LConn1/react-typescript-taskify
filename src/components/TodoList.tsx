import React from "react";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";
import "./styles.css";
import { Actions } from "./../reducer/ToDoReducer";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  toDos: Todo[];
  dispatch: React.Dispatch<Actions>;
  completedToDos: Todo[];
  setCompletedToDos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({
  toDos,
  dispatch,
  completedToDos,
  setCompletedToDos,
}) => {
  return (
    <div className="container">
      <Droppable droppableId="ToDosList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragActive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Active Tasks</span>
            {toDos.map((toDo, index) => (
              <SingleTodo
                index={index}
                toDo={toDo}
                key={toDo.id}
                toDos={toDos}
                dispatch={dispatch}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="ToDosRemove">
        {(provided, snapshot) => (
          <div
            className={`todos remove ${
              snapshot.isDraggingOver ? "dragComplete" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Completed Tasks</span>
            {completedToDos.map((toDo, index) => (
              <SingleTodo
                index={index}
                toDo={toDo}
                key={toDo.id}
                toDos={completedToDos}
                dispatch={dispatch}
                setCompletedToDos={setCompletedToDos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
