import {Room} from 'colyseus'
import { PongGameState } from './schema/PongGameState'

export default class PongRoom extends Room
{
  maxClients = 2
  
  onCreate()
  {
    this.setState(new PongGameState())

    this.onMessage('keydown', (client, message)=>{
      this.broadcast('keydown', message,{
        except: client
      })
    })
    
  }

  onJoin()
  {

  }

  onLeave()
  {

  }

  onDispose()
  {

  }

}