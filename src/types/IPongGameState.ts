export interface IPongGameState
{
  ball: number[]

  activePlayer: number

  direction: string  

  playerSessions: string[]

  playerNumbers: number[]

  player1PaddleY: number

  player2PaddleY: number

  player1Score: number

  player2Score: number

  playerWin: number

  playersJoined: number

}

export default IPongGameState