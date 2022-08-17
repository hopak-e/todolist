import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { BsPlusCircle, BsTrash, BsCheckCircle } from "react-icons/bs";

const List = () => {
  const [value, setValue] = useState("");
  const [list, setList] = useState("");
  const [check, setCheck] = useState(true);

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    axios.get(`http://localhost:3001/comments`).then((res) => {
      setList(res.data);
    });
  };

  const onChangeHandler = (e) => {
    setValue(e.target.value);
  };

  const onSumbitHandler = (e) => {
    e.preventDefault();
    const data = {
      id: new Date(),
      body: value,
      isDone: false,
    };
    if (e.key === "Enter" && value) {
      axios.post(`http://localhost:3001/comments`, data).then((res) => {
        getList();
        setValue("");
      });
    }
  };

  const onClickHandler = (e) => {
    e.preventDefault();
    const data = {
      id: new Date(),
      body: value,
      isDone: false,
    };
    if (value)
      axios.post(`http://localhost:3001/comments`, data).then((res) => {
        getList();
        setValue("");
      });
  };

  const deleteHandler = (e) => {
    axios.delete(`http://localhost:3001/comments/${e}`).then((res) => {
      getList();
    });
  };

  const checkHandler = (id) => {
    const idDone = id.isDone;
    axios
      .patch(`http://localhost:3001/comments/${id}`)
      .then((res) => getList());
  };

  return (
    <Container>
      <H1>Todolist</H1>
      <P>오늘의 할 일 : {list.length}</P>
      <Create>
        <input
          type="text"
          placeholder="할 일 적어"
          value={value}
          onChange={onChangeHandler}
          onKeyUp={onSumbitHandler}
        />
        <button onClick={onClickHandler}>
          <BsPlusCircle />
        </button>
      </Create>

      {list &&
        list.map((el) => {
          return (
            <Todos key={el.id}>
              <BsCheckCircle onClick={() => checkHandler(el.id)} />
              <span>{el.body}</span>
              <button onClick={() => deleteHandler(el.id)}>
                <BsTrash />
              </button>
            </Todos>
          );
        })}
    </Container>
  );
};
const Container = styled.div`
  background-color: white;
  border: 1px solid black;
  border-radius: 30px;
  width: 500px;
  height: 650px;
  position: relative;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 30px;
`;
const Create = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 30px;
  > input {
    width: 400px;
    height: 40px;
    border-top: none;
    border-bottom: 2px solid green;
    border-left: none;
    border-right: none;
    font-size: 25px;
    padding-left: 10px;
  }
  > button {
    border: none;
    background-color: white;
    display: flex;
    align-items: center;
    font-size: 25px;
    margin-left: 10px;
  }
`;
const Todos = styled.div`
  text-align: center;
  display: flex;
  align-items: center;

  border-radius: 15px;
  background-color: #e9ecef;
  height: 40px;
  padding-left: 10px;
  padding-right: 10px;
  margin-left: 30px;
  margin-right: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
  > span {
    margin-left: 10px;
  }
  > button {
    border: none;
    padding-top: 5px;
    background-color: #e9ecef;
    font-size: 20px;
    position: absolute;
    right: 40px;
  }
`;
const H1 = styled.h1`
  text-align: center;
`;
const P = styled.p`
  margin-left: 30px;
`;
export default List;
