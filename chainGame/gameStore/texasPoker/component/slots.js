import React, { Component, } from 'react'
import { View,StyleSheet,DeviceEventEmitter,Animated,Image,Easing} from 'react-native'
import Slot from './slot';
import RunSlot from './runSlot';
class Slots extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      slot1Display:"none",
      slot2Display:"none",
      slot3Display:"none",
      slot4Display:"none",
      slot5Display:"none",
      slot6Display:"none",
      slot7Display:"none",
      slot8Display:"none",
      text1:"0",
      text2:"0",
      text3:"0",
      text4:"0",
      text5:"0",
      text6:"0",
      text7:"0",
      text8:"0",
      animated:"none",
      animated1:"none",
      animated2:"none",
      animated3:"none",
    }
  }
  componentWillMount(){
    this.roundEnd();
    this.endAll();
  }
  handlerOnChange(name,x,y) {
    const _this=this
    Animated.spring(
      name,
      {toValue: {
        x: x,
        y: y
      },
      duration: 500, // 动画时间
      easing: Easing.linear}).start(() => setTimeout( () =>{
         _this.setState({
          animated:"none",
          animated1:"none",
          animated2:"none",
          animated3:"none",
        })},1000));
  }
  endAll(){
    const _this = this;
    const {store} = this.props;
    DeviceEventEmitter.addListener("END_ALL",function(){
      const winnerInfo = [];
      const winnerNumLength = Number(store.getState().table.data.pots[1].winnerNum.length);
      let xOffset=0
      switch (winnerNumLength){
        case 1 :
          xOffset = 40;
          break;
        case 2 :
          xOffset = 30;
          break;
        case 3 :
          xOffset = 20;
          break;
        case 4 :
          xOffset = 10;
          break;
        default :
          console.log('奖池数量错误')
          return false;
          break;
      }
      const  arr = [{x:-60-xOffset,y:120},{x:-150-xOffset,y:70},{x:-140-xOffset,y:0},{x:-10-xOffset,y:-20},{x:200-xOffset,y:-20},{x:280-xOffset,y:-10},{x:320-xOffset,y:60},{x:220-xOffset,y:120},{x:90-xOffset,y:90}];
      for(let i=0;i<store.getState().table.data.pots[1].winnerNum.length;i++) {
        winnerInfo[i]=store.getState().table.data.pots[1].winnerNum[i];
      }
      // console.log(winnerInfo)
      const animateOne = winnerInfo.length>=1 ?  winnerInfo[0].owner -1 : 2;
      const animateTwo = winnerInfo.length>1 ?  winnerInfo[1].owner -1 : 2;
      const animateThree = winnerInfo.length>2 ?  winnerInfo[2].owner -1 : 2;
      const animateFour = winnerInfo.length>3 ?  winnerInfo[3].owner - 1 : 2;
      _this.setState({
        slot1Display:"none",
        slot2Display:"none",
        slot3Display:"none",
        slot4Display:"none",
        animated:winnerInfo.length>0 ? "flex":"none",
        animated1:winnerInfo.length>1 ? "flex":"none",
        animated2:winnerInfo.length>2 ? "flex":"none",
        animated3:winnerInfo.length>3 ? "flex":"none",
      });
      const locationData=[arr[animateOne],arr[animateTwo],arr[animateThree],arr[animateFour]]
      DeviceEventEmitter.emit("START_ANIMATE",locationData);
    });
  }
  sidePotShow(){
    const _this = this; 
    const {store} = this.props;
    const sidePotRecord = store.getState().table.data.pots[0].allPot;
    _this.setState({
      slot1Display: sidePotRecord[0] > 0 ? "flex" : "none",
      slot2Display:sidePotRecord[1] > 0 ? "flex" : "none",
      slot3Display:sidePotRecord[2] > 0 ? "flex" : "none",
      slot4Display:sidePotRecord[3] > 0 ? "flex" : "none",
      slot5Display:sidePotRecord[4] > 0 ? "flex" : "none",
      slot6Display:sidePotRecord[5] > 0 ? "flex" : "none",
      slot7Display:sidePotRecord[6] > 0 ? "flex" : "none",
      slot8Display:sidePotRecord[7] > 0 ? "flex" : "none",
      text1:sidePotRecord[0],
      text2:sidePotRecord[1],
      text3:sidePotRecord[2],
      text4:sidePotRecord[3],
      text5:sidePotRecord[4],
      text6:sidePotRecord[5],
      text7:sidePotRecord[6],
      text8:sidePotRecord[7]
    });
  }
  roundMain( roundNums ){  // 产生边池的函数
    const _this = this;
    const {store} = this.props;
    const round = roundNums.length;
    const compare = function(property){
        return function(a,b){
            let value1 = a[property];
            let value2 = b[property];
            return value1 - value2;
        }
    }
    if( round > 0 ){
      const allInArr = roundNums; // 第二圈allin玩家信息
      let allInRecord = store.getState().table.data.pots[4] //桌上边池的筹码
      let allInPot = []; // 记录allIn 筹码数
      let surplusPlayer = store.getState().table.data.playersArr;
      allInArr.sort(compare('allIn'));
      const allPot = store.getState().table.data.pots[0].allPot; // 已存在边池信息
      const num =Number(allPot.length) > 0 ? Number(allPot.length)-1 : 0;
      
      if( store.getState().table.data.pots[0].allPot.length > 0 ){ // 前一轮有玩家allIn
        for(let i=0;i<allInArr.length;i++){ 
          allInPot.push( allInArr[i].allIn)
          for(let j=i+1; j<allInArr.length;j++){ 
            store.getState().table.data.pots[3][i+num+1].player.push(allInArr[j].seatNo) //记录allIn边池相关玩家
          }
        }
        for(let i=0;i<surplusPlayer.length;i++){ // 增加在线玩家
          for(let j=1;j<=allInArr.length;j++){  // j=0
            store.getState().table.data.pots[3][j+num].player.push(surplusPlayer[i])
          }
        }
      }else{
        for(let i=0;i<allInArr.length;i++){
          allInPot.push( allInArr[i].allIn)
          for(let j=i; j<allInArr.length;j++){ 
            store.getState().table.data.pots[3][i].player.push(allInArr[j].seatNo) //记录allIn边池相关玩家
          }
        }
        for(let i=0;i<surplusPlayer.length;i++){ // 增加在线玩家
          for(let j=0;j<=allInArr.length;j++){
            store.getState().table.data.pots[3][j].player.push(surplusPlayer[i])
          }
        }
      }        
      let potAdd1 = 0;
      for(let i=1;i<allInPot.length;i++){
        allInRecord[i+num] = (allInPot[i] - allInPot[i-1])*( Number(allInPot.length-i) + Number(surplusPlayer.length) )
        potAdd1 += allInRecord[i+num]
      }
      allInRecord[allInPot.length+num] = (store.getState().table.data.maxBlind - allInPot[allInPot.length-1])*Number(surplusPlayer.length);
      potAdd1 += allInRecord[allInPot.length+num];
      // console.log(potAdd1)
      store.getState().table.data.pots[0].allPot[num] = store.getState().table.data.pots[0].allPot[num] - potAdd1;
      if(num>0){
        allInRecord[num] = store.getState().table.data.pots[0].allPot[num];
      }else{
        allInRecord[0] = store.getState().table.data.pot - potAdd1;
      }
      for(let i=0;i<allInRecord.length;i++){
        if(allInRecord[i]>0){
          store.getState().table.data.pots[0].allPot[i]=allInRecord[i]
        }
      }
      for(let i=num;i<allInRecord.length;i++){
        if( allInRecord[i]>0  ) {
          store.getState().table.data.pots[3][i].slot = allInRecord[i]
        }
      }
      for(let i=0;i<store.getState().table.data.pots[3].length;i++){
        if(store.getState().table.data.pots[3][i].slot > 0){
          store.getState().table.data.pots[0].potsRelevant[i] = store.getState().table.data.pots[3][i];
        }
      }
      _this.sidePotShow()
      // console.log(store.getState().table.data)
    }else{
      if(store.getState().table.data.pots[0].allPot.length>0){
        _this.sidePotShow()
      }else{
        _this.setState({
          slot1Display:"flex",
          text1:store.getState().table.data.pot,
        });
      }  
    }
  }
  roundEnd(){
    const _this = this;
    const {store} = this.props;
    DeviceEventEmitter.addListener("END_ROUND",function( data ){
      const roundNum = Number( store.getState().table.data.round )
      switch( roundNum  ) {
        case 1 :
          _this.roundMain(store.getState().table.data.pots[2].round1)
          break;
        case 2 : 
          _this.roundMain(store.getState().table.data.pots[2].round2)
          break;
        case 3:
          _this.roundMain(store.getState().table.data.pots[2].round3)
          break;
        case 4:
          _this.roundMain(store.getState().table.data.pots[2].round4)
          break;
        default:
          break;
      }
      if(store.getState().table.data.pots[0].discard.length > 0){ // 去掉弃牌玩家信息
        for(let j=0; j<store.getState().table.data.pots[0].potsRelevant.length; j++ ){
          for( let i=0; i<store.getState().table.data.pots[0].discard.length; i++){
              if(store.getState().table.data.pots[0].potsRelevant[j].player.indexOf( store.getState().table.data.pots[0].discard[i] ) > -1 ) {
                store.getState().table.data.pots[0].potsRelevant[j].player.splice( store.getState().table.data.pots[0].potsRelevant[j].player.indexOf(store.getState().table.data.pots[0].discard[i]),1 )
              }
            }
        }
      }
      if(store.getState().table.data.round == 4){
        setTimeout(() => {
          DeviceEventEmitter.emit("END_GAME");
          console.log("game over!");
          // console.log(store.getState().table.data)
        },500)
      }
    });
  }
  render() {
    return (
      <View style={styles.wrap}>
        <Slot wrap="big" text={this.state.text1} display={this.state.slot1Display}/>
        <Slot wrap="small" text={this.state.text2} display={this.state.slot2Display}/>
        <Slot wrap="normal" text={this.state.text3} display={this.state.slot3Display}/>
        <Slot wrap="big" text={this.state.text4} display={this.state.slot4Display}/>
        <RunSlot type="trans" display={this.state.animated} location="0" />
        <RunSlot type="trans1" display={this.state.animated1} location="1" />
        <RunSlot type="trans2" display={this.state.animated2} location="2" />
        <RunSlot type="trans3" display={this.state.animated3} location="3" />
      </View>
    )
  }
}

export default Slots;
const styles = StyleSheet.create({
  wrap:{
    width:270,
    height:26,
    position:"absolute",
    left:"50%",
    marginLeft:-135,
    top:45,
    flexDirection:"row",
    justifyContent:"center",
    // justifyContent:"flex-start",
  },
});