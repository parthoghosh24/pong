export interface IPongGameState
{
  ball: number[]

  activePlayer: number

  gameStarted: boolean

  direction: string  

  playerSessions: string[]

  playerNumbers: number[]

  player1PaddleY: number

  player2PaddleY: number

}

export default IPongGameState