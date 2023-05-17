import { httpServer } from "./src/http_server/index";
import { left, mouse } from "@nut-tree/nut-js";
import WebSocket, { WebSocketServer } from "ws";

const HTTP_PORT = 8181;
const WS_PORT = 8080;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wsServer = new WebSocketServer({ port: WS_PORT });

const onConnect = (wsClient: WebSocket.WebSocket) => {
  console.log("connect");
  wsClient.on("message", (message) => {
    console.log(message.toString());
    const [command, value1, value2] = message.toString().split(" ");
    if (command === "mouse_left") {
      (async () => {
        await mouse.move(left(+value1));
      })();
    }
  });
};
wsServer.on("connection", onConnect);
