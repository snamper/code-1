"use strict";
import * as getInfo from "./getInfo";
import * as sit from "./sit";
const TexasPoker = {
  getInfo:getInfo.getInfo,
  getInfoReply:getInfo.getInfoReply,
  sitIn:sit.sitIn,
  sitInReply:sit.sitInReply,
  newPlayerEvent:sit.newPlayerEvent,
  sitEvent:sit.sitEvent,
  leave:sit.leave,
  leaveReply:sit.leaveReply,
  sit:sit.sit,
  handPreStart:sit.handPreStart,
};
export default TexasPoker;