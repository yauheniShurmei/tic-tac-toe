import classes from "./history.module.css";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";

const History = (props) => {
  const [listOfWinner, setListOfWinner] = useState();
  const [isLoad, setIsLoad] = useState();
  console.log("HISTORY COMPONENT IS LOASDED");

  const deleteOneGame = (key) => {
    axios
      .delete(
        `https://kulko-krzyzyk-default-rtdb.firebaseio.com/history/${key}.json`
      )
      .then((res) => {
        loadGamesHistory();
      });
  };

  const loadGamesHistory = useCallback(() => {
    console.log("LOAD GAMESHISTORY FUNCTION");
    axios
      .get("https://kulko-krzyzyk-default-rtdb.firebaseio.com/history.json")
      .then((res) => {
        setIsLoad(false);
        setListOfWinner(res.data);
        setIsLoad(true);
      })
      .catch();
  }, []);

  let list = (
    <li style={{ justifyContent: "center", color: "red" }}>No history yet</li>
  );

  if (listOfWinner) {
    list = Object.keys(listOfWinner).map((key) => {
      const list = listOfWinner[key];
      return (
        <li key={list.id}>
          {`${list.data}, ${list.player1}=${list.player1Count} / ${list.player2}=${list.player2Count}`}
          <div onClick={() => deleteOneGame(key)} className={classes.CloseIcon}>
            <div></div>
            <div></div>
          </div>
        </li>
      );
    });
  }

  useEffect(() => {
    props.show && loadGamesHistory();
  }, [loadGamesHistory, props.show]);

  return (
    <div
      className={classes.History}
      style={{
        transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.show ? "1" : "0",
      }}
    >
      <h1>HISTORY</h1>
      {!isLoad && (
        <li style={{ justifyContent: "center", color: "red" }}>
          No history yet
        </li>
      )}
      {isLoad && list}
    </div>
  );
};

export default History;
