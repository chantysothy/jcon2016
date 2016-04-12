'use strict';

import React, {
  AppRegistry,
  Dimensions,
  Image,
  MapView,
  PanResponder,
  StyleSheet,
  Text,
  View
} from 'react-native';

import globalStyles from '../globalStyles';

let window = Dimensions.get('window');


export default class HotelMapView extends React.Component {

  constructor() {
    super();
    this.state = {
      mapX: 0,
      mapY: 0
    }
  }

  componentWillMount() {
    this._lastLeft = this.state.mapX;
    this._lastTop  = this.state.mapY;

    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The guesture has started. Show visual feedback so the user knows
        // what is happening!

        // gestureState.{x,y}0 will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        console.log(gestureState);
        this.setState({
          mapX: this._lastLeft + gestureState.dx,
          mapY: this._lastTop  + gestureState.dy
        });
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderEnd: (evt, gestureState) => {
        this._lastLeft += gestureState.dx;
        this._lastTop  += gestureState.dy;
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });
  }

  render() {
    return (
      <View style={ styles.container } {...this._panResponder.panHandlers}>
        <Image
          style={[ styles.map, { left: this.state.mapX, top: this.state.mapY} ]}
          source={ require('image!hotel_map') }
          />
      </View>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#BBBBBB',
    flex: 1
  },
  map: {
    borderColor: globalStyles.COLORS.border,
    borderWidth: 10,
    height: (8.25)*120,
    position: 'absolute',
    width: (5.25)*120
  }
});