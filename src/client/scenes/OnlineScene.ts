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
  private ball
  private player1
  private player2
  private cursors
  private gameStarted
  private keys
  private player1WinText?: Phaser.GameObjects.Text
  private player2WinText
  private player1ScoreText
  private player2ScoreText
  private player1Score
  private player2Score
  private playerWinSound
  private gameOverSound
  private boopSound
  private line
  private setCount

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
    this.cursors = this.input.keyboard.createCursorKeys()
    this.keys.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.keys.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    this.createLine()
    this.player1WinText = this.add.text(this.physics.world.bounds.width/2, this.physics.world.bounds.height/2, PLAYER1_WINS)
    this.player1WinText.setOrigin(0.5)
    this.player1WinText.setBackgroundColor('black')
    this.player2WinText = this.add.text(this.physics.world.bounds.width/2, this.physics.world.bounds.height/2, PLAYER2_WINS)
    this.player2WinText.setOrigin(0.5)
    this.player1ScoreText = this.add.text(this.physics.world.bounds.width/2 - 120, 50, ""+this.player1Score)
    this.player1ScoreText.setFontSize(100)
    this.player2ScoreText = this.add.text(this.physics.world.bounds.width/2 + 50, 50, ""+this.player2Score)
    this.player2ScoreText.setFontSize(100)
    this.player1WinText.setVisible(false)
    this.player2WinText.setVisible(false)
    this.playerWinSound = this.sound.add(PLAYER_WIN_SOUND)
    this.gameOverSound = this.sound.add(GAME_OVER_SOUND)

    if(!this.server)
    {
      throw new Error('Server missing!')
    }

    await this.server.join()

    this.server.onceStateChanged(this.intiateGame, this)
    this.server.onDrawUpdate((Math.random() * 150) + 200, (Math.random() * 150) + 200)
  }

  async update()
  {
    if(!this.gameStarted)
    {
      const initialVelocityX = (Math.random() * 150) + 200
      const initialVelocityY = (Math.random() * 150) + 200
      // this.server.onBallUpdate(this.handleDrawUpdate, this)
      // this.ball.setVelocityX(initialVelocityX)
      // this.ball.setVelocityY(initialVelocityY)
      this.gameStarted = true
    }
  }

  private intiateGame()
  {
    
    this.ball = this.physics.add.sprite(this.physics.world.bounds.width/2,this.physics.world.bounds.height/2, BALL_KEY)
    this.ball.setCollideWorldBounds(true)
    this.ball.setBounce(1,1)
    const initialVelocityX = (Math.random() * 150) + 200
    const initialVelocityY = (Math.random() * 150) + 200  
    this.ball.setVelocityX(initialVelocityX)
    this.ball.setVelocityY(initialVelocityY)
  }

  createLine()
  {
    var graphics = this.add.graphics()
    graphics.lineStyle(1,0xffffff,1)
    graphics.lineBetween(this.physics.world.bounds.width/2,0,this.physics.world.bounds.width/2, this.physics.world.bounds.height)

  }

  private handleDrawUpdate(velocityX: number, velocityY: number) {
    this.ball.setVelocityX(velocityX)
    this.ball.setVelocityY(velocityY)
  }

}