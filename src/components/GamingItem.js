'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import _      from 'lodash';
import moment from 'moment';

import globalStyles from '../globalStyles';


export default class GamingItem extends React.Component {
  render() {
    let event = this.props.event;
    let formatDate = moment.utc(event.datetime).format('dddd h:mma');
    let guestList = event.guest_list.map(g => g.name).join(', ').trim();
    console.log(guestList);
    return (
      <View style={[globalStyles.floatingListItem, styles.item]}>
        <Text style={ styles.titleText }>{ event.title }</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={ styles.timeText  }>{ formatDate }</Text>
          <Text style={ styles.locationText  }>{ event.location }</Text>
        </View>
        { guestList ? (
          <Text style={ styles.guestList }>{ guestList }</Text>
        ) : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 10,
    paddingVertical: 12
  },
  guestList: {
    color: '#74A',
    fontSize: 15
  },
  titleText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#555'
  },
  timeText: {
    color: '#777',
    fontSize: 13
  },
  locationText: {
    color: '#77F',
    fontSize: 13,
    marginLeft: 13
  }
});
