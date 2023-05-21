import WebSocket, { WebSocketServer, createWebSocketStream } from "ws";
import wsHandler from "../utils/wsHandler";

const WS_PORT = 8080;
const wsServer = new WebSocketServer({ port: WS_PORT });

wsServer.on("connection", async (wsClient: WebSocket) => {
  console.log("WebSocket started!");
  const duplex = createWebSocketStream(wsClient, {
    encoding: "utf-8",
    decodeStrings: false,
  }).setMaxListeners(0);
  duplex.on("close", () => {
    duplex.destroy();
  });
  duplex.on("readable", wsHandler(duplex));
});

export default wsServer;
