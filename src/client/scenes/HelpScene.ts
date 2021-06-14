import Phaser from 'phaser'

const CONTROL_TEXT = "PLAYER 1 CAN PLAY USING 'W <UP>, S<DOWN>'.\nPLAYER 2 CAN PLAY USING '↑ <UP>, ↓<DOWN>.'"
const PLAYERS_TEXT = "PLAYER 1 CONTROLS LEFT PADDLE AND PLAYER 2 CONTROLS RIGHT."
const ONLINE_MULTIPLAYER_TEXT = "IN ONLINE, PLAYER 1 ALWAYS START GAME. PLAYER 2 ALWAYS JOIN GAME.\nPLEASE NOTE ONLINE IS BETA RIGHT NOW WITH NOTICIBLE BUGS."
const BACK_TEXT = "<BACK>"

export default class HelpScene extends Phaser.Scene
{
  private controlText
  private playersText
  private onlineMultiplayerText
  private backText

  constructor()
  {
    super('help')
    this.controlText = undefined
    this.playersText = undefined
    this.onlineMultiplayerText = undefined
    this.backText = undefined
  }

  create()
  {
    this.controlText = this.add.text(this.physics.world.bounds.width/2, this.physics.world.bounds.height/2, CONTROL_TEXT)
    this.controlText.setOrigin(0.5)
    this.controlText.setFontSize(15)

    this.playersText = this.add.text(this.physics.world.bounds.width/2, this.physics.world.bounds.height/2+50, PLAYERS_TEXT)
    this.playersText.setOrigin(0.5)
    this.playersText.setFontSize(15)

    this.onlineMultiplayerText = this.add.text(this.physics.world.bounds.width/2, this.physics.world.bounds.height/2+100, ONLINE_MULTIPLAYER_TEXT)
    this.onlineMultiplayerText.setOrigin(0.5)
    this.onlineMultiplayerText.setFontSize(15)
    
    this.backText = this.add.text(this.physics.world.bounds.width/2, this.physics.world.bounds.height/2+150, BACK_TEXT)
    this.backText.setOrigin(0.5)
    this.backText.setFontSize(25)
    this.backText.setInteractive()
    this.backText.on('pointerover', () =>{
      this.backText .setColor('gray')
    })

    this.backText.on('pointerout', () =>{
      this.backText.setColor('white')
    })

    this.backText.on('pointerdown', () =>{
      this.scene.start('title-scene')
    })

  }

}