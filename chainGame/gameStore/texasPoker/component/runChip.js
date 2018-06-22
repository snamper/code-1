import React, { Component, } from 'react'
import { View,StyleSheet,Image,DeviceEventEmitter,Text,Animated,Easing} from 'react-native'

class RunChip extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      chipImage:require("./../static/images/yellowChip.png"),
      animated:"none",
      trans: new Animated.ValueXY(),
    }
  }

  componentWillMount(){
    this.endAll();

  }
  componentDidMount(){
    const chipType = Number(this.props.text);
    if(chipType>999){ //purple
      this.setState({
        chipImage:require("./../static/images/purpleChip.png"),
      })
    }else if(chipType>99){ //red
      this.setState({  
        chipImage:require("./../static/images/redChip.png"),
      })      
    }else{ //yellow  <100
      this.setState({
        chipImage:require("./../static/images/yellowChip.png"),
      })
    }
  }
  endAll(){
    const _this = this;
    const location = this.props.location;
    DeviceEventEmitter.addListener("RUN_CHIP_TO_SLOT",function(){
      _this.setState({
        animated:  _this.props.style.display == "flex" ? "flex" : "none",
      })
      _this.handlerOnChange(location["x"],location["y"]);
    });
  }
  // handlerOnChange(x,y) { 
  //   const _this=this;
  //   Animated.spring(
  //     this.state.trans,
  //     {toValue: {
  //       x: x,
  //       y: y
  //     },
  //     duration: 200, // 动画时间
  //     easing: Easing.linear}).start(() => {
  //       _this.setState({
  //         animated:"none"
  //       })
  //     });
  // }
  handlerOnChange(x,y) { 
    const _this=this;
    Animated.spring(
      this.state.trans,
      {toValue: {
        x: x,
        y: y
      },
      duration: 500, // 动画时间
      easing: Easing.linear}).start(() => setTimeout( () =>{
         _this.setState({
          animated:"none",
          trans: new Animated.ValueXY(),
        },() => {
          _this.props.change()
        })},500));
  }
  render() {
    return (
      /***
        big >1000
        normal 100-1000
        small <100
      **/
      <View style={[styles[this.props.wrap+"Wrap"],styles[this.props.align+"Wrap"],this.props.style]}>       
        <Animated.Image style={[styles.chip,styles[this.props.align+"Chip"],{
                                  transform:[
                                    {translateY:this.state.trans.y},
                                    {translateX:this.state.trans.x},
                                  ],
                                  display:this.state.animated
                                }]} 
            source={this.state.chipImage}
          >
          </Animated.Image>
      </View>
    )
  }
}

export default RunChip;
const styles = StyleSheet.create({
  bigWrap:{
    width:52,
    height:16,
    position:"absolute",
    flexDirection:"row",
  },
  smallWrap:{
    width:44,
    height:16,
    position:"absolute",
  },
  opacity:{
    width:"100%",
    height:"100%",
    position:"absolute",
    top:0,
    left:0,
  }, 
  chip:{
    width:16,
    height:16,
  },
  text:{
    backgroundColor:"rgba(0,0,0,0)",
    color:"#d1d22f",
    fontSize:12,
  },
  //postion 
  //topRight
  topRightWrap:{
    top:-18,
    left:"50%",
    marginLeft:-26,
  },
  topRightChip:{
    position:"absolute",
    right:3,
    bottom:3,
  },
  topRightText:{
    left:4
  },
  rightLeftWrap:{
    top:8,
    left:71,
  },
  rightLeftChip:{
    position:"absolute",
    left:2,
    bottom:3,
  },
  rightLeftText:{
    left:20
  },
  rightLeftBottomWrap:{
    top:52,
    left:67,
  },
  rightLeftBottomChip:{
    position:"absolute",
    left:2,
    bottom:3,
  },
  rightLeftBottomText:{
    left:20
  },
  rightLeftCenterWrap:{
    bottom:-10,
    left:60,
  },
  rightLeftCenterChip:{
    position:"absolute",
    left:2,
    bottom:3,
  },
  rightLeftCenterText:{
    left:20
  }, 
  rightLeftTopWrap:{
    top:35,
    left:74,
  },
  rightLeftTopChip:{
    position:"absolute",
    left:2,
    bottom:3,
  },
  rightLeftTopText:{
    left:20
  },
  leftLeftTopWrap:{
    bottom:-40,
    right:6,
  },
  leftLeftTopChip:{
    position:"absolute",
    left:2,
    bottom:3,
  },
  leftLeftTopText:{
    left:20
  },
  rightRightTopWrap:{
    top:35,
    right:72,
  },
  rightRightTopChip:{
    position:"absolute",
    right:2,
    bottom:3,
  },
  rightRightTopText:{
    left:2
  },
  rightRightCenterWrap:{
    top:66,
    right:58,
  },
  rightRightCenterChip:{
    position:"absolute",
    right:2,
    bottom:3,
  },
  rightRightCenterText:{
    left:2
  },
  rightRightBottomWrap:{
    top:50,
    right:67,
  },
  rightRightBottomChip:{
    position:"absolute",
    right:2,
    bottom:3,
  },
  rightRightBottomText:{
    left:2
  },
  rightRightLowWrap:{
    top:9,
    right:70,
  },
  rightRightLowChip:{
    position:"absolute",
    right:2,
    bottom:3,
  },
  rightRightLowText:{
    left:2
  },  
}); 