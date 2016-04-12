'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import globalStyles from '../globalStyles';


export default class GuestItem extends Component {

  render() {
    let guest = global.con_data.guests.filter(g => (g.guest_id === this.props.guest_id))[0];
    if (!guest) {
      throw new Error("Guest not found");
    }
    return (
      <TouchableOpacity style={[globalStyles.floatingListItem,styles.item]} onPress={ () => Actions.guestDetail({ guest_id: guest.guest_id }) }>
        <Text style={ styles.text }>{ guest.name }</Text>
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 10,
    paddingVertical: 16
  },
  text: {
    fontSize: 16,
  }
});