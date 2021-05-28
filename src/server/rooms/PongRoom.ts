import { Room } from 'colyseus'
import { PongGameState } from './schema/PongGameState'
export default class PongRoom extends Room<PongGameState>
{
  maxClients = 2
  
  onCreate()
  {
    
    this.setState(new PongGameState())
    
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