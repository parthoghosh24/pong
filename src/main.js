import Phaser from 'phaser'
import TitleScene from	'./scenes/TitleScene'
import GameScene from './scenes/GameScene'

const config = {
	type: Phaser.AUTO,
	scale: {
		mode: Phaser.Scale.FIT,
		parent: 'pong',
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: 800,
		height: 640
},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 50 }
		}
	},
	scene: [ TitleScene, GameScene]
}

export default new Phaser.Game(config)
