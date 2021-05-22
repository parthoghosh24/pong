import Phaser from 'phaser'

const PADDLE_KEY = "paddle"
const BALL_KEY = "ball"
const PADDLE_SPEED = 350
const PLAYER1_WINS = "Player 1 wins!"
const PLAYER2_WINS = "Player 2 wins!"
const GAME_OVER_SOUND = "game_over_sound"
const BOOP_SOUND = "boop_sound"

export default class GameScene extends Phaser.Scene
{
  
  constructor()
  {
    super('game-scene')
    this.ball = undefined
    this.player1 = undefined
    this.player2 = undefined
    this.cursors = undefined
    this.gameStarted = false
    this.keys = {}
    this.player1WinText = undefined
    this.player2WinText = undefined
    this.gameOverSound = undefined
    this.boopSound = undefined
  }

  preload()
  {
    this.load.image(PADDLE_KEY, 'assets/paddle.png')
    this.load.image(BALL_KEY, 'assets/ball.png')
    this.load.audio(BOOP_SOUND, ['assets/sounds/boop.wav'])
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

    this.player1WinText.setVisible(false)
    this.player2WinText.setVisible(false)
    this.gameOverSound = this.sound.add(GAME_OVER_SOUND)
    

  }

  update()
  {
    if(!this.gameStarted)
    {
      const initialVelocityX = (Math.random() * 150) + 200
      const initialVelocityY = (Math.random() * 150) + 200
      this.ball.setVelocityX(initialVelocityX)
      this.ball.setVelocityY(initialVelocityY)
      this.gameStarted = true
    }

    if(this.ball.body.x > this.player1.body.x)
    {
      
      this.ball.setVelocityX(0)
      this.ball.setVelocityY(0)
      this.player2WinText.setVisible(true)
      this.scene.setActive(false)
      this.gameOverSound.play()
      
    }
    if(this.ball.body.x < this.player2.body.x)
    {
      
      this.ball.setVelocityX(0)
      this.ball.setVelocityY(0)
      this.player1WinText.setVisible(true)
      this.scene.setActive(false)
      this.gameOverSound.play()
    }
    
    this.player1.body.setVelocityY(0)
    if(this.cursors.down.isDown)
    {
      this.player1.setVelocityY(PADDLE_SPEED)
    }
    else if(this.cursors.up.isDown)
    {
      this.player1.setVelocityY(-PADDLE_SPEED)
    }

    if(this.ball.body.velocity.y > PADDLE_SPEED)
    {
      this.ball.setVelocityY(PADDLE_SPEED)
    }

    this.player2.body.setVelocityY(0)
    if(this.keys.s.isDown)
    {
      this.player2.body.setVelocityY(PADDLE_SPEED)
    }
    else if(this.keys.w.isDown)
    {
      this.player2.body.setVelocityY(-PADDLE_SPEED)
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
      player = this.physics.add.sprite(this.physics.world.bounds.width - (this.ball.width/2 + 1),this.physics.world.bounds.height/2, PADDLE_KEY)
    }
    else
    {
      player =this.physics.add.sprite((this.ball.width/2 + 1),this.physics.world.bounds.height/2, PADDLE_KEY)
    }
    player.setImmovable(true)
    player.setCollideWorldBounds(true)

    return player
  }
}