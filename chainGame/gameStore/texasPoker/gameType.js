import React, { Component, } from 'react';
import { View, Text,StyleSheet,ImageBackground,TouchableOpacity,Image,TextInput,Button,TouchableWithoutFeedback} from 'react-native';

import * as Status from "./status";
import * as Provider from "./active/provider";
import * as Active from "./active";
import Select from "./viewsComponent/select";
import Roller from "./viewsComponent/roller";
import SliderView from "./viewsComponent/sliderView";
class GameType extends Component {
  constructor(props) {
    super(props)
    this.state = {
      display:"flex",
      noLimit: true,
      limit: false,
      potLimit: false,
      display:"none",
      maxValue:"0",
      height: 20,
    }
  }
  componentWillMount(){
  }
  render(){
    const {I18n} = this.props.screenProps;
    const {navigate} = this.props.navigation; 
    return (
      <View style={styles.wrap}>       
        <ImageBackground source={require("./static/images/gameTypeBg.jpg")} style={styles.tableBg}>
          <TouchableOpacity  onPress={()=>{
              navigate("GameList")
            }} style={styles.backBtnWrap}>
            <Image style={styles.backBtn} source={require("./../../frameworks/static/images/back.png")}/>       
          </TouchableOpacity> 
          <View style={styles.gameMain}>
            <ImageBackground source={require("./static/images/gTypeMainBg1.png")} style={[styles.tableBg,styles.tableWrap]}>
              <TouchableOpacity style={styles.closeWrap} onPress={()=>{
                navigate("GameList")
              }}>
                <Image style={styles.close} source={require("./static/images/close2.png")}/>  
              </TouchableOpacity>
              <Select I18n={I18n} style={styles.selectWrap}/>
              <Roller I18n={I18n}/>
              <SliderView />
              <TouchableOpacity onPress={()=>{navigate("TexasPoker")}} style={styles.start}>
                <ImageBackground source={require("./static/images/buttonSelect1.png")} style={styles.tableBg}>
                  <Text style={styles.textStart}>{I18n.t("start")}</Text>
                </ImageBackground>
              </TouchableOpacity>                              
            </ImageBackground>
          </View>
        </ImageBackground>
      </View>
    )
  }
}

export default GameType;
const styles = StyleSheet.create({
  wrap:{
    flex: 1,
  },
  selectWrap:{
    position:"absolute",
    top:51,
    left:15,
    width:423,
    height:50,
  },
  tableBg:{
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  backBtnWrap:{
    position: "absolute",
    top: 15,
    left: 20,
    zIndex: 1001
  },
  tableWrap:{
    width:452,
    height:347,
    left:"50%",
    marginLeft:-226,
    top:15,
  },
  backBtn:{
    width: 33,
    height: 32,
  },
  gameMain:{
    width: "100%",
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 100
  },
  close:{
    width:20,
    height:20,
    position: "absolute",
    top:0,
    right:0,
  },
  closeWrap:{
    width: 20,
    height: 20,
    position: "absolute",
    right:10,
    top:10, 
  },
  textStart:{
    backgroundColor: 'rgba(0,0,0,0)',
    color: "#fff",
    textAlign: "center",
    lineHeight: 28,
    fontSize: 16
  },
  start:{
    width: 120,
    height: 35,
    position: "absolute",
    right: 15,
    bottom: 8,
  },
  sizeSelect: {
    width: 100,
    height: 35,
    textAlign: "center",
    lineHeight: 30,
    color: "#fff",
    fontSize: 20,
    position: "absolute",
    left: 100,
    top: 28,
    backgroundColor: "#a9945f",
    borderRadius:2
  },
});