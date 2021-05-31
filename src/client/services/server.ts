import { Client, Room } from 'colyseus.js'
import { Schema } from '@colyseus/schema'
import 'regenerator-runtime/runtime'
import Phaser from 'phaser'
import IPongGameState from '../../types/IPongGameState'
import { Message } from '../../types/Messages'

export default class Server
{

  private client: Client
  private events: Phaser.Events.EventEmitter
  private room?: Room<IPongGameState & Schema>

  constructor()
  {
      this.client = new Client('ws://localhost:3000')
      this.events = new Phaser.Events.EventEmitter()
  }

  async join()
  {
    this.room = await this.client.joinOrCreate<IPongGameState & Schema>('pong_room')

    this.room.onStateChange.once(state => {
      this.events.emit('once-state-changed', state) 
    })

    this.room.state.onChange = (changes) =>{
      changes.forEach(change =>{
        console.dir(`change ${change}`)
        const {field, value} = change
        console.log(`field ${field}`)
        console.log(`value ${value}`)
        switch(field)
        {
          case 'ball':
            this.events.emit('on-ball-update', value)
            break
        }
      })
    }
  }

  onDrawUpdate(velocityX: number, velocityY: number)
  {
    if(!this.room)
    {
      return
    }

    this.room.send(Message.BallUpdated, {velocityX: velocityX, velocityY: velocityY})
  }

  onceStateChanged(cb: (state: IPongGameState )=> void, context?: any)
  {
    this.events.once('once-state-changed', cb, context)
  }

  onBallUpdate(cb: (velocityX: number, velocityY: number)=> void, context?: any)
  {
    this.events.on('on-ball-update', cb, context)
  }
}