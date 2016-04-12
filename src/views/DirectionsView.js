'use strict';

import React, {
  Alert,
  Component,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import HtmlView from 'react-native-htmlview';

import { H1, H2, H3, H4 } from '../components/Headings';

import globalStyles from '../globalStyles';
import ExternalLink from '../components/ExternalLink';


export default class AboutView extends Component {

  render() {
    return (
      <ScrollView style={ styles.view }>
        <View style={{ marginHorizontal: 10 }}>
          <H3>Convention Maps</H3>
        </View>
        <TouchableOpacity style={ styles.btn } onPress={ () => Actions.hotelMap() }>
          <Text style={ styles.btnText }>Hotel Map</Text>
        </TouchableOpacity>

        <View style={{ marginHorizontal: 10 }}>
          <H3>Hotel Info</H3>
        </View>
        <View style={ styles.btn }>
          <ExternalLink url="https://www.google.com/maps/place/Atlanta+Marriott+Perimeter+Center/@33.9176679,-84.3465655,17z">
            <Text style={[ styles.address, { fontWeight: 'bold' }]}>Atlanta Marriott Perimeter Center</Text>
            <Text style={ styles.address }>246 Perimeter Center Pkwy NE</Text>
            <Text style={ styles.address }>Atlanta, GA 30346</Text>
          </ExternalLink>
        </View>
        <View style={ styles.btn }>
          <ExternalLink url="tel://7703946500">
            <Text style={ styles.phone }>(770) 394-6500</Text>
          </ExternalLink>
        </View>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#FAFAFA',
    padding: 20
  },
  address: {
    color: globalStyles.COLORS.highlightDark,
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center'
  },
  btn: {
    borderColor: globalStyles.COLORS.border,
    borderRadius: 5,
    borderWidth: 1,
    margin: 10,
    padding: 10
  },
  btnText: {
    color: '#548',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  phone: {
    color: globalStyles.COLORS.highlightDark,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});