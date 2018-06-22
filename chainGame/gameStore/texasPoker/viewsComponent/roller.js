import React, { Component, } from 'react'
import { View,StyleSheet,Text,ImageBackground } from 'react-native'
import Picker from 'react-native-hardskilled-picker';
class Roller extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      array:[{value:1,label:"10/20"},{value:2,label:"20/40"},{value:3,label:"30/60"},{value:4,label:"40/80"}],
      test:"0/0"
    }
  }
  componentWillMount(){
  }
  handlerOnChange(item){
  
  }
  render() {
    return (
        <View style={styles.content}>
          <Text style={styles.size}>大/小 盲注:</Text>
          {/* <Text style={styles.sizeSelect}>MAX</Text> */}
          <View style={styles.wheel}>
            <ImageBackground source={require(".././static/images/wheelBg.png")} style={styles.tableBg}>
              <View style={styles.pickerWrap}>
                <Picker style={{position:"absolute",borderWidth:1,borderColor:"black"}}
                  array={this.state.array} 
                  elements={3} 
                  upButton={<Text style={{display:"none"}}>eeee</Text>}
                  downButton={<Text style={{display:"none"}}>eeee</Text>}
                  onChange={this.handlerOnChange.bind(this)} // onChange callback
                  currentTextStyles={{ color: '#fff' }} // Style for current element
                  currentTopStyles={{ borderTopColor: 'rgba(0,0,0,0)' }} // Style for top border
                  currentBottomStyles={{ borderBottomColor: 'rgba(0,0,0,0)' }} // Style for bottom border
                  textItem={{ fontSize: 18 }} // Text item style
                  viewItem={{ height: 20 }} // View item style
                  value={3} // Default value
                />
              </View>
            </ImageBackground>
          </View>
        </View>
    )
  }
}

export default Roller;
const styles = StyleSheet.create({
  content:{
    width: 420,
    height: 90,
    position: "absolute",
    left: 24,
    top: 118,
  },
  size: {
    width: 120,
    height: 90,
    textAlign: "center",
    lineHeight: 56,
    color: "#fff",
    fontSize: 20,
    position: "absolute",
    left: 0,
    top: 0,
    backgroundColor:"rgba(0,0,0,0)",
  },
  wheel: {
    width: 80,
    height: 60,
    position: "absolute",
    left: 120,
    top: -60,
    backgroundColor:"rgba(0,0,0,0)",
  },
  tableBg:{
    width: "100%",
    height: "100%",
    position: "absolute",
    top:60,
    overflow:"hidden",
  },
  pickerWrap:{
    width:80,
    height:60,
    position:"absolute",
    top:-54,
    left:0,
  },
});