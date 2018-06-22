import React, { Component, } from 'react';
import { View, Text,StyleSheet,ImageBackground,TouchableOpacity,Image} from 'react-native';
import Player from "./component/player";
import LoadingBar from "./component/loadingBar";
import * as Status from "./status";
import * as Provider from "./active/provider";
import * as Active from "./active";
class TexasPoker extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }
  componentWillMount(){
    const {store} = this.props.screenProps;
    Provider.listener("GET_INFO_REPLY",this.getInfoReply,store);
    Provider.listener("SIT_IN_REPLY",Status.tableInit,store);
    Provider.listener("NEW_PLAYER_EVENT",Status.newPlayer,store);
    Provider.listener("SIT_REPLY",Status.sit,store);
    Provider.listener("SIT_EVENT",Status.sit,store);
    Provider.listener("LEAVE_REPLY",Status.leaveReply,store);
  }
  componentDidMount(){
    const {api} = this.props.screenProps;
    const {store} = this.props.screenProps;
    Active.getInfo(api);
    Active.sitIn(api,{
        gameType:"noLimit",
        blinds:{
            bigBlind:"200",
            smallBlind:"100",
        },
        buyIn:"2000",
    });
    Active.leave(api,{
        account:"33389999",
        seatNo:"7",
    });
    Active.sit(api,"out",store) //this.sit(api,"out");
  }
  getInfoReply(store,data){   //GET_INFO_REPLY event callback

  }
  sit(api,action){
    const {store} = this.props.screenProps;
    const sitData = {
      saetNo:store.getState().table.data.snapshot.seatNo,
      action:action,
    };
    Provider.message(api,"SIT",sitData);
  }
  sitEvent(store,data){
    console.log("sit event happen");
    console.log(data);
  }
  leaveReply(store,data){
    //console.log("leave reply:");
    //console.log(data);
    Status.leave(store,data);
  }
  render(){
    const {I18n} = this.props.screenProps;
    return (
      <View style={styles.wrap}>
        <ImageBackground source={require("./static/images/tableBg.png")} style={styles.tableBg}>
          <TouchableOpacity style={styles.backBtnWrap}>
            <Image style={styles.backBtn} source={require("./../../frameworks/static/images/back.png")}/>       
          </TouchableOpacity>  
          <Player name="player1" src={require("./static/images/defaultPlayer.png")} balance="2234" playerStyle={styles.player1} type="left"/>
          {/**<Player name="player2" src={require("./static/images/dealer.png")} balance="1000" playerStyle={styles.player2} type="left"/>
          <Player name="player3" src={require("./static/images/defaultPlayer.png")} balance="234" playerStyle={styles.player3} type="left"/>
          <Player name="player4" src={require("./static/images/defaultPlayer.png")} balance="34" playerStyle={styles.player4} type="left"/>
          <Player name="player5" src={require("./static/images/defaultPlayer.png")} balance="1234" playerStyle={styles.player5} type="left"/>
          <Player name="player6" src={require("./static/images/defaultPlayer.png")} balance="134" playerStyle={styles.player6} type="right"/>
          <Player name="player7" src={require("./static/images/defaultPlayer.png")} balance="8000" playerStyle={styles.player7} type="right"/>
          <Player name="player8" src={require("./static/images/defaultPlayer.png")} balance="10000" playerStyle={styles.player8} type="right"/>
          <Player name="player9" src={require("./static/images/defaultPlayer.png")} balance="4004" playerStyle={styles.player9} type="right"/>**/}  
          <Image style={styles.chipsBg} source={require("./static/images/chips.png")}/>
          <LoadingBar I18n = {I18n}/>
        </ImageBackground>
      </View>
    )
  }
}

export default TexasPoker;
const styles = StyleSheet.create({
  wrap:{
    flex:1,
  },
  tableBg:{
    width:"100%",
    height:"100%",
    position:"absolute"
  },
  backBtnWrap:{
    position:"absolute",
    top:10,
    left:20,
  },
  backBtn:{
    width:33,
    height:32,
  },
  chipsBg:{
    width:40,
    height:32,
    position:"absolute",
    bottom:64,
    left:10,
  },
  player1:{
    left:"50%",
    marginLeft:-56,
    bottom:64,
  },
  player2:{
    left:93,
    bottom:64,
  },
  player3:{
    left:10,
    bottom:145,
  },
  player4:{
    left:10,
    top:110,
  },
  player5:{
    left:151,
    top:30,
  },
  player6:{
    right:151,
    top:30,
  },
  player7:{
    right:10,
    top:110,
  },
  player8:{
    right:10,
    bottom:145,
  },
  player9:{
    right:93,
    bottom:64,
  },
});