import Phaser from 'phaser'

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

export default class OfflineScene extends Phaser.Scene
{
    private ball
    private player1
    private player2
    private cursors
    private gameStarted
    private keys
    private player1WinText
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
    super('offline-scene')
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

  preload()
  {
    this.load.image(PADDLE_KEY, 'assets/paddle.png')
    this.load.image(BALL_KEY, 'assets/ball.png')
    this.load.audio(BOOP_SOUND, ['assets/sounds/boop.wav'])
    this.load.audio(PLAYER_WIN_SOUND, ['assets/sounds/player_win.wav'])
    this.load.audio(GAME_OVER_SOUND, ['assets/sounds/game_over.wav'])
  }

  create()
  {
    this.ball = this.createBall()
    
    this.player1 = this.createPlayer(1)
    this.boopSound = this.sound.add(BOOP_SOUND)
    
    this.physics.add.collider(this.player1,this.ball, ()=>{
        this.boopSound.play()
    })
    

    this.player2 = this.createPlayer(2)

    this.physics.add.collider(this.player2, this.ball, ()=>{
      this.boopSound.play()
  })

    this.cursors = this.input.keyboard.createCursorKeys()
    this.keys.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.keys.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    this.player1WinText = this.add.text(this.physics.world.bounds.width/2, this.physics.world.bounds.height/2, PLAYER1_WINS)
    this.player1WinText.setOrigin(0.5)
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

    var graphics = this.add.graphics()
    graphics.lineStyle(1,0xffffff,1)
    graphics.lineBetween(this.physics.world.bounds.width/2,0,this.physics.world.bounds.width/2, this.physics.world.bounds.height)
    

  }

  update()
  {
    if(this.scene.isPaused())
    {
      return
    }
    if(!this.gameStarted)
    {
      const initialVelocityX = (Math.random() * 150) + 200
      const initialVelocityY = (Math.random() * 150) + 200
      this.ball.setVelocityX(initialVelocityX)
      this.ball.setVelocityY(initialVelocityY)
      this.gameStarted = true
    }

    if(this.ball.body.x > this.player2.body.x)
    {
      
      this.ball.setVelocityX(0)
      this.ball.setVelocityY(0)
      this.player1Score+=1
      this.player1ScoreText.setText(""+this.player1Score)
      if(this.player1Score == MAX_SET_COUNT)
      {
        this.player1WinText.setVisible(true)
        this.scene.pause()
        this.gameOverSound.play()
        return
      }
      this.scene.setActive(false)
      this.playerWinSound.play()
      this.gameStarted = false
      setTimeout(()=>{
        this.scene.restart()
      }, 2000)
      

      
    }
    if(this.ball.body.x < this.player1.body.x)
    {
      
      this.ball.setVelocityX(0)
      this.ball.setVelocityY(0)
      this.player2Score+=1
      this.player2ScoreText.setText(""+this.player2Score)
      if(this.player2Score == MAX_SET_COUNT)
      {
        this.player2WinText.setVisible(true)
        this.scene.pause()
        this.gameOverSound.play()
        return
      }
      this.scene.setActive(false)
      this.playerWinSound.play()
      this.gameStarted = false
      setTimeout(()=>{
        this.scene.restart()
      }, 2000)
    }
    
    this.player2.body.setVelocityY(0)
    if(this.cursors.down.isDown)
    {
      this.player2.setVelocityY(PADDLE_SPEED)
    }
    else if(this.cursors.up.isDown)
    {
      this.player2.setVelocityY(-PADDLE_SPEED)
    }

    if(this.ball.body.velocity.y > PADDLE_SPEED)
    {
      this.ball.setVelocityY(PADDLE_SPEED)
    }

    this.player1.body.setVelocityY(0)
    if(this.keys.s.isDown)
    {
      this.player1.body.setVelocityY(PADDLE_SPEED)
    }
    else if(this.keys.w.isDown)
    {
      this.player1.body.setVelocityY(-PADDLE_SPEED)
    }

    if(this.ball.body.velocity.y > PADDLE_SPEED)
    {
      this.ball.body.setVelocityY(PADDLE_SPEED)
    }

    if(this.ball.body.velocity.y < -PADDLE_SPEED)
    {
      this.ball.body.setVelocityY(-PADDLE_SPEED)
    }
  }

  createBall()
  {
    const ball = this.physics.add.sprite(this.physics.world.bounds.width/2,this.physics.world.bounds.height/2, BALL_KEY)
    ball.setCollideWorldBounds(true)
    ball.setBounce(1,1)
    
    return ball
  }

  createPlayer(playerCount = 1)
  {
    let player = undefined
    if(playerCount == 1)
    {
      player =this.physics.add.sprite((this.ball.width/2 + 1),this.physics.world.bounds.height/2, PADDLE_KEY)
      
    }
    else
    {
      player = this.physics.add.sprite(this.physics.world.bounds.width - (this.ball.width/2 + 1),this.physics.world.bounds.height/2, PADDLE_KEY)
    }
    player.setImmovable(true)
    player.setCollideWorldBounds(true)

    return player
  }
}