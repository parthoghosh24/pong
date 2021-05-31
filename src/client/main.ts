import Phaser from 'phaser'
import TitleScene from	'./scenes/TitleScene'
import OfflineScene from './scenes/OfflineScene'
import OnlineScene from './scenes/OnlineScene'
import HelpScene from './scenes/HelpScene'
import OnlineMenu from './scenes/OnlineMenu'

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
	scene: [ TitleScene, OfflineScene, OnlineScene, OnlineMenu, HelpScene ]
}

export default new Phaser.Game(config)
