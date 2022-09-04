/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getName } from "../redux/actions/index.js";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function SearchBar() {
  // const [name, setName] = useState("");

  // const handlerInput = (e) => {
  //   e.preventDefault();
  //   const value = e.target.value;
  //   const value2 = value.charAt(0).toUpperCase() + value.slice(1);
  //   setName(value2);
  // };

  // const handlerButton = (e) => {
  //   e.preventDefault();
  //   setName("");
  // };

  const styles = {
    button: {
      color: "white",
    },
    input: {
      padding: "7px",
    },
  };

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  // const services = useSelector()
  function handleInput(e) {
    e.preventDefault();
    const value = e.target.value;
    const value2 = value.charAt(0).toUpperCase() + value.slice(1);
    setName(value2);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getName(name));

    setName("");
  }

  return (
    <div>
      <input
        style={styles.input}
        placeholder="Buscar Servicio..."
        type="text"
        value={name}
        onChange={(e) => handleInput(e)}
      ></input>
      <Button
        style={styles.button}
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        <SearchIcon></SearchIcon>
      </Button>
    </div>
  );
}
