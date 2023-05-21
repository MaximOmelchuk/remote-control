import commands from "../commands/commands";
import { Duplex, commandsKeyType } from "../types";

const wsHandler = (duplex: Duplex) => async () => {
  for await (let chunk of duplex) {
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

export default wsHandler;
