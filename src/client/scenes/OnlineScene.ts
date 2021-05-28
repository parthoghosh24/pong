import Phaser from 'phaser'
import Server from '../services/server'

export default class OnlineScene extends Phaser.Scene
{

  private server!: Server
  constructor()
  {
    super('online-scene')
    
  }

  init()
  {
    this.server = new Server()
  }

  preload()
  {

  }
  create()
  {
    this.server.join()
  }
}