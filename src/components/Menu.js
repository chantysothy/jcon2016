'use strict';

import React from 'react-native';

let {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} = React;

import { Actions } from 'react-native-router-flux';

import Icon from 'react-native-vector-icons/Entypo';

import globalStyles from '../globalStyles';

let window = Dimensions.get('window');


class MenuItem extends React.Component {

  onPress() {
    Actions[this.props.action]();
    this.props.onAction();
  }

  render() {
    return (
      <TouchableOpacity style={ styles.menuItem } onPress={ () => this.onPress() }>
        <Icon name={ this.props.icon } size={16} color="white"/>
        <View style={{ width: 16 }} />
        <Text style={ styles.menuItemText }>{ this.props.text }</Text>
      </TouchableOpacity>
    )
  }
}

export default class Menu extends React.Component {
  render() {
    return (
      <ScrollView style={ styles.container }>
        <MenuItem key="hotelMap"   action="hotelMap"   text="Hotel Map"             icon="map"     onAction={ () => this.props.onAction() } />
        <MenuItem key="directions" action="directions" text="Location & Directions" icon="pin"     onAction={ () => this.props.onAction() } />
        <MenuItem key="feedback"   action="feedback"   text="Feedback"              icon="pencil"  onAction={ () => this.props.onAction() } />
        <MenuItem key="newsfeed"   action="newsFeed"   text="News & Updates"        icon="bell"    onAction={ () => this.props.onAction() } />
        <MenuItem key="about"      action="about"      text="About"                 icon="help"    onAction={ () => this.props.onAction() } />
      </ScrollView>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyles.COLORS.menuBg,
    flex: 1,
    height: window.height,
    paddingLeft: window.width/3, // side menu defaults to 2/3 of screen width
    paddingTop: 40
  },
  menuItem: {
    borderBottomColor: '#00000033',
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding: 16,
    width: window.width,
  },
  menuItemText: {
    color: 'white',
    fontSize: 16
  }
});
