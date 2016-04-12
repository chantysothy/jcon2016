'use strict';

import React, {
  Alert,
  Component,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import moment from 'moment';

import { H1, H2, H3, H4 } from '../components/Headings';

import dataStore from '../dataStore';

import globalStyles from '../globalStyles';


export default class AboutView extends Component {

  constructor() {
    super();
    this.state = {
      newsItems: []
    }
  }

  componentWillMount() {
    dataStore.fetchNews()
      .then(resp => {
        this.setState({
          newsItems: resp
        });
      }).done();
  }

  render() {
    let newsItems = this.state.newsItems.map((ni, index) => (
      <View key={ "news"+index } style={ styles.newsItem }>
        <H3>{ ni.headline }</H3>
        <Text style={ styles.time }>{ moment(ni.datetime).format('dddd, MMMM D h:m a') }</Text>
        <Text style={ styles.text }>{ ni.content }</Text>
      </View>
    ));
    return (
      <ScrollView style={ styles.view }>
        <H2>Convention News &amp; Updates</H2>
        { newsItems }
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#FAFAFA',
    padding: 20
  },
  newsItem: {
    borderTopColor: '#DDD',
    borderTopWidth: 1,
    paddingBottom: 20
  },
  time: {
    color: '#777',
    fontSize: 13,
    fontStyle: 'italic',
    marginBottom: 5
  },
  text: {
    fontSize: 15
  }
});