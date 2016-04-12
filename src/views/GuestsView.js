'use strict';

import React from 'react-native';
import _     from 'lodash';

let {
  Component,
  InteractionManager,
  ListView,
  StyleSheet,
  Text,
  View
  } = React;

import GuestItem from '../components/GuestItem';


export default class GuestsView extends Component {

  constructor(props) {
    super();
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    let sortedGuests = _.sortBy(global.con_data.guests, 'name');
    this.state = {
      dataSource: ds.cloneWithRows(sortedGuests)
    };
  }

  render() {
    return (
      <ListView
        style={ styles.scroll }
        dataSource={ this.state.dataSource }
        renderRow={ rowData => <GuestItem key={ rowData.guest_id } guest_id={ rowData.guest_id } /> }
      />
    );
  }

}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: '#FFFFFF',
    flex: 1
  }
});