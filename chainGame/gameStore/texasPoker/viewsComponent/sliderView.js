import React, { Component, } from 'react'
import { View,StyleSheet,Text } from 'react-native'
import Slider from "./sliderPersonal";
class SliderView extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      maxValue:0,
    }
  }

  render() {
    return (
      <View style={styles.bottomBox}>
        <View style={styles.bottomBoxTop}>
          <Text style={styles.buyIn}>Buyin:</Text>
        </View>
        <View style={styles.bottomBoxMain}>
          <Slider onValueChange={value=>this.setState({
            maxValue:value
            })} style={styles.bar} value={0} minimumValue={0} maximumValue={10000} trackShowImage={require("./../static/images/slideFrameShow.png")} trackImage={require("./../static/images/slideFrameBg.png")} thumbTouchSize={{width:20,height:50}} minimumTrackTintColor="rgba(0,0,0,0)" trackStyle={styles.track} thumbStyle={styles.thumb} thumbTintColor="#95712a">
          </Slider>
        </View>
        <Text style={styles.account}>${parseInt(this.state.maxValue)}</Text>
      </View>
    )
  }
}
export default SliderView;
const styles = StyleSheet.create({
  bottomBox: {
    width: 434,
    height: 110,
    position: "absolute",
    left:18,
    top:200,
  },
  bottomBoxTop: {
    width: 434,
    height: 40,
    backgroundColor:"rgba(0,0,0,0)",
    position: "absolute",
    left: 0,
    top: 0,
  },
  buyIn: {
    height: "100%",
    width: 100,
    color: "#fff",
    fontSize: 20,
    lineHeight: 30,
    position: "absolute",
    top: 0,
    left: 20,
    backgroundColor:"rgba(0,0,0,0)",
  },
  bottomBoxMain: {
    width: 434,
    height: 36,
    backgroundColor:"rgba(0,0,0,0)",
    position: "absolute",
    left: 0,
    top: 35,
  },
  bar:{
    width:300,
    height:20,
    position:"absolute",
    bottom: 10,
    left: 20,
    zIndex:1000
  },
  custom: {
    height: "100%",
    width: 100,
    color: "#fff",
    fontSize: 20,
    lineHeight: 30,
    textAlign: "right",
    position: "absolute",
    top: 0,
    right: 20,
    backgroundColor:"rgba(0,0,0,0)",
  },
  track:{
    width:300,
    height:20,
    backgroundColor:"#cbac6f", // 显示颜色
    //borderRadius:10
  },
  thumb:{
    width:10,
    height:36,
    //transform:[{rotate:"-85deg"}],
  },
  account:{
    width:80,
    height:20,
    position:"absolute",
    bottom:20,
    left:20,
    backgroundColor:"rgba(0,0,0,0)",
    fontSize:18,
    color:"#fff",
    textAlign:"left",
    lineHeight:20,
    fontWeight:"bold",
  },
  buyInRatio:{
    width:200,
    height:36,
    position:"absolute",
    bottom:5,
    left: 20,
    backgroundColor:"rgba(0,0,0,0)"
  },
  buyInRatioInfo:{
    width:200,
    height:18,
    fontSize:16,
    lineHeight:18,
    color:"#fff",
  },
  buyInRatioNum:{
    width:200,
    height:18,
    fontSize:16,
    lineHeight:18,
    color:"#fff",
    backgroundColor:"rgba(0,0,0,0)"
  }
});