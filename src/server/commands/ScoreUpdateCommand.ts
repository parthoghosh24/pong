import { Command } from "@colyseus/command"
import { Client } from "colyseus"
import { IPongGameState } from "../../types/IPongGameState"
import { ArraySchema } from '@colyseus/schema'

type Payload = {
  client: Client
  playerScore: number,
  playerNumber: number
}
export default class ScoreUpdateCommand extends Command<IPongGameState, Payload>
{
  execute(data: Payload)
  {
     const {client, playerScore ,playerNumber} = data
     if(playerNumber === 1)
     {
      this.state.player1Score = playerScore
     }
     else
     {
      this.state.player2Score = playerScore
     }
    //  this.state.ball = new ArraySchema((Math.random() * 150) + 200,(Math.random() * 150) + 200)
  }
}