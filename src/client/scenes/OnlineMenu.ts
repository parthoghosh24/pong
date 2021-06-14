import Phaser from 'phaser'

const JOIN_TEXT = "<JOIN MATCH>"
const CREATE_TEXT = "<CREATE MATCH>"
const BACK_TEXT = "<BACK>"

const MAIN_MENU_SOUND = "main_Menu_sound"

export default class OnlineMenu extends Phaser.Scene
{
  private joinText
  private createText
  private backText
  private mainMenuSound

  constructor()
  {
    super('online-menu')
    this.joinText = undefined
    this.createText = undefined
    this.backText = undefined 
    this.mainMenuSound = undefined
  }

  preload()
  {
    this.load.audio(MAIN_MENU_SOUND, ['assets/sounds/main_menu.mp3'])
  }

  create()
  {
    this.joinText = this.add.text(this.physics.world.bounds.width/2, this.physics.world.bounds.height/2+50, JOIN_TEXT)
    this.joinText.setOrigin(0.5)
    this.joinText.setFontSize(25)

    // this.createText = this.add.text(this.physics.world.bounds.width/2, this.physics.world.bounds.height/2+120, CREATE_TEXT)
    // this.createText.setOrigin(0.5)
    // this.createText.setFontSize(25)

    this.backText = this.add.text(this.physics.world.bounds.width/2, this.physics.world.bounds.height/2+120, BACK_TEXT)
    this.backText.setOrigin(0.5)
    this.backText.setFontSize(25)

    this.joinText.setInteractive()
    // this.createText.setInteractive()
    this.backText.setInteractive()

    this.joinText.on('pointerover', () =>{
      this.joinText.setColor('gray')
    })

    this.joinText.on('pointerout', () =>{
      this.joinText.setColor('white')
    })

    this.joinText.on('pointerdown', () =>{
      this.mainMenuSound.stop()
      this.scene.start('online-scene')
    })

    // this.createText.on('pointerover', () =>{
    //   this.createText.setColor('gray')
    // })

    // this.createText.on('pointerout', () =>{
    //   this.createText.setColor('white') 
    // })

    this.backText.on('pointerover', () =>{
      this.backText .setColor('gray')
    })

    this.backText.on('pointerout', () =>{
      this.backText.setColor('white')
    })

    this.backText.on('pointerdown', () =>{
      this.mainMenuSound.stop()
      this.scene.start('title-scene')
    })

    this.mainMenuSound = this.sound.add(MAIN_MENU_SOUND)
    var mainMenuSoundConfig = {mute: false, volume: 0.5, loop: true, detune: 25}
    this.mainMenuSound.play(mainMenuSoundConfig)
  }
}