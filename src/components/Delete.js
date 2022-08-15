import React from "react";

const Delete = ({ todo, id, dispatch, done }) => {
  return (
    <div>
      <span
        style={{
          textDecoration: done ? "line-through" : "none",
          color: done ? "gray" : "black",
        }}
        onClick={() => dispatch({ type: "CHECKED", payload: { id } })}
      >
        {todo}
      </span>
      <button
        onClick={() => {
          dispatch({ type: "DELETE", payload: { id } });
        }}
      >
        삭제
      </button>
    </div>
  );
};

export default Delete;
