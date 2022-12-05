import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./styles.css";
import { Actions } from "./../reducer/ToDoReducer";

type Props = {
  toDo: Todo;
  toDos: Todo[];
  dispatch: React.Dispatch<Actions>;
};

const SingleTodo = ({ toDo, dispatch }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editToDo, setEditToDo] = useState<string>(toDo.toDo);

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: "edit", payload: { id: toDo.id, toDo: editToDo } });
    setEdit(false);
  };

  const handleDelete = () => {
    dispatch({ type: "remove", payload: toDo.id });
  };

  const handleDone = () => {
    dispatch({ type: "done", payload: toDo.id });
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <form className="todos_single" onSubmit={(e) => handleEdit(e)}>
      {edit ? (
        <input
          ref={inputRef}
          value={editToDo}
          onChange={(event) => {
            setEditToDo(event.target.value);
          }}
          className="todos_single--text"
        />
      ) : toDo.isDone ? (
        <s className="todos_single--text">{toDo.toDo} </s>
      ) : (
        <span className="todos_single--text">{toDo.toDo} </span>
      )}
      <div>
        <span
          className="icon"
          onClick={() => {
            if (!edit && !toDo.isDone) {
              setEdit(!edit);
            }
          }}
        >
          <AiFillEdit></AiFillEdit>
        </span>
        <span className="icon" onClick={() => handleDelete()}>
          <AiFillDelete></AiFillDelete>
        </span>
        <span className="icon" onClick={() => handleDone()}>
          <MdDone></MdDone>
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
