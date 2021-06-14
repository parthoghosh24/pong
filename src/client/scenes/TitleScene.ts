import Phaser from 'phaser'

const OFFLINE_TEXT = "<OFFLINE>"
const ONLINE_TEXT = "<ONLINE>"
const HELP_TEXT = "<HELP>"
const TITLE_TEXT = "PONG"

const MAIN_MENU_SOUND = "main_Menu_sound"
export default class TitleScene extends Phaser.Scene
{

  private titleText
  private offlineText
  private onlineText
  private helpText
  private mainMenuSound
  

  constructor()
  {
    super('title-scene')
    this.titleText = undefined
    this.offlineText = undefined
    this.onlineText = undefined
    this.helpText = undefined
    this.mainMenuSound = undefined
  }

  preload()
  {
    this.load.audio(MAIN_MENU_SOUND, ['assets/sounds/main_menu.mp3'])
  }

  create()
  {
    this.titleText = this.add.text(this.physics.world.bounds.width/2, this.physics.world.bounds.height/2 - 50, TITLE_TEXT)
    this.titleText.setFontSize(70)
    this.titleText.setOrigin(0.5)
    this.offlineText = this.add.text(this.physics.world.bounds.width/2, this.physics.world.bounds.height/2+50, OFFLINE_TEXT)
    this.offlineText.setOrigin(0.5)
    this.offlineText.setFontSize(25)
    this.onlineText = this.add.text(this.physics.world.bounds.width/2, this.physics.world.bounds.height/2+120, ONLINE_TEXT)
    this.onlineText.setOrigin(0.5)
    this.onlineText.setFontSize(25)
    this.helpText = this.add.text(this.physics.world.bounds.width/2, this.physics.world.bounds.height/2+190, HELP_TEXT)
    this.helpText.setOrigin(0.5)
    this.helpText.setFontSize(25)

    this.offlineText.setInteractive()
    this.onlineText.setInteractive()
    this.helpText.setInteractive()
    
    this.offlineText.on('pointerover', () =>{
      this.offlineText.setColor('gray')
    })

    this.onlineText.on('pointerover', () =>{
      this.onlineText.setColor('gray')
    })

    this.onlineText.on('pointerdown', () =>{
      this.mainMenuSound.stop()
      this.scene.start('online-menu')
    })

    this.helpText.on('pointerover', () =>{
      this.helpText.setColor('gray')
    })

    this.helpText.on('pointerdown', () =>{
      this.mainMenuSound.stop()
      this.scene.start('help')
    })

    this.offlineText.on('pointerout', () =>{
      this.offlineText.setColor('white')
    })

    this.onlineText.on('pointerout', () =>{
      this.onlineText.setColor('white') 
    })

    this.helpText.on('pointerout', () =>{
      this.helpText.setColor('white')
    })

    this.offlineText.on('pointerdown', () =>{
      this.mainMenuSound.stop()
      this.scene.start('offline-scene')
    })

    this.mainMenuSound = this.sound.add(MAIN_MENU_SOUND)
    var mainMenuSoundConfig = {mute: false, volume: 0.5, loop: true, detune: 25}
    this.mainMenuSound.play(mainMenuSoundConfig)
  }

  update()
  {}
}