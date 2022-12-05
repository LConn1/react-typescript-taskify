import React, { useReducer, useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { ToDoReducer } from "./reducer/ToDoReducer";

const MyContext = React.createContext({});

const App: React.FC = () => {
  const [toDo, setToDo] = useState<string>("");
  const [state, dispatch] = useReducer(ToDoReducer, []);

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

  return (
    <MyContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField toDo={toDo} setToDo={setToDo} handleAdd={handleAdd} />
        <TodoList toDos={state} dispatch={dispatch}></TodoList>
      </div>
    </MyContext.Provider>
  );
};

export default App;
