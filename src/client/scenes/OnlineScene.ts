import Phaser from 'phaser'
import IPongGameState from '../../types/IPongGameState'
import Server from '../services/server'

const PADDLE_KEY = "paddle"
const BALL_KEY = "ball"
const PADDLE_SPEED = 350
const PLAYER1_WINS = "Player 1 wins!"
const PLAYER2_WINS = "Player 2 wins!"
const PLAYER_WIN_SOUND = "player_win_sound"
const GAME_OVER_SOUND = "game_over_sound"
const BOOP_SOUND = "boop_sound"
const PLAYER1_SCORE = "0"
const PLAYER2_SCORE = "0"
const MAX_SET_COUNT = 5

export default class OnlineScene extends Phaser.Scene
{

  private server!: Server
  private ball?: Phaser.Physics.Arcade.Sprite
  private player1?: Phaser.Physics.Arcade.Sprite
  private player2?: Phaser.Physics.Arcade.Sprite
  private cursors
  private gameStarted
  private keys
  private player1WinText?: Phaser.GameObjects.Text
  private player2WinText?: Phaser.GameObjects.Text
  private player1ScoreText?: Phaser.GameObjects.Text
  private player2ScoreText?: Phaser.GameObjects.Text
  private player1Score: Number
  private player2Score: Number
  private playerWinSound
  private gameOverSound
  private boopSound
  private line
  private setCount
  private currentPlayer

  constructor()
  {
    super('online-scene')
    this.ball = undefined
    this.player1 = undefined
    this.player2 = undefined
    this.cursors = undefined

    this.gameStarted = false

    this.keys = {}

    this.player1WinText = undefined
    this.player2WinText = undefined

    this.player1ScoreText = undefined
    this.player2ScoreText = undefined
    this.player1Score = 0
    this.player2Score = 0

    this.playerWinSound = undefined
    this.gameOverSound = undefined
    this.boopSound = undefined

    this.line = undefined

    this.setCount = 0
    this.currentPlayer = {}
    
  }

  init()
  {
    this.server = new Server()
  }

  preload()
  {
    this.load.image(PADDLE_KEY, 'assets/paddle.png')
    this.load.image(BALL_KEY, 'assets/ball.png')
    this.load.audio(BOOP_SOUND, ['assets/sounds/boop.wav'])
    this.load.audio(PLAYER_WIN_SOUND, ['assets/sounds/player_win.wav'])
    this.load.audio(GAME_OVER_SOUND, ['assets/sounds/game_over.wav'])
  }

  async create()
  {

    if(!this.server)
    {
      throw new Error('Server missing!')
    }

    await this.server.join()

    // Server intialized
    this.server.onceStateChanged(this.initiateGame, this)
    this.server.onPaddleUpdate((playerMap: {field: string, value: number})=>{
      if(playerMap.field.includes("1") && this.currentPlayer.playerNumber !== 1)
      {
        this.player1?.setY(playerMap.value)
      }
      if(playerMap.field.includes("2") && this.currentPlayer.playerNumber !== 2)
      {
        this.player2?.setY(playerMap.value)
      }
    })
    this.server.onBallUpdate((ball: [number, number])=>{
      this.ball?.setX(ball[0])
      this.ball?.setY(ball[1])
    })
  }

  async update()
  {
    this.resetPlayerPaddleSpeed()
    this.normalizeBallSpeed()
    // console.log(`ball speed ${this.ball?.body.x, this.ball?.body.y}`)
    if(this.ball !== undefined)
    {
      this.server.handleBallUpdate(this.ball?.body.x, this.ball?.body.y)
    }
    // this.server.onPaddleUpdate((field: string, value: number)=>{
    //   console.log('oyeee')
    //   if(field.includes("1") && this.currentPlayer.playerNumber !== 1)
    //   {
    //     this.player1?.setY(value)
        // if(direction === 'up')
        // {
        //   this.player1?.body.setVelocityY(-PADDLE_SPEED)
        // }
        // else
        // {
        //   this.player1?.body.setVelocityY(PADDLE_SPEED)
        // }
      // }

      // if(activePlayer === 2 && sessionId !== this.currentPlayer.sessionId)
      // {
      //   if(direction === 'up')
      //   {
      //     this.player2?.body.setVelocityY(-PADDLE_SPEED)
      //   }
      //   else
      //   {
      //     this.player2?.body.setVelocityY(PADDLE_SPEED)
      //   }
      // }
      
    // })
    this.handleControls()

    // if(this.ball?.body?.x > this.player2?.body?.x)
    // {
      
    //   this.ball?.setVelocityX(0)
    //   this.ball?.setVelocityY(0)
    //   this.player1Score+=1
    //   this.player1ScoreText.setText(""+this.player1Score)
    //   if(this.player1Score == MAX_SET_COUNT)
    //   {
    //     this.player1WinText?.setVisible(true)
    //     this.scene.pause()
    //     this.gameOverSound.play()
    //     return
    //   }
    //   this.scene.setActive(false)
    //   this.playerWinSound.play()
    //   this.gameStarted = false
    //   setTimeout(()=>{
    //     this.scene.restart()
    //   }, 2000) 
    // }
    
    // if(this.ball?.body?.x < this.player1?.body?.x)
    // {
    //   this.ball?.setVelocityX(0)
    //   this.ball?.setVelocityY(0)
    //   this.player2Score+=1
    //   this.player2ScoreText.setText(""+this.player2Score)
    //   if(this.player2Score == MAX_SET_COUNT)
    //   {
    //     this.player2WinText.setVisible(true)
    //     this.scene.pause()
    //     this.gameOverSound.play()
    //     return
    //   }
    //   this.scene.setActive(false)
    //   this.playerWinSound.play()
    //   this.gameStarted = false
    //   setTimeout(()=>{
    //     this.scene.restart()
    //   }, 2000)
    // }

  }

