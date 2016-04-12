'use strict';

import React, {
  AppRegistry,
  StyleSheet,
  MapView,
  Text,
  View
} from 'react-native';


export default class LocalMapView extends React.Component {

  render() {
    return (
      <View style={ styles.container }>
        <MapView
          region={{ latitude: 40.74, longitude: -74 }}
        />
      </View>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});