import React, { Component, } from 'react'
import { View,ImageBackground,StyleSheet,Text} from 'react-native';
import Player1 from './player1';
import Player2 from './player2';
import Player3 from './player3';
import Player4 from './player4';
import Player5 from './player5';
import Player6 from './player6';
import Player7 from './player7';
import Player8 from './player8';
import Player9 from './player9';
import RiverBox from './riverBox';
import Slots from './slots';

class Table extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      player1Display:"none",
    }
  }

  render() {
    const {store,I18n} = this.props;   
    return (   
      <ImageBackground style={styles.table} source={require("./../static/images/tableBg.png")}>
        <RiverBox store={store}/>
        <Player2 store={store} I18n={I18n}/>
        <Player3 store={store} I18n={I18n}/>
        <Player4 store={store} I18n={I18n}/>
        <Player5 store={store} I18n={I18n}/>
        <Player6 store={store} I18n={I18n}/>
        <Player7 store={store} I18n={I18n}/>
        <Player8 store={store} I18n={I18n}/>
        <Player9 store={store} I18n={I18n}/>
        <Player1 store={store} I18n={I18n}/>
        {/**river**/}
        {/**slot**/}
        <Slots store={store}/>
      </ImageBackground>
    )
  }
}

export default Table;
const styles=StyleSheet.create({
  table:{
    width:558,
    height:244,
    position:"absolute",
    left:"50%",
    top:40,
    marginLeft:-278,
  },
});