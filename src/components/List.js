import React, { useState, useReducer } from "react";
import styled from "styled-components";
import Delete from "./Delete.js";

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE":
      const newTodo = {
        id: Date.now(),
        todo: action.payload.value,
        done: false,
      };
      return {
        count: state.count + 1,
        Todos: [...state.Todos, newTodo],
      };
    case "DELETE":
      return {
        count: state.count - 1,
        Todos: state.Todos.filter((e) => e.id !== action.payload.id),
      };
    case "CHECKED":
      return {
        count: state.count,
        Todos: state.Todos.map((el) => {
          if (el.id === action.payload.id) {
            return { ...el, done: !el.done };
          }
          return el;
        }),
      };
    default:
      throw new Error(`Unabled action type: ${action.type}`);
  }
};

const initialTodo = {
  count: 0,
  Todos: [],
};

const List = () => {
  const [value, setValue] = useState("");
  const [todolist, dispatch] = useReducer(reducer, initialTodo);

  const onChangeHandler = (e) => {
    setValue(e.target.value);
  };

  const onSumbitHandler = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      dispatch({
        type: "CREATE",
        payload: { value },
      });
      setValue("");
    }
  };

  return (
    <>
      <h1>Todolist</h1>
      <p>오늘의 할일 : {todolist.count}</p>
      <Input
        type="text"
        value={value}
        onChange={onChangeHandler}
        onKeyUp={onSumbitHandler}
      />
      <Submit
        onClick={() => {
          dispatch({ type: "CREATE", payload: { value } });
          setValue("");
        }}
      >
        등록
      </Submit>
      {todolist.Todos.map((el) => {
        return (
          <Delete
            key={el.id}
            id={el.id}
            todo={el.todo}
            dispatch={dispatch}
            done={el.done}
          />
        );
      })}
    </>
  );
};

const Input = styled.input``;
const Submit = styled.button``;

export default List;
