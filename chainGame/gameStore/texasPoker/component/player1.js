import React, { Component, } from 'react'
import { View,StyleSheet,Image,Text,Animated,Easing,TouchableOpacity,DeviceEventEmitter,Dimensions,Platform} from 'react-native'
import Chip from './chip';
import Card from './card';
import WaitIcon from './waitIcon';
import Fold from './fold';
import Call from './call';
import Raise from './raise';
import Sure from './sure';
import Check from './check';
import ProgressBar from './progressBar';
import getWinner from './getWinner';
import cardType from './cardType';
import RunChip from './runChip';

class Player1 extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      circle:new Animated.Value(0),
      display:"none",
      stake:"0",
      waitDisplay:"none",
      // startBtnDisplay:"flex",
      startBtnDisplay:"none",
      chipDisplay:"none",
      chipValue:"0",
      activeDisplay:"flex",
      activeText:"",
      activeBtnDisplay:"none",
      activeCheckBtnDisplay:"none",
      activeCallBtnDisplay:"none",
      raiseDisplay:"flex",
      sureDisplay:"none",
      cardDisplay:"none",
      animatedDisplay:"none",
      callBlind:0,
      isTimeOut:true,
      activeBtnWrapRight:-264,
      raiseValue:0,
      winnerDisplay:"none",
      runChipDisplay:"none",
      // runChipDisplay:"flex",
    }
  }
  beginIndex(){
    //reset
    this.setState({
      circle:new Animated.Value(0),
    },Animated.timing(
      this.state.circle,{
        toValue:0.5,
        duration:10000,
        easing:Easing.quad
    }).start(()=>{
      this.halfIndex();
    }));
  }
  halfIndex(){
    Animated.timing(
      this.state.circle,{
        toValue:1,
        duration:10000,
        easing:Easing.quad
    }).start();
  }
  nextGameStart(){
    let {store} = this.props;
    let newPlayerArr = []; //桌上剩余有筹码的玩家
    for( let i=0; i< store.getState().table.data.pots[0].allIn.length; i++ ){
      if( store.getState().table.data.pots[0].allIn[i].stake > 0 ){
        newPlayerArr.push(store.getState().table.data.pots[0].allIn[i].seatNo)
      }
    }
    store.getState().table.data.playersArr=["2", "4", "6", "9"];
    store.getState().table.data.pot=0;
    store.getState().table.data.pots=[];
    delete store.getState().table.data["round"]; 
    delete store.getState().table.data["beginPlayer"];
    delete store.getState().table.data["endPlayer"];
    delete store.getState().table.data["maxBlind"];
    delete store.getState().table.data["pokers"];
    delete store.getState().table.data["riverCards"];
    this.setState({
      startBtnDisplay:"none",
    })
    DeviceEventEmitter.emit("GAME_START");
  }
  gameStart(){
    DeviceEventEmitter.emit("GAME_START");
  }
  //change state
  changeState(key,value){
    if((key == "raise"&& value == "none")||(key == "sure"&& value == "flex")){
      this._this.setState({
        raiseDisplay:"none",
        sureDisplay:"flex"
      });
    }else{
      this._this.setState({
        raiseDisplay:"flex",
        sureDisplay:"none"
      });
    }  
  }
  componentDidMount(){
    let {store} = this.props;
    setTimeout(()=>{
      this.gameStart();
    },1000)   
  }
  componentWillMount(){
    const store = this.props.store;
    const _this = this; 
    this.activeReply();
    this.result();  
    this.gameRoundEnd();
    this.endRound();
    DeviceEventEmitter.addListener("updateUi",function(){
	  _this.setState({
        display:"flex",
        stake:store.getState().table.data.player.stake,
      })
    });
    DeviceEventEmitter.addListener("BIG_BLIND_END_REPLY",function(data){
	  store.getState().table.data.round = 1;   
      store.getState().table.data.riverCards = data.riverCards;
    });
    DeviceEventEmitter.addListener("START_GAME_REPLY",function(data){
      _this.setState({
        startBtnDisplay:"none",
        cardDisplay:"flex",
      });
      store.getState().table.data.pots.push({"allIn":[],"discard":[],"allPot":[],"potsRelevant":[]},{"allInData":[],"winnerNum":[]},{"round1":[],"round2":[],"round3":[],"round4":[]},[{"slot":0,"player":[]},{"slot":0,"player":[]},{"slot":0,"player":[]},{"slot":0,"player":[]},{"slot":0,"player":[]},{"slot":0,"player":[]},{"slot":0,"player":[]},{"slot":0,"player":[]}],[0,0,0,0,0,0,0,0])
      store.getState().table.data.maxBlind = data.bigBlind; 
      store.getState().table.data.beginPlayer = data.smallBlindNo;  //first active 
      store.getState().table.data.endPlayer = data.bigBlindNo;  //end active
      //if dealer
      if(store.getState().table.data.player.seatNo == data.dealer){
        _this.setState({
          waitDisplay:"flex",
        });
      }
      //if small blind
      if(data.smallBlindNo == store.getState().table.data.player.seatNo){
        _this.setState({
          chipDisplay:"flex",
          chipValue:data.smallBlind,
          stake:(_this.state.stake-data.smallBlind)
        });
        store.getState().table.data.pot += Number(data.smallBlind);
      }    
      //if big blind
      if(data.bigBlindNo == store.getState().table.data.player.seatNo){
        _this.setState({
          chipDisplay:"flex",
          chipValue:data.bigBlind,
          stake:(_this.state.stake-data.bigBlind)
        });
        DeviceEventEmitter.emit("BIG_BLIND_END");
      }else{
        DeviceEventEmitter.addListener("BIG_BLIND_END",function(){
          console.log("big_blind_broast");
        })
      } 
    });
    if(Platform.OS==='android'){ 
      const screenWidth = Dimensions.get('window').width/2
      this.setState({
        activeBtnWrapRight:65-screenWidth
      })
    }
  }
  endRound(){
    let _this = this;
    let {store} = this.props;
    DeviceEventEmitter.addListener("END_ROUND",function(data){
      if( _this.state.chipValue > 0 ){
        _this.setState({
          chipDisplay:"none",
          chipValue:"0",
          runChipDisplay:"flex"
        });
        // DeviceEventEmitter.emit("RUN_CHIP_TO_SLOT");
      }
      // let gameRound = store.getState().table.data.round
      // console.warn(store.getState().table.data.round )
      // setTimeout( () => {
      //   DeviceEventEmitter.emit("END_ROUND_SLOT", {round:gameRound});
      // },1000)
    });
  }  
  gameRoundEnd(){
    const _this = this;
    DeviceEventEmitter.addListener("THE_ROUND_GAME_END",function(){
        _this.setState({
          cardDisplay:"none"
        });
    });
  }
  activeReply(){
    const _this = this;
    let {store} = this.props;
    DeviceEventEmitter.addListener("END_ACTIVE_REPLY",function(data){
      let seatNo = store.getState().table.data.player.seatNo;
      if(data.activeNo == seatNo){
        if( store.getState().table.data.playersArr.length <= 1  ){
          setTimeout(()=>{
            if(data.round == 4 ){
              _this.resultReply(seatNo);
              store.getState().table.data.round = data.round;
            }
            if(store.getState().table.data.round==4){
              DeviceEventEmitter.emit("END_ROUND");
            }else{
              DeviceEventEmitter.emit("END_ACTIVE",{round:store.getState().table.data.round,beginPlayer:store.getState().table.data.beginPlayer});  
              DeviceEventEmitter.emit("END_ROUND");
            }
          },1000)
        }else{
          if(data.round == 4 ){
            _this.resultReply(seatNo);
          }
          //update store round
          if(data.round){
            store.getState().table.data.round = data.round;        
          }
          if(seatNo == data.activeNo){  //action
            if(data.round){
              store.getState().table.data.maxBlind = 0;
              _this.setState({
                activeCheckBtnDisplay:"flex",
                activeCallBtnDisplay:"none",
                chipValue:0,
                chipDisplay:"none"
              });
            }else{
              if(store.getState().table.data.maxBlind == _this.state.chipValue){
                _this.setState({
                  activeCheckBtnDisplay:"flex",
                  activeCallBtnDisplay:"none"
                });
              }else{
                _this.setState({
                  activeCheckBtnDisplay:"none",
                  activeCallBtnDisplay:"flex"
                });
              }
            }
            const chipValue = Number(_this.state.chipValue);
            _this.setState({
              activeBtnDisplay:"flex",
              animatedDisplay:"flex",
              callBlind:Number(store.getState().table.data.maxBlind)-chipValue,
              isTimeOut:true,
            },()=>{
              //增加
              _this.timer = setTimeout(()=>{
                _this.fold();
              },10000);
              _this.timer;
              _this.beginIndex();
            });        
          }
        }
      }
    });
  }
  nextPlayer(player,playerArr){
    const indexOf = playerArr.indexOf(player);
    if(indexOf==playerArr.length-1){
      return playerArr[0];
    }else{
      return playerArr[indexOf+1];
    }
  }
  prevPlayer(player,playerArr){
    const indexOf = playerArr.indexOf(player);
    if(indexOf==0){
      return playerArr[playerArr.length-1];
    }else{
      return playerArr[indexOf-1];
    }
  }
  fold(){
    let {store,I18n} = this.props;
    let seatNo = store.getState().table.data.player.seatNo;
    const nextPlayer = this.nextPlayer(seatNo,store.getState().table.data.playersArr);
    const beginPlayer = store.getState().table.data.beginPlayer;
    const endPlayer = store.getState().table.data.endPlayer;
    const prevPlayer=this.prevPlayer(seatNo,store.getState().table.data.playersArr);
    clearInterval(this.timer);
    this.setState({
      activeText:I18n.t("fold"),
      activeDisplay:"flex", 
      chipDisplay:"none",
      waitDisplay:"none",
      cardDisplay:"none",
      circle:new Animated.Value(0),
      animatedDisplay:"none",
      activeBtnWrap:"none",
      activeBtnDisplay:"none",
      activeCheckBtnDisplay:"none",
      activeCallBtnDisplay:"none",
    },()=>{
      this.state.circle.stopAnimation();
    });
    store.getState().table.data.pots[0].discard.push( seatNo ) // 记录弃牌的座位号
    if(beginPlayer==seatNo){  //first active
      store.getState().table.data.beginPlayer=this.nextPlayer(seatNo,store.getState().table.data.playersArr);
    }
    setTimeout(()=>{
      this.setState({
        activeDisplay:"none"
      });
    },2000);  
    if(endPlayer==seatNo){
      DeviceEventEmitter.emit("END_ACTIVE",{round:store.getState().table.data.round,beginPlayer:beginPlayer});
    }
    DeviceEventEmitter.emit("END_ACTIVE",{nextPlayer:nextPlayer});
    //DeviceEventEmitter.emit("END_ACTIVE",{round:store.getState().table.data.round,beginPlayer:prevPlayer});
    //update playerArr
    store.getState().table.data.playersArr.splice(store.getState().table.data.playersArr.indexOf(seatNo),1); 
    //console.log(store.getState().table.data);
  }
  raise(){
    //console.log(value);
    const _this = this;
    let {store,I18n} = this.props;
    let seatNo = store.getState().table.data.player.seatNo;
    const nextPlayer = this.nextPlayer(seatNo,store.getState().table.data.playersArr);
    const beginPlayer = store.getState().table.data.beginPlayer;
    const endPlayer = store.getState().table.data.endPlayer;
    const prevPlayer=this.prevPlayer(seatNo,store.getState().table.data.playersArr);
    const chipValue = this.state.chipValue;
    clearInterval(this.timer);
    _this.setState({
      activeText:I18n.t("raise"),
      activeDisplay:"flex",
      chipDisplay:"flex",
      chipValue:Number(chipValue)+Number(this.state.raiseValue),
      stake:Number(_this.state.stake)-Number(this.state.raiseValue),
      animatedDisplay:"none",
      activeBtnDisplay:"none",
      // isTimeOut:false,
      activeCheckBtnDisplay:"none",
      activeCallBtnDisplay:"none",
    });
    // store.getState().table.data.pot += Number(this.state.raiseValue);
    if(store.getState().table.data.pots[0].allPot.length && store.getState().table.data.pots[0].allPot.length>1){
        const allPotLength = store.getState().table.data.pots[0].allPot.length - 1
        store.getState().table.data.pots[0].allPot[allPotLength] += Number(this.state.raiseValue);
    }else{
      store.getState().table.data.pot += Number(this.state.raiseValue);
    }
    // store.getState().table.data.pot += Number(this.state.raiseValue);
    store.getState().table.data.endPlayer= prevPlayer;
    // console.log(Number(chipValue)+Number(this.state.raiseValue),Number(chipValue))
    store.getState().table.data.maxBlind = Number(chipValue)+Number(this.state.raiseValue);
    setTimeout(()=>{
      _this.setState({
        activeDisplay:"none",
      });
    },2000);
    //next player;      
    DeviceEventEmitter.emit("END_ACTIVE",{nextPlayer:nextPlayer});
  }
  check(){
    const _this = this;
    const {store,I18n} = this.props;
    const chipValue = _this.state.chipValue;
    let beginPlayer = store.getState().table.data.beginPlayer; 
    let endPlayer = store.getState().table.data.endPlayer;
    let nextPlayer=_this.nextPlayer(seatNo,store.getState().table.data.playersArr);  //6
    let prevPlayer=_this.prevPlayer(seatNo,store.getState().table.data.playersArr);
    let seatNo = store.getState().table.data.player.seatNo;
    clearInterval(this.timer);
    _this.setState({
      activeText:I18n.t("check"),
      activeDisplay:"flex",
      chipDisplay:"none",
      chipValue:0,
      animatedDisplay:"none",
      activeBtnDisplay:"none",
      activeCheckBtnDisplay:"none",
      raiseDisplay:"flex",
      sureDisplay:"none"
    });
    setTimeout(()=>{
      _this.setState({
        activeDisplay:"none",        
      });
    },2000);
    if(endPlayer==seatNo){
      if(store.getState().table.data.round==4){
        DeviceEventEmitter.emit("END_ROUND");
      }else{
        DeviceEventEmitter.emit("END_ACTIVE",{round:store.getState().table.data.round,beginPlayer:store.getState().table.data.beginPlayer});  
        DeviceEventEmitter.emit("END_ROUND");
      }
    }else{
      DeviceEventEmitter.emit("END_ACTIVE",{nextPlayer:nextPlayer});
    }
  }
  call(){
    const _this = this;
    let {store,I18n} = this.props;
    let seatNo = store.getState().table.data.player.seatNo;
    const nextPlayer = this.nextPlayer(seatNo,store.getState().table.data.playersArr);
    const beginPlayer = store.getState().table.data.beginPlayer;
    const endPlayer = store.getState().table.data.endPlayer;
    const prevPlayer=this.prevPlayer(seatNo,store.getState().table.data.playersArr);
    const chipValue = this.state.chipValue;
    clearInterval(this.timer);
    //clearInterval(this.timerTest);
    _this.setState({
      activeText:I18n.t("call"),
      activeDisplay:"flex",
      chipDisplay:"flex",
      chipValue:store.getState().table.data.maxBlind,
      stake:Number(_this.state.stake)-Number(store.getState().table.data.maxBlind)+Number(chipValue),
      animatedDisplay:"none",
      activeBtnDisplay:"none",
      activeCallBtnDisplay:"none",
      raiseDisplay:"flex",
      sureDisplay:"none"
    });
    const potAdd = Number(store.getState().table.data.maxBlind)-Number(chipValue);
    if(store.getState().table.data.pots[0].allPot.length && store.getState().table.data.pots[0].allPot.length>0){
      const allPotLength = store.getState().table.data.pots[0].allPot.length - 1
      store.getState().table.data.pots[0].allPot[allPotLength] += Number(potAdd);
    }else{
      store.getState().table.data.pot += Number(potAdd);
    }
    setTimeout(()=>{
      _this.setState({
        activeDisplay:"none",
        activeCallBtnDisplay:"none"
      });
    },2000);
    if(endPlayer==seatNo){
      if(store.getState().table.data.round==4){
        DeviceEventEmitter.emit("END_ROUND");
      }else{
        DeviceEventEmitter.emit("END_ACTIVE",{round:store.getState().table.data.round,beginPlayer:store.getState().table.data.beginPlayer});  
        DeviceEventEmitter.emit("END_ROUND");
      }
    }else{
      DeviceEventEmitter.emit("END_ACTIVE",{nextPlayer:nextPlayer});
    }
  }
  changeRaiseValue(value){
    //console.log(value);
    const _this = this._this;
    _this.setState({
      raiseValue:Number(value),
    });
  }
  selectPot(value){ // 选择下注筹码
    //console.log(value);
    const _this = this._this;
    const raiseVal = _this.state.stake;
    if( value == "allIn"){
      _this.setState({
        raiseValue:raiseVal
      },()=> {
        _this.raise()
      })
    }else if( value == "pot" ){
      alert("pot")
    }else if( value == "half_pot"){
      alert("1/2pot")
    }
  }
  resultReply(seatNo){
    const _this = this;
    const {store} = this.props;
    //const seatNo = store.getState().table.data.player.seatNo;
    //const pokers = store.getState().table.data.pokers[seatNo];
    //console.log(store.getState().table.data.pokers);
    DeviceEventEmitter.addListener("RESULT_REPLY",function(data){
      if (store.getState().table.data.pots[0].allPot.length > 0){
        let getPots = Number(_this.state.stake)
      // _this.setState({
      //   chipDisplay:"none",
      // })
        for(let i=0; i<data.length; i++){
          if( data[i].owner == seatNo ) {
            getPots +=Number( store.getState().table.data.pots[0].allPot[i] )
          }
        }
        if( getPots >Number(_this.state.stake) ) {
          _this.setState({
            // winnerDisplay: data[0].owner == seatNo ? "flex" :"none",
            stake:getPots,
            chipDisplay:"none",
          });
          DeviceEventEmitter.emit("END_ALL");
        }else{
          if( _this.state.stake <= 0 ) {
            _this.setState({
              stake:1000,
            });
          }
        }
      }else{
        if(data.owner == seatNo){
          _this.setState({
            // winnerDisplay:"flex",
            stake:Number(_this.state.stake)+Number(store.getState().table.data.pot),
            chipDisplay:"none",
          });
          DeviceEventEmitter.emit("END_ALL");
        }else{
          if( _this.state.stake <= 0 ) {
            _this.setState({
              stake:1000,
            });
          }
        }
      }
      store.getState().table.data.pots[0].allIn.push({"seatNo":seatNo,"stake":_this.state.stake})  //记录本轮游戏结束后玩家的筹码
    });
  }
  result(){
    const _this = this;
    const {store} = this.props;
    let resultArr = new Array();
    let resultArr1 = new Array();

    DeviceEventEmitter.addListener("END_GAME",function(){
      _this.setState({
        startBtnDisplay:"flex",
      })
      // console.log(store.getState().table.data.pots[0].potsRelevant,"111")
      if( store.getState().table.data.pots[0].potsRelevant.length <= 0 ) {
          const playersArr = store.getState().table.data.playersArr;
          const riverCards = store.getState().table.data.riverCards;
          for(let i = 0;i<playersArr.length;i++){
            let pokers,owner,cardTypeArr;
            pokers=new Array(0);
            owner = playersArr[i];
            for(let j=0;j<riverCards.length;j++){
              pokers.push(Number(riverCards[j]));       
            }
            for(let k=0;k<store.getState().table.data.pokers[playersArr[i]].length;k++){
              pokers.push(Number(store.getState().table.data.pokers[playersArr[i]][k]));
            }
            cardTypeArr = {
              pokers:pokers,
              owner:owner
            };
            resultArr.push(cardType(cardTypeArr));
          };
          // console.log(resultArr);
          const winner = getWinner(resultArr);
          // console.log(winner,resultArr)
          store.getState().table.data.pots[1].winnerNum[0] = winner
          DeviceEventEmitter.emit("RESULT_REPLY",winner);
      }else{ // 底池与每个边池的获得者
        const potPlayers = store.getState().table.data.pots[0].potsRelevant;
        const riverCards1 = store.getState().table.data.riverCards;
        const potsWinter=new Array();
        for(let i = 0;i<store.getState().table.data.pots[0].allPot.length;i++){
          let arr = new Array();
          for(let ii=0; ii<potPlayers[i].player.length; ii++) {
            let pokers1,owner1,cardTypeArr1;
            pokers1=new Array(0);
            owner1 = potPlayers[i].player[ii];
            for(let j=0;j<riverCards1.length;j++){
              pokers1.push(Number(riverCards1[j]));       
            }
            for(let k=0;k<store.getState().table.data.pokers[potPlayers[i].player[ii]].length;k++){
              pokers1.push(Number(store.getState().table.data.pokers[potPlayers[i].player[ii]][k]));
            }
            cardTypeArr1 = {
              pokers:pokers1,
              owner:owner1
            };
            arr.push(cardType(cardTypeArr1));
          }
          resultArr1.push(arr)
          potsWinter.push( getWinner(arr) )
          // console.log(potsWinter)
        };
        // const potsWinner = getWinner(resultArr1);
        // console.log( resultArr1 )
        for(let i=0;i<potsWinter.length;i++){
          store.getState().table.data.pots[1].winnerNum[i] = potsWinter[i]
        }
        // console.log( potsWinter ) // 底池及边池归属
        DeviceEventEmitter.emit("RESULT_REPLY",potsWinter);
      }      
    });
  }
  runChipChange(){  // 每圈过后更改 runChipDisplay 的值
    let _this = this;
    _this.setState({
      runChipDisplay:"none"
    })
  }
  render(){
    const  {I18n} = this.props;
    const {store} = this.props;
    return (
      <View style={[styles.playerWrap,{display:this.state.display}]} >
        <Image style={styles.playerImage} source={require("./../static/images/player1.png")}/>
        <Chip wrap="big" text={this.state.chipValue} style={{display:this.state.chipDisplay}} align="topRight"/>
        <RunChip wrap="big" change = {() =>{this.runChipChange()}} text={this.state.chipValue} location={{x:-20,y:-90}} style={{display:this.state.runChipDisplay}} display={this.state.runChipDisplay} align="topRight"/>
        <Card store={store} display={this.state.cardDisplay}/>
        <WaitIcon style={[styles.wait,{display:this.state.waitDisplay}]} type="self"/>
        <Text style={styles.account}>${this.state.stake}</Text>
        <View style={[styles.left,{display:this.state.animatedDisplay}]}>
          <Animated.View style={[styles.leftCircleWrap,{
          transform:[{
            rotate:this.state.circle.interpolate({
              inputRange:[0,0.5,0.5,1],
              outputRange:["0deg","180deg","180deg","180deg"]
            })
          }]}]}>
            <View style={styles.leftCircle}></View>
          </Animated.View>
        </View>
        <View style={[styles.right,{display:this.state.animatedDisplay}]}>
          <Animated.View style={[styles.rightCircleWrap,{
          transform:[{
            rotate:this.state.circle.interpolate({
              inputRange:[0,0.5,0.5,1],
              outputRange:["0deg","0deg","0deg","180deg"]
            })
          }]}]}>
            <View style={styles.rightCircle}></View>
          </Animated.View>
        </View>
        <TouchableOpacity onPress={()=>{
            this.nextGameStart()
          }} style={[styles.gameStartBox,{display:this.state.startBtnDisplay}]}>
          <Text style={styles.gameStartBtn}>Start</Text>
        </TouchableOpacity>
        <Text style={[styles.activeText,{display:this.state.activeDisplay}]}>{this.state.activeText}</Text>
        <View style={[styles.activeBtnWrap,{right:this.state.activeBtnWrapRight}]}>
          <Fold I18n = {I18n} click={this.fold.bind(this)} display={this.state.activeBtnDisplay} />
          <Check I18n = {I18n} click={this.check.bind(this)} display={this.state.activeCheckBtnDisplay} />
          <Call I18n = {I18n} click={this.call.bind(this)} text={this.state.callBlind} display={this.state.activeCallBtnDisplay}/> 
          <View style={[styles.raiseWrap,{display:this.state.activeBtnDisplay}]}>
            <Raise I18n = {I18n} _this={this} callback={this.changeState} display={this.state.raiseDisplay}/>
            <Sure I18n = {I18n} _this={this} click={this.raise.bind(this)} callback={this.changeState} display={this.state.sureDisplay}/>
            <ProgressBar _this={this} callback={this.changeRaiseValue} max={this.state.stake} display={this.state.sureDisplay} selectPot={this.selectPot}/> 
          </View>
        </View>   
        <View style={[styles.winnerWrap,{display:this.state.winnerDisplay}]}>
          <View style={styles.winnerLayout}></View>
          <Text style={styles.winnerTip}>WIN</Text>
        </View>
      </View>
    )
  }
}

