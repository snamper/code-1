import React, { Component, } from 'react'
import { View,StyleSheet,Image,Text,DeviceEventEmitter,Animated,Easing} from 'react-native'
import Chip from './chip';
import WaitIcon from './waitIcon';
import Pokers from "./pokers";
import RunChip from './runChip';
class Player3 extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      round1Ani1:new Animated.Value(0),
      circle:new Animated.Value(0),
      display:"none",
      waitDisplay:"none",
      cardDisplay:"none",
      playerImg:require("./../static/images/playerBg.png"),
      chipDisplay:"none",
      chipValue:"0",
      activeDisplay:"none",
      activeText:"0",
      animatedDisplay:"none",
      stake:"0",
      card1Img:require("./../static/images/poker/pokerBg.png"),
      card2Img:require("./../static/images/poker/pokerBg.png"),
      resultCard:"none",
      resultCardImg1:require("./../static/images/poker/1.png"),
      resultCardImg2:require("./../static/images/poker/2.png"),
      winnerDisplay:"none",
      runChipDisplay:"none",
      // runChipDisplay:"flex",
    }
  }
  resultReply(seatNo){
    const _this = this;
    const {store} = this.props;
    //const pokers = store.getState().table.data.pokers[seatNo];
    //console.log(store.getState().table.data.pokers);
    DeviceEventEmitter.addListener("RESULT_REPLY",function(data){
      const pokers = store.getState().table.data.pokers[seatNo];
      _this.setState({
        resultCardImg1:Pokers[pokers[0]],
        resultCardImg2:Pokers[pokers[1]],
        cardDisplay:"none",
        resultCard:"flex",
        chipDisplay:"none",
      });

      _this.beginAnimated(_this.state.round1Ani1);


      // 底池与边池的归属
      if (store.getState().table.data.pots[0].allPot.length > 0){
        let getPots = Number(_this.state.stake)
        for(let i=0; i<data.length; i++){
          if( data[i].owner == seatNo ) {
            getPots +=Number( store.getState().table.data.pots[0].allPot[i] );
          }
        }
  
        if( getPots >Number(_this.state.stake) ) {
          _this.setState({
            // winnerDisplay: data[0].owner == seatNo ? "flex" :"none",
            stake:getPots,           
          });
  
          DeviceEventEmitter.emit("END_ALL");
        }else{
          if( _this.state.stake <= 0 ) {
            _this.setState({
              // winnerDisplay: data[0].owner == seatNo ? "flex" :"none",
              stake:1000,
            });
          }
        }
      }else{
        if(data.owner == seatNo){
          DeviceEventEmitter.emit("END_ALL");
          setTimeout(()=>{
            _this.setState({
              // winnerDisplay:"flex",
              stake:Number(_this.state.stake)+Number(store.getState().table.data.pot),
            });
          },2000)  
        }else{
          if( _this.state.stake <= 0 ) {
            _this.setState({
              // winnerDisplay: data[0].owner == seatNo ? "flex" :"none",
              stake:2000,
            });
          }
        }
      }

      store.getState().table.data.pots[0].allIn.push({"seatNo":seatNo,"stake":_this.state.stake})  //记录本轮游戏结束后玩家的筹码
      
    });
  }
  beginIndex(){
    //reset
    this.setState({
      circle:new Animated.Value(0),
      animatedDisplay:"flex"
    },()=>this.halfIndex);    
    this.halfIndex = Animated.timing(
      this.state.circle,{
        toValue:1,
        duration:10000,
        easing:Easing.quad
    }).start();
  }
  nextPlayer(player,playerArr){
    const indexOf = playerArr.indexOf(player);
    if(indexOf==playerArr.length){
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
  componentWillMount(){
    const store = this.props.store;
    const _this = this;
    DeviceEventEmitter.addListener("updateUi",function(){
      const player = store.getState().table.data.player;
      const robotPlayers = store.getState().table.data.robotPlayers;
      for(let i=0;i<robotPlayers.length;i++){
        if(robotPlayers[i].seatNo == Number(player.seatNo)+2||Number(robotPlayers[i].seatNo)+7 == player.seatNo){
          _this.setState({        
            display:"flex",
            stake:robotPlayers[i].stake,
            playerImg:{uri:robotPlayers[i].portraitAddr}
          });
          _this.startGame(robotPlayers[i].seatNo);
          _this.activeReply(robotPlayers[i].seatNo);
          _this.resultReply(robotPlayers[i].seatNo);
        }
      }	  
    });
  }
  componentDidMount(){
    let store = this.props.store;
    this.endRound();
    this.gameRoundEnd();
  }
  startGame(seatNo){
    const _this = this;
    let {store} = this.props;
    DeviceEventEmitter.addListener("START_GAME_REPLY",function(data){
      _this.setState({
        cardDisplay:"flex",
      });
      //if dealer
      if(seatNo == data.dealer){
        _this.setState({
          waitDisplay:"flex",
        });
      }
      //if small blind
      if(data.smallBlindNo == seatNo){
        _this.setState({
          chipDisplay:"flex",
          chipValue:data.smallBlind,
          stake:(_this.state.stake-data.smallBlind)
        });
      }    
      //if big blind
      if(data.bigBlindNo == seatNo){
        _this.setState({
          chipDisplay:"flex",
          chipValue:data.bigBlind,
          stake:(_this.state.stake-data.bigBlind)
        });
        store.getState().table.data.pot += Number(data.bigBlind);
        DeviceEventEmitter.emit("BIG_BLIND_END");
      }
    });
  }
  endRound(){
    const _this = this;
    DeviceEventEmitter.addListener("END_ROUND",function(data){
      if( _this.state.chipValue > 0 ){
        _this.setState({
          chipDisplay:"none",
          chipValue:"0",
          runChipDisplay:"flex"
        });
        DeviceEventEmitter.emit("RUN_CHIP_TO_SLOT");
      } 
    });
  }
  gameRoundEnd(){
    const _this = this;
    DeviceEventEmitter.addListener("THE_ROUND_GAME_END",function(){
        _this.setState({
          resultCard:"none"
        });
    });
  }
  activeReply(seatNo){
    const _this = this;
    let {store,I18n} = this.props;
    DeviceEventEmitter.addListener("END_ACTIVE_REPLY",function(data){
      if(data.activeNo == seatNo){
        //随机操作；
        const randomActive = Math.random();
        let beginPlayer = store.getState().table.data.beginPlayer; 
        let endPlayer = store.getState().table.data.endPlayer;
        //this.timer = setTimeout(()=>{},5000)
        _this.beginIndex();
        _this.timer = setTimeout(()=>{
          _this.setState({
            circle:new Animated.Value(0),
            animatedDisplay:"none"
          },()=>{
            _this.state.circle.stopAnimation();
          });
          let nextPlayer=_this.nextPlayer(seatNo,store.getState().table.data.playersArr);  //6
          let prevPlayer=_this.prevPlayer(seatNo,store.getState().table.data.playersArr);
          if(randomActive>0.95){  //raise   randomActive>0.95
            if(Number(_this.state.stake)<Number(store.getState().table.data.maxBlind)-Number(_this.state.chipValue)){
              let stake = Number(_this.state.stake);
              const chipValue = Number(_this.state.chipValue)
              _this.setState({
                activeText:I18n.t("allIn"),
                activeDisplay:"flex", 
                chipDisplay:"flex",
                chipValue:Number(_this.state.stake),
                stake:0
              });

               // 通过圈数记录allIn玩家     // 边池优化
               if( store.getState().table.data.round==1  ){
                store.getState().table.data.pots[2].round1.push({ "allIn":Number(chipValue)+Number(stake),"seatNo": seatNo })
              }
              if( store.getState().table.data.round==2  ){
                store.getState().table.data.pots[2].round2.push({ "allIn":Number(chipValue)+Number(stake),"seatNo": seatNo })
              }
              if( store.getState().table.data.round==3  ){
                store.getState().table.data.pots[2].round3.push({ "allIn":Number(chipValue)+Number(stake),"seatNo": seatNo })
              }
              if( store.getState().table.data.round==4  ){
                store.getState().table.data.pots[2].round4.push({ "allIn":Number(chipValue)+Number(stake),"seatNo": seatNo })
              }
              // 边池优化


              // store.getState().table.data.pots[0].allIn.push( Number(_this.state.stake) )
              // store.getState().table.data.pots[0].allInPlayer.push( seatNo )
              store.getState().table.data.pots[1].allInData.push({ "allIn":Number(chipValue)+Number(stake),"seatNo": seatNo }) //记录all in 玩家筹码及座位号
              if(store.getState().table.data.pots[0].allPot.length && store.getState().table.data.pots[0].allPot.length>1){
                const allPotLength = store.getState().table.data.pots[0].allPot.length - 1
                store.getState().table.data.pots[0].allPot[allPotLength] += Number(stake);
              }else{
                store.getState().table.data.pot += Number(stake);
              }
              // store.getState().table.data.pot += Number(_this.state.stake);
              if(beginPlayer==seatNo){  //first active
                store.getState().table.data.beginPlayer=_this.nextPlayer(seatNo,store.getState().table.data.playersArr);
              };
              setTimeout(()=>{
                _this.setState({
                  activeDisplay:"none"
                });
              },2000);
              store.getState().table.data.playersArr.splice(store.getState().table.data.playersArr.indexOf(seatNo),1);
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
            }else{
              const chipValue = _this.state.chipValue;
              const raiseValue = Math.ceil((Number(_this.state.stake)+Number(_this.state.chipValue)-Number(store.getState().table.data.maxBlind))*Math.random())+Number(store.getState().table.data.maxBlind)-Number(_this.state.chipValue);
              _this.setState({
                activeText:I18n.t("raise"),
                activeDisplay:"flex", 
                chipDisplay:"flex",
                chipValue:Number(chipValue) + raiseValue,
                stake:Number(_this.state.stake)-raiseValue
              });
              if(store.getState().table.data.pots[0].allPot.length && store.getState().table.data.pots[0].allPot.length>1){
                const allPotLength = store.getState().table.data.pots[0].allPot.length - 1
                store.getState().table.data.pots[0].allPot[allPotLength] += Number(raiseValue);
              }else{
                store.getState().table.data.pot += Number(raiseValue);
              }
              // store.getState().table.data.pot += Number(raiseValue);
              store.getState().table.data.endPlayer= prevPlayer;
              store.getState().table.data.maxBlind = raiseValue + Number(chipValue) ;
              setTimeout(()=>{
                _this.setState({
                  activeDisplay:"none"
                });
              },2000);
              //next player;      
              DeviceEventEmitter.emit("END_ACTIVE",{nextPlayer:nextPlayer});
            }         
          }else if(randomActive>0.0001){ //call
            if(Number(_this.state.stake)<Number(store.getState().table.data.maxBlind)-Number(_this.state.chipValue)){
              const chipValue = _this.state.chipValue;
              const stake = _this.state.stake;
              _this.setState({
                activeText:I18n.t("allIn"),
                activeDisplay:"flex", 
                chipDisplay:"flex",
                chipValue:Number(chipValue)+Number(stake),
                stake:0
              });
              // store.getState().table.data.pots[0].allIn.push( Number(chipValue)+Number(stake) ) //记录all in 玩家筹码
              //store.getState().table.data.pots[0].allInPlayer.push( seatNo ) // 记录all in 玩家座位号
              store.getState().table.data.pots[1].allInData.push({ "allIn":Number(chipValue)+Number(stake),"seatNo": seatNo }) //记录all in 玩家筹码及座位号

              // 通过圈数记录allIn玩家     // 边池优化
              if( store.getState().table.data.round==1  ){
                store.getState().table.data.pots[2].round1.push({ "allIn":Number(chipValue)+Number(stake),"seatNo": seatNo })
              }
              if( store.getState().table.data.round==2  ){
                store.getState().table.data.pots[2].round2.push({ "allIn":Number(chipValue)+Number(stake),"seatNo": seatNo })
              }
              if( store.getState().table.data.round==3  ){
                store.getState().table.data.pots[2].round3.push({ "allIn":Number(chipValue)+Number(stake),"seatNo": seatNo })
              }
              if( store.getState().table.data.round==4  ){
                store.getState().table.data.pots[2].round4.push({ "allIn":Number(chipValue)+Number(stake),"seatNo": seatNo })
              }
              // 边池优化

              //allInData
              if(store.getState().table.data.pots[0].allPot.length && store.getState().table.data.pots[0].allPot.length>1){
                const allPotLength = store.getState().table.data.pots[0].allPot.length - 1
                store.getState().table.data.pots[0].allPot[allPotLength] += Number(stake);
              }else{
                store.getState().table.data.pot += Number(stake);
              }
              // store.getState().table.data.pot += Number(_this.state.stake);
              if(beginPlayer==seatNo){  //first active
                store.getState().table.data.beginPlayer=_this.nextPlayer(seatNo,store.getState().table.data.playersArr);
              };
              setTimeout(()=>{
                _this.setState({
                  activeDisplay:"none"
                });
              },2000);
              store.getState().table.data.playersArr.splice(store.getState().table.data.playersArr.indexOf(seatNo),1);
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
            }else{
              const chipValue = _this.state.chipValue;
              if(chipValue == store.getState().table.data.maxBlind){
                _this.setState({
                  activeText:I18n.t("check"),
                  activeDisplay:"flex",
                  // chipDisplay:"none",
                  // chipValue:0
                }); 
              }else{
                _this.setState({
                  activeText:I18n.t("call"),
                  activeDisplay:"flex",
                  chipDisplay:"flex",
                  chipValue:store.getState().table.data.maxBlind,
                  stake:Number(_this.state.stake)-Number(store.getState().table.data.maxBlind - _this.state.chipValue),
                  // stake:Number(_this.state.stake)-Number(store.getState().table.data.maxBlind - chipValue),
                }); 
                if(store.getState().table.data.pots[0].allPot.length && store.getState().table.data.pots[0].allPot.length>0){
                  const allPotLength = store.getState().table.data.pots[0].allPot.length - 1
                  store.getState().table.data.pots[0].allPot[allPotLength] += Number(store.getState().table.data.maxBlind - chipValue);
                }else{
                  store.getState().table.data.pot += Number(store.getState().table.data.maxBlind - chipValue);
                }
                // store.getState().table.data.pot += Number(store.getState().table.data.maxBlind - chipValue);
              }  
              setTimeout(()=>{
                _this.setState({
                  activeDisplay:"none"
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
          }else{  //fold
            _this.setState({
              activeText:I18n.t("fold"),
              activeDisplay:"flex", 
              chipDisplay:"none",
              waitDisplay:"none",
              cardDisplay:"none",
            });
            store.getState().table.data.pots[0].discard.push( seatNo ) // 记录弃牌的座位号
            if(beginPlayer==seatNo){  //first active             
              store.getState().table.data.beginPlayer=_this.nextPlayer(seatNo,store.getState().table.data.playersArr);           
            };
            store.getState().table.data.pots[0].discard.push( seatNo ) // 记录弃牌玩家座位号
            setTimeout(()=>{
              _this.setState({
                activeDisplay:"none"
              });
            },2000);
            //updata endPlayer
            //store.getState().table.data.endPlayer = ;
            //update playersArr;
            store.getState().table.data.playersArr.splice(store.getState().table.data.playersArr.indexOf(seatNo),1);
            //DeviceEventEmitter.emit("END_ACTIVE",{nextPlayer:nextPlayer});
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
        },4000)
      }
    });
  }

  beginAnimated(animate){
    Animated.timing(
      animate,{
        toValue:0.5,
        duration:100,
        easing:Easing.quad
    }).start(()=>{
      this.secondAnimated(animate);
    });
  }
  secondAnimated(animate){
    Animated.timing(
      animate,{
        toValue:1,
        duration:100,
        easing:Easing.quad
    }).start();
  }
  runChipChange(){
    let _this = this;
    _this.setState({
      runChipDisplay:"none"
    })
  }
  render() {
    return (
      <View style={styles.wrap}>
        <Image style={styles.playerImage}  source={this.state.playerImg}/>
        <Chip wrap="big" text={this.state.chipValue} align="rightLeftBottom" style={{display:this.state.chipDisplay}}/>
        <RunChip wrap="big" change = {() =>{this.runChipChange()}} text={this.state.chipValue} location={{x:210,y:-100}} style={{display:this.state.runChipDisplay}} align="rightLeftBottom"/>
        <WaitIcon style={[styles.wait,{display:this.state.waitDisplay}]} type="left"/>
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
        <Text style={[styles.account,{display:this.state.display}]}>${this.state.stake}</Text>
        <Image style={[styles.card,styles.card1,{display:this.state.cardDisplay}]} source={this.state.card1Img}/>
        <Image style={[styles.card,styles.card2,{display:this.state.cardDisplay}]} source={this.state.card2Img}/>
        <Text style={[styles.activeText,{display:this.state.activeDisplay}]}>{this.state.activeText}</Text>
        {/* <Image style={[styles.resultCard1,{display:this.state.resultCard}]} source={this.state.resultCardImg1}/>
        <Image style={[styles.resultCard2,{display:this.state.resultCard}]} source={this.state.resultCardImg2}/> */}

        <View style={[styles.resultCard1,{display:this.state.resultCard}]}>
          <Animated.Image style={[styles.cardBg,{opacity:this.state.round1Ani1.interpolate({
            inputRange:[0,0.5,0.5,1],
            outputRange:[1,1,0,0]  
            }),transform:[{rotateY:this.state.round1Ani1.interpolate({
            inputRange:[0,0.5,1],
            outputRange:["0deg","90deg","0deg"]
          })}]}]} source={this.state.card1Img}></Animated.Image>
          <Animated.Image style={[styles.cardShow,{transform:[{rotateY:this.state.round1Ani1.interpolate({
            inputRange:[0,0.5,1],
            outputRange:["-180deg","-90deg","0deg"]
            })}],opacity:this.state.round1Ani1.interpolate({
            inputRange:[0,0.5,0.5,1],
            outputRange:[0,0,1,1]  
            })}]} source={this.state.resultCardImg1}>
          </Animated.Image>
        </View>
        <View style={[styles.resultCard2,{display:this.state.resultCard}]}>
          <Animated.Image style={[styles.cardBg,{opacity:this.state.round1Ani1.interpolate({
            inputRange:[0,0.5,0.5,1],
            outputRange:[1,1,0,0]  
            }),transform:[{rotateY:this.state.round1Ani1.interpolate({
            inputRange:[0,0.5,1],
            outputRange:["0deg","90deg","0deg"]
          })}]}]} source={this.state.card1Img}></Animated.Image>
          <Animated.Image style={[styles.cardShow,{transform:[{rotateY:this.state.round1Ani1.interpolate({
            inputRange:[0,0.5,1],
            outputRange:["-180deg","-90deg","0deg"]
            })}],opacity:this.state.round1Ani1.interpolate({
            inputRange:[0,0.5,0.5,1],
            outputRange:[0,0,1,1]  
            })}]} source={this.state.resultCardImg2}>
          </Animated.Image>
        </View>

        <View style={[styles.winnerWrap,{display:this.state.winnerDisplay}]}>
          <View style={styles.winnerLayout}></View>
          <Text style={styles.winnerTip}>WIN</Text>
        </View>
      </View>
    )
  }
}

export default Player3;
const styles = StyleSheet.create({
  wrap:{
    width:70,
    height:70,
    position:"absolute",
    left:-20,
    bottom:70,
    // borderRadius:70,
  },
  playerImage:{
    width:"100%",
    height:"100%",
  },
  account:{
    backgroundColor:"rgba(0,0,0,0)",
    textAlign:"center",
    color:"#fff",
    marginTop:2
  },
  wait:{
    width:16,
    height:16,
    position:"absolute",
    bottom:58,
    right:-12,
  },
  card:{
    width:18,
    height:25,
    position:"absolute",
    top:20,
    right:-24,
  },
  card1:{
    transform:[{rotateZ:"90deg"}],
  },
  card2:{
    transform:[{rotateZ:"70deg"}],
  },
  activeText:{
    backgroundColor:"rgba(0,0,0,0)",
    position:"absolute",
    right:-30,
    top:0,
    color:"white"
  },
  left:{
    width:40,
    height:80,
    position:"absolute",
    right:-5,
    top:-5,
    backgroundColor:"rgba(0,0,0,0)",
    overflow:"hidden", 
  },
  leftCircleWrap:{
    width:80,
    height:80,
    position:"absolute",
    right:0,
    top:0,
    backgroundColor:"rgba(0,0,0,0)",
    borderRadius:60,
  },
  leftCircle:{
    width:40,
    height:80,
    position:"absolute",
    opacity:0.4,
    backgroundColor:"#00bf04",
    borderTopLeftRadius:40,
    borderBottomLeftRadius:40,
    left:0,
    top:0,
  },
  right:{
    width:40,
    height:80,
    position:"absolute",
    left:-5,
    top:-5,
    backgroundColor:"rgba(0,0,0,0)",
    overflow:"hidden",
  },
  rightCircleWrap:{
    width:80,
    height:80,
    position:"absolute",
    left:0,
    top:0,
    backgroundColor:"rgba(0,0,0,0)",
    borderRadius:40,
  },
  rightCircle:{
    width:40,
    height:80,
    position:"absolute",
    opacity:0.4,
    backgroundColor:"#00bf04",
    borderTopRightRadius:40,
    borderBottomRightRadius:40,
    right:0,
    top:0,
  },
  resultCard1:{
    width:49,
    height:67,
    position:"absolute",
    // right:-15,
    right:-30,
    top:2
  },
  resultCard2:{
    width:49,
    height:67,
    position:"absolute",
    // left:-15,
    left:0,
    top:2
  },
  winnerWrap:{
    position:"absolute",
    width:"100%",   
    left:0,
    bottom:0,
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

  cardShow:{
    height:"100%",
    width:"100%",
    position:"absolute",
    top:0,
    left:0,
  },
  cardBg:{
    height:"100%",
    width:"100%",
  }
});