  private resetPlayerPaddleSpeed()
  {
    this.player1?.body?.setVelocityY(0)
    this.player2?.body?.setVelocityY(0)
  }

  private handleControls()
  {
    if(this.currentPlayer.playerSessionId === this.server.sessionId)
    {
      if(this.currentPlayer.playerNumber === 1)
      {
        if(this.keys?.w?.isDown)
        {
          this.player1.setVelocityY(-PADDLE_SPEED)
          this.server.onPlayerPress('up',1, this.player1?.body.y)
        }
        else if(this.keys?.s?.isDown)
        {
          this.player1.setVelocityY(PADDLE_SPEED)
          this.server.onPlayerPress('down', 1, this.player1?.body.y)
        }
      }
      else
      {
        if(this.cursors?.up?.isDown)
        {
          this.player2.setVelocityY(-PADDLE_SPEED)
          this.server.onPlayerPress('up',2, this.player2?.body.y)
        }
        else if(this.cursors?.down?.isDown)
        {
          this.player2.setVelocityY(PADDLE_SPEED)
          this.server.onPlayerPress('down', 2, this.player2?.body.y)
        }
      }
    }
  }

  private normalizeBallSpeed()
  {
    if(this.ball?.body?.velocity?.y > PADDLE_SPEED)
    {
      this.ball.setVelocityY(PADDLE_SPEED)
    }

    if(this.ball?.body?.velocity?.y < -PADDLE_SPEED)
    {
      this.ball.setVelocityY(-PADDLE_SPEED)
    }
  }

  private initiateGame(state: IPongGameState)
  {
    var playerId = state.playerSessions.findIndex(session => session == this.server.sessionId)
    this.currentPlayer.playerId = playerId
    this.currentPlayer.playerSessionId = this.server.sessionId
    this.currentPlayer.playerNumber = state.playerNumbers[playerId]
    this.createSounds()
    this.gameStarted = state.gameStarted
    
    this.createBall(state)
    this.player1 = this.createPlayer(1)
    this.player2 = this.createPlayer(2)
    this.addColliders()
    this.createKeys()
    this.createLine()
    this.createWinText()
    this.createScoreText()
    
  }

  private addColliders()
  {
    this.physics.add.collider(this.player1,this.ball, ()=>{
      this.boopSound.play()
    })
    this.physics.add.collider(this.player2,this.ball, ()=>{
      this.boopSound.play()
    })
  }

  private createSounds()
  {
    this.playerWinSound = this.sound.add(PLAYER_WIN_SOUND)
    this.gameOverSound = this.sound.add(GAME_OVER_SOUND)
    this.boopSound = this.sound.add(BOOP_SOUND)
  }

  private createScoreText()
  {
    this.player1ScoreText = this.add.text(this.physics.world.bounds.width/2 - 120, 50, ""+this.player1Score)
    this.player1ScoreText.setFontSize(100)
    this.player2ScoreText = this.add.text(this.physics.world.bounds.width/2 + 50, 50, ""+this.player2Score)
    this.player2ScoreText.setFontSize(100)
  }

  private createWinText()
  {
    this.player1WinText = this.add.text(this.physics.world.bounds.width/2, this.physics.world.bounds.height/2, PLAYER1_WINS)
    this.player1WinText.setOrigin(0.5)
    this.player1WinText.setBackgroundColor('black')
    this.player2WinText = this.add.text(this.physics.world.bounds.width/2, this.physics.world.bounds.height/2, PLAYER2_WINS)
    this.player2WinText.setOrigin(0.5)
    this.player1WinText.setVisible(false)
    this.player2WinText.setVisible(false)
  }

  private createBall(state: IPongGameState)
  {
    this.ball = this.physics.add.sprite(this.physics.world.bounds.width/2,this.physics.world.bounds.height/2, BALL_KEY)
    this.ball.setCollideWorldBounds(true)
    this.ball.setBounce(1,1)
    this.ball?.setVelocityX(state.ball[0])
    this.ball?.setVelocityY(state.ball[1])
  }

  private createKeys()
  {
    this.cursors = this.input.keyboard.createCursorKeys()
    this.keys.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.keys.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    this.keys.f = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
  }

  private createPlayer(playerCount = 1)
  {
    var player
    if(playerCount == 1)
    {
      player =this.physics.add.sprite((this.ball?.width/2 + 1),this.physics.world.bounds.height/2, PADDLE_KEY)
    }
    else
    {
      player = this.physics.add.sprite(this.physics.world.bounds.width - (this.ball?.width/2 + 1),this.physics.world.bounds.height/2, PADDLE_KEY)
    }
    player.setImmovable(true)
    player.setCollideWorldBounds(true)

    return player
  }

  private createLine()
  {
    var graphics = this.add.graphics()
    graphics.lineStyle(1,0xffffff,1)
    graphics.lineBetween(this.physics.world.bounds.width/2,0,this.physics.world.bounds.width/2, this.physics.world.bounds.height)
  }
}