export default Player1;
const styles = StyleSheet.create({
  playerWrap:{
    position:"absolute",
    width:110,
    height:110,
    left:"50%",
    marginLeft:-55,
    bottom:-34,
    //borderRadius:110,
    // zIndex:1000
  },
  playerImage:{
    width:"100%",
    height:"100%"
  },
  wait:{
    width:16,
    height:16,
    position:"absolute",
    bottom:110,
    right:8,
  },
  account:{
    backgroundColor:"rgba(0,0,0,0)",
    color:"#fff",
    textAlign:"center",
    marginTop:16
  },
  left:{
    width:60,
    height:120,
    position:"absolute",
    right:-5,
    top:-5,
    backgroundColor:"rgba(0,0,0,0)",
    overflow:"hidden",
  },
  leftCircleWrap:{
    width:120,
    height:120,
    position:"absolute",
    right:0,
    top:0,
    backgroundColor:"rgba(0,0,0,0)",
    borderRadius:60,
  },
  leftCircle:{
    width:60,
    height:120,
    position:"absolute",
    opacity:0.4,
    backgroundColor:"#00bf04",
    borderTopLeftRadius:60,
    borderBottomLeftRadius:60,
    left:0,
    top:0,
  },
  right:{
    width:60,
    height:120,
    position:"absolute",
    left:-5,
    top:-5,
    backgroundColor:"rgba(0,0,0,0)",
    overflow:"hidden",
  },
  rightCircleWrap:{
    width:120,
    height:120,
    position:"absolute",
    left:0,
    top:0,
    backgroundColor:"rgba(0,0,0,0)",
    borderRadius:60,
  },
  rightCircle:{
    width:60,
    height:120,
    position:"absolute",
    opacity:0.4,
    backgroundColor:"#00bf04",
    borderTopRightRadius:60,
    borderBottomRightRadius:60,
    right:0,
    top:0,
  },
  gameStartBox:{
    width:50,
    height:20,
    position:"absolute",
    bottom:-18,
    left:-20,
  },
  gameStartBtn:{
    backgroundColor:"#0f6e2d",
    color:"#90b097",
    width:50,
    height:20,
    fontSize:12,
    textAlign:"center",
  },
  startBtn:{
    backgroundColor:"#0f6e2d",
    color:"#90b097",
    position:"absolute",
    bottom:-18,
    left:-20,
    width:50,
    height:20,
    textAlign:"center",
  },
  activeText:{
    backgroundColor:"rgba(0,0,0,0)",
    position:"absolute",
    right:-20,
    top:0,
    color:"white"
  },
  activeBtnWrap:{
    position:"absolute",
    // right:-264,
    bottom:-56,
  },
  winnerWrap:{
    position:"absolute",
    width:"100%",   
    left:0,
    bottom:-10,
  },
  winnerLayout:{
    position:"absolute",
    width:"100%",
    height:"100%",
    top:0,
    left:0,
    backgroundColor:"black",
    opacity:0.4,
  },
  winnerTip:{
    backgroundColor:"rgba(0,0,0,0)",
    color:"#23ac49",
    fontSize:14,
    textAlign:"center"
  },
});