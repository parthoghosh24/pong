import { Command } from "@colyseus/command"
import { Client } from "colyseus"
import { IPongGameState } from "../../types/IPongGameState"

type Payload = {
  client: Client
  ballX: number,
  ballY: number
}
export default class BallUpdateCommand extends Command<IPongGameState, Payload>
{
  execute(data: Payload)
  {
     const {client, ballX ,ballY} = data
     this.state.ball[0] = ballX
     this.state.ball[1] = ballY
  }
}