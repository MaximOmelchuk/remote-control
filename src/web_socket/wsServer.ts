import { left, mouse } from "@nut-tree/nut-js";
import WebSocket from "ws";
import { commands, commandsKeyType } from "../commands/commands";

const onConnect = (wsClient: WebSocket) => {
  console.log("connect");
  wsClient.on("message", async (message: Buffer) => {
    console.log(message.toString());
    const [command, value1, value2] = message.toString().split(" ");
    const result = await commands[command as commandsKeyType](
      command,
      value1,
      value2
    );
    if (result) {
      wsClient.send(result);
    }
  });
};

export default onConnect;
