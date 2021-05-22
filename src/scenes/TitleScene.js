import Phaser from 'phaser'

const OFFLINE_TEXT = "<OFFLINE>"
const ONLINE_TEXT = "<ONLINE>"
const TITLE_TEXT = "PONG"
const MAIN_MENU_SOUND = "main_Menu_sound"
export default class TitleScene extends Phaser.Scene
{

  constructor()
  {
    super('title-scene')
    this.titleText = undefined
    this.offlineText = undefined
    this.onlineText = undefined
    this.mainMenuSound = undefined
  }

  preload()
  {
    this.load.audio(MAIN_MENU_SOUND, ['assets/sounds/main_menu.mp3'])
  }

  create()
  {
    this.titleText = this.add.text(this.physics.world.bounds.width/2, this.physics.world.bounds.height/2, TITLE_TEXT)
    this.titleText.setFontSize(50)
    this.titleText.setOrigin(0.5)
    this.offlineText = this.add.text(this.physics.world.bounds.width/2, this.physics.world.bounds.height/2+100, OFFLINE_TEXT)
    this.offlineText.setOrigin(0.5)
    this.offlineText.setFontSize(25)
    this.onlineText = this.add.text(this.physics.world.bounds.width/2, this.physics.world.bounds.height/2+170, ONLINE_TEXT)
    this.onlineText.setOrigin(0.5)
    this.onlineText.setFontSize(25)

    this.offlineText.setInteractive()
    
    this.offlineText.on('pointerover', () =>{
      this.offlineText.setColor('gray')
    })

    this.offlineText.on('pointerout', () =>{
      this.offlineText.setColor('white')
    })

    this.offlineText.on('pointerdown', () =>{
      this.mainMenuSound.stop()
      this.scene.start('game-scene')
    })

    this.mainMenuSound = this.sound.add(MAIN_MENU_SOUND)
    var mainMenuSoundConfig = {mute: false, volume: 0.5, loop: true, detune: 25}
    this.mainMenuSound.play(mainMenuSoundConfig)
  }

  update()
  {}
}