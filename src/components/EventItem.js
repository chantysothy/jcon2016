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

import Icon from 'react-native-vector-icons/Entypo';

import { Actions } from 'react-native-router-flux';

import globalStyles from '../globalStyles';


export default class EventItem extends Component {

  render() {
    let event = _.find(global.con_data.events, e => (e.event_id === this.props.event_id));
    if (!event) {
      throw new Error("Event not found!");
    }
    let isTodo = global.todos.has(event.event_id);
    let formatDate = moment.utc(event.datetime).format('dddd h:mma');
    return (
      <TouchableOpacity style={[globalStyles.floatingListItem, styles.item]} onPress={ () => Actions.eventDetail({ event_id: event.event_id }) }>
        <View style={{ flex: 1 }}>
          <Text style={ styles.titleText }>{ event.title }</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={ styles.timeText  }>{ formatDate }</Text>
            <Text style={ styles.locationText  }>{ event.location }</Text>
          </View>
        </View>
        { isTodo ? (
          <Icon name="star" color={ globalStyles.COLORS.highlight } size={20} style={{ paddingTop: 8, paddingRight: 8 }} />
        ) : null }
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 12
  },
  titleText: {
    fontSize: 16
  },
  timeText: {
    color: '#666666',
    fontSize: 13
  },
  locationText: {
    color: '#77F',
    fontSize: 13,
    marginLeft: 13
  }
});