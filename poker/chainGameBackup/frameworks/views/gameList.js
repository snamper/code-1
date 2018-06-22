import React, { Component, } from 'react'
import { 
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

class GameList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.wrap}>
        <ImageBackground style={styles.bgImage} source={require("./../static/images/gameList.png")}>   
          <TouchableOpacity onPress={()=>{alert("coming soon!")}}>
            <ImageBackground style={styles.leftBtn} source={require("./../static/images/goAccount.png")}>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{navigate("LoginIn")}}>
            <ImageBackground style={styles.rightBtn} source={require("./../static/images/goLogin.png")}>
            </ImageBackground>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    )
  }
}
export default GameList;
const styles = StyleSheet.create({
  warp:{
    flex:1,
  },
  bgImage:{
    width:"100%",
    height:"100%",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"flex-end",
    paddingBottom:30,
  },
  leftBtn:{
    width:171,
    height:42
  },
  rightBtn:{
    width:171,
    height:42
  },
});