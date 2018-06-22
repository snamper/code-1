import React, { Component, } from 'react'
import { View,StyleSheet,Image,DeviceEventEmitter,Text,Animated,Easing} from 'react-native'

class RunSlot extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      chipImage:require('./../static/images/borderOpacity1.png'),
      chipBg:require('./../static/images/borderOpacity1.png'),
      animated:"none",
      trans: new Animated.ValueXY(),
      rightNum:0
    }
  }

  componentWillMount(){
    this.endAll();
  }
  componentDidMount(){
    const _this = this;
    const type = this.props.type;
    switch(type){
      case "trans":
        this.setState({
          chipImage:require('./../static/images/slotChips.png'),
        });
        break;
      case "trans1":
        this.setState({
          chipImage:require('./../static/images/slotChips.png'),
          rightNum:60
        });
        break;
      case "trans2":
        this.setState({
          chipImage:require('./../static/images/slotChipsNormal.png'),
          rightNum:110
        });
        break;
      case "trans3":
        this.setState({
          chipImage:require('./../static/images/slotChipsSmall.png'),
          rightNum:150
        });
        break;
      default:
        return false;
        break;
    }
  }
  endAll(){
    const _this = this;
    const location = this.props.location;
    DeviceEventEmitter.addListener("START_ANIMATE",function(data){
      // console.log(data)
      _this.setState({
        animated:"flex",
      })
      // console.log(data)
      _this.handlerOnChange(data[location]["x"] - _this.state.rightNum,data[location]["y"]);
      setTimeout(function(){
        DeviceEventEmitter.emit("THE_ROUND_GAME_END");
      },2000)
    });
  }
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
        })},500));
  }
  render() {
    return (
      /***
        big >1000
        normal 100-1000
        small <100
      **/
      <View style={[styles[this.props.type],{display:this.props.display}]}>       
        <Animated.Image style={[styles.bigChip,{
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

export default RunSlot;
const styles = StyleSheet.create({
  trans3:{
    flexDirection:"row",
    justifyContent:"center",  
    width:55,
    height:26,
    marginLeft:10,
  },
  trans2:{
    flexDirection:"row",
    justifyContent:"center",  
    width:55,
    height:26,
    marginLeft:10,
  },
  trans1:{
    flexDirection:"row",
    justifyContent:"center",  
    width:40,
    height:26,
    marginLeft:10,
  },
  trans:{
    flexDirection:"row",
    justifyContent:"center",  
    width:55,
    height:26,
    marginLeft:10,
  },
  bigChip:{
    width:17,
    height:24,
    position:"absolute",
    bottom:2,
    left:3
  },
});