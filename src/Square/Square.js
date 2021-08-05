import React from "react";
import classes from "../Square/Square.module.css";

const square = (props) => {
  let isWin = props.isWin ? classes.IsWin : null;
  let isColor = props.isCircle ? classes.FirstColor : classes.SecondColor;
  let isStandoff = props.isStandoff ? classes.IsStandoff : null;

  let value = "";

  if (props.value !== 0) {
    value = props.value === 1 ? "O" : "X";
    isColor = props.value === 1 ? classes.FirstColor : classes.SecondColor;
  }

  let style = [classes.Square, isWin, isStandoff, isColor];

  const x = props.keyValue;
  switch (true) {
    case x === 1 || x === 7:
      style.push(classes.FirstLine);
      break;
    case x === 3 || x === 5:
      style.push(classes.SecondLine);
      break;
    case x === 4:
      style.push(classes.CentralQuad);
      break;
    default:
      break;
  }

  return (
    <div className={style.join(" ")} onClick={props.onClick}>
      {value}
    </div>
  );
};

export default square;
