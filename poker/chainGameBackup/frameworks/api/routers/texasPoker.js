/**
* route for texasPoker;
**/
"use strict";
import * as events from "./../constants";
import Controller from "./../controllers";
export default function texasPoker(action){
  switch(action.event){
    case events.GET_INFO:
      Controller.texasPoker.getInfo(action);
      break;
    case events.GET_INFO_REPLY:
      Controller.texasPoker.getInfoReply(action);
      break;
    case events.SIT_IN:
      Controller.texasPoker.sitIn(action);
      break;
    case events.SIT_IN_REPLY:
      Controller.texasPoker.sitInReply(action);
      break;
    case events.NEW_PLAYER_EVENT:
      Controller.texasPoker.newPlayerEvent(action);
      break;
    case events.SIT:
      Controller.texasPoker.sit(action);
      break;
    case events.SIT_REPLY:
      console.log("sit reply");
      Controller.texasPoker.sitInReply(action);
      break;
    case events.SIT_EVENT:
      Controller.texasPoker.sitEvent(action);
      break;
    case events.LEAVE:
      Controller.texasPoker.leave(action);
      break;
    case events.LEAVE_REPLY:
      Controller.texasPoker.leaveReply(action);
      break;
      case events.HAND_PRE_START:
    default:
      return false;
      break;
  }
}