// import io from "socket.io-client";
import { Rectangle } from "./Rectangle";

// const socket = io("http://localhost:5000");

// socket.on("connect", () => {
//   console.log("Connected to server");
// });

// socket.on("connect_error", (error) => {
//   console.error("Connection error:", error);
// });

function App() {
  return (
    <div>
      <Rectangle />
    </div>
  );
}

export default App;
