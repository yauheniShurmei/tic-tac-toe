import React from "react";
import classes from "./NavBar.module.css";

const navBar = (props) => {
  return (
    <div className={classes.NavBar}>
      <span>O - X</span>
      <button onClick={props.onClick}>History</button>
    </div>
  );
};

export default navBar;
