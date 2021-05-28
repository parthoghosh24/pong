import { Client } from 'colyseus.js'
import 'regenerator-runtime/runtime'

export default class Server
{

  private client: Client
  constructor()
  {
      this.client = new Client('ws://localhost:3000')
      console.log(this.client)
  }

  async join()
  {
    const room = await this.client.joinOrCreate('pong_room')
    console.log(room)
  }
}