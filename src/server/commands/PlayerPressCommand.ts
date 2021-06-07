import { Command } from "@colyseus/command";
import { Client } from "colyseus";
import IPongGameState from "../../types/IPongGameState";

type PayLoad = {
  client: Client
  direction: string
  activePlayer: number
  paddleY: number
}

export default class PlayerPressCommand extends Command<IPongGameState, PayLoad>
{
  execute(data: PayLoad)
  {
    const {client, direction, activePlayer, paddleY} = data
    this.state.direction = direction
    this.state.activePlayer = activePlayer
    if(activePlayer == 1)
    {
      this.state.player1PaddleY = paddleY
    }
    else
    {
      this.state.player2PaddleY = paddleY
    } 
    
  }
}