import React, { useReducer, useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { Todo } from "./model";
import { ToDoReducer } from "./reducer/ToDoReducer";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [toDo, setToDo] = useState<string>("");
  const [completedToDos, setCompletedToDos] = useState<Todo[]>([]);
  const [toDos, dispatch] = useReducer(ToDoReducer, []);

  const handleAdd = (e: React.FormEvent) => {
    /*
    By default, the browser will refresh the page when a
    form submission event is triggered. We generally want to avoid this
    in React.js applications because it would cause us to lose our state.
    */
    e.preventDefault();
    dispatch({ type: "add", payload: toDo });
    setToDo("");
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    let add,
      active = toDos,
      complete = completedToDos;

    if (source.droppableId === "ToDosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "ToDosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 1, add);
    }

    setCompletedToDos(complete);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField toDo={toDo} setToDo={setToDo} handleAdd={handleAdd} />
        <TodoList
          toDos={toDos}
          dispatch={dispatch}
          completedToDos={completedToDos}
          setCompletedToDos={setCompletedToDos}
        ></TodoList>
      </div>
    </DragDropContext>
  );
};

export default App;
