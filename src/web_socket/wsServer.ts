import WebSocket, { WebSocketServer, createWebSocketStream } from "ws";
import { commands, commandsKeyType } from "../commands/commands";

const WS_PORT = 8080;
const wsServer = new WebSocketServer({ port: WS_PORT });

// const onConnect = (wsClient: WebSocket) => {
//   console.log("WebSocket started!");
//   wsClient.on("message", async (message: Buffer) => {
//     console.log(message.toString());
//     const [command, value1, value2] = message.toString().split(" ");
//     const result = await commands[command as commandsKeyType](
//       command,
//       value1,
//       value2
//     );
//     if (result) {
//       wsClient.send(result);
//     }
//   });
// };
type Duplex = ReturnType<typeof createWebSocketStream>;

const handleData = (duplex: Duplex) => async () => {
  for await (let chunk of duplex) {
    console.log(chunk.toString());
    const [command, value1, value2] = chunk.toString().split(" ");
    if (!!commands[command as commandsKeyType]) {
      const result = await commands[command as commandsKeyType](
        command,
        value1,
        value2
      );
      duplex.write(result);
    } else {
      console.log("No such command");
    }
  }
};

wsServer.on("connection", async (wsClient: WebSocket) => {
  console.log("WebSocket started!");
  const duplex = createWebSocketStream(wsClient, {
    encoding: "utf-8",
    decodeStrings: false,
  }).setMaxListeners(0);
  duplex.on("close", () => {
    duplex.destroy();
  });
  duplex.on("readable", handleData(duplex));
});

export default wsServer;
