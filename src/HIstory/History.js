import classes from "./history.module.css";
import axios from "axios";

const History = (props) => {
  console.log(props.listOfWinner);

  const deleteOneGame = (key) => {
    axios.delete(
      `https://kulko-krzyzyk-default-rtdb.firebaseio.com/history/${key}.json`
    );
  };

  // const loadGamesHistory = () => {
  //   axios
  //     .get("https://kulko-krzyzyk-default-rtdb.firebaseio.com/history.json")
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch();
  // };

  // if (props.show) {
  //   // loadGamesHistory();
  //   if (gameHistory) {
  //     const games = Object.keys(gameHistory.data).map((key) => {
  //       const game = gameHistory.data[key];
  //       return (
  //         <li key={key}>
  //           {game.player1}: {game.player1Count} - {game.player2}:{" "}
  //           {game.player2Count} <br /> ({game.data})
  //           <div
  //             onClick={() => deleteOneGame(key)}
  //             className={classes.CloseIcon}
  //           >
  //             <div></div>
  //             <div></div>
  //           </div>
  //         </li>
  //       );
  //     });
  //   } else {
  //     const game = (
  //       <li style={{ justifyContent: "center", color: "red" }}>
  //         No history yet
  //       </li>
  //     );
  //   }
  // }

  // useEffect(() => {
  //   loadGamesHistory();
  // }, []);

  return (
    <div
      className={classes.History}
      style={{
        transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.show ? "1" : "0",
      }}
    >
      <h1>HISTORY</h1>
      {Object.keys(props.listOfWinner).map((key) => {
        const list = props.listOfWinner[key];
        return (
          <ul
            key={list.id}
          >{`${list.data}, ${list.player1}=${list.player1Count} / ${list.player2}=${list.player2Count}`}</ul>
        );
      })}
    </div>
  );
};
// }

export default History;
