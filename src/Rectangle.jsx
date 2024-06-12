import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import io from "socket.io-client";

export const Rectangle = () => {
  const socket = useRef(null);

  const [touchedIndices, setTouchedIndices] = useState(Array(9).fill(null));
  const [currentUser, setCurrentUser] = useState("user1");

  useEffect(() => {
    socket.current = io("http://localhost:5000");
    // socket.current.on("user", (user) => {
    //   console.log(user);
    // });
  }, []);

  const handleTouch = (index, currentUser) => {
    if (touchedIndices[index] === null) {
      const newTouchedIndices = [...touchedIndices];
      newTouchedIndices[index] = currentUser === "user1" ? "〇" : "X";
      setTouchedIndices(newTouchedIndices);
      setCurrentUser(currentUser === "user1" ? "user2" : "user1");
      socket.current.emit("value", newTouchedIndices);
      socket.current.emit("user", currentUser === "user1" ? "user2" : "user1");
    }
  };

  const handleReset = () => {
    setTouchedIndices(Array(9).fill(null));
    setCurrentUser("user1");
  };

  const rectangle = (index) => {
    return (
      <div key={index}>
        <div
          className="rectangle"
          onClick={() => handleTouch(index, currentUser)}
        >
          {touchedIndices[index] && (
            <div className="circle">
              <div className="circleText">{touchedIndices[index]}</div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="con">
      <div className="container">
        {[...Array(9)].map((_, index) => rectangle(index))}
        <p>現在のプレイヤー : {currentUser}</p>
        <button onClick={handleReset}>reset</button>
      </div>
    </div>
  );
};
