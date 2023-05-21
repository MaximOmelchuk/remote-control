import { createWebSocketStream } from "ws";
import commands from "../commands/commands";

export type commandsMethod = {
  (
    command: string,
    value1: string,
    value2: string | undefined
  ): Promise<string>;
};
export type commandsType = {
  [key: string]: commandsMethod;
};

export type commandsKeyType = keyof typeof commands;

export type Duplex = ReturnType<typeof createWebSocketStream>;
