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
      this.state.player1Score+= 1
     }
     else
     {
      this.state.player2Score+= 1
     }

    //  this.state.ball = new ArraySchema((Math.random() * 150) + 200,(Math.random() * 150) + 200)

     if(this.state.player1Score === 5)
     {
       this.state.playerWin = 1
     }
     if(this.state.player2Score === 5)
     {
       this.state.playerWin = 2
     }
    
  }
}