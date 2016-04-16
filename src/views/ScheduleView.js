'use strict';

import React from 'react-native';

let {
  Component,
  Dimensions,
  InteractionManager,
  ListView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} = React;

import _      from 'lodash';
import moment from 'moment';

import EventItem from '../components/EventItem';
import globalStyles from '../globalStyles';

let window = Dimensions.get('window');

let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

export default class ScheduleView extends Component {

  constructor(props) {
    super();

    var getSectionData = (dataBlob, sectionID) => {
      return dataBlob[sectionID];
    };

    var getRowData = (dataBlob, sectionID, rowID) => {
      return dataBlob[sectionID+':'+rowID];
    };

    let dataBlob = {};
    let sectionIDs = [];
    let rowIDs     = [];
    let currentDay = null;

    _.forEach(global.con_data.events, (e, index) => {
      let d = moment.utc(e.datetime); //, "YYYY-MM-DDThh:mm:ss");
      let day = days[d.day()];
      if (day !== currentDay) {
        sectionIDs.push(day);
        dataBlob[day] = d;
        rowIDs.push([]);
        currentDay = day;
      }
      let key = e.event_id+'-i'+index;
      rowIDs[rowIDs.length-1].push(key);
      dataBlob[day+':'+key] = e;
    });

    let ds = new ListView.DataSource({
      getRowData     : getRowData,
      getSectionData : getSectionData,
      rowHasChanged           : (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged : (s1, s2) => s1 !== s2
    });

    this.state = {
      dataSource: ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
      searchResults: []
    };
  }

  handleFilterInput(text) {
    if (text.length > 2) {
      let filteredEvents = global.con_data.events.filter(e => {
        return e.title.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
      this.setState({
        searchResults: filteredEvents,
        filterText: text
      });
      console.log("Displaying events", filteredEvents);
    } else {
      this.setState({
        searchResults: [],
        filterText: text
      });
    }
  }

  componentDidMount() {
    let now = moment.utc().format();
    console.log("now", now);
    let which_index = 0;
    let which = _.find(global.con_data.events, (event, index) => {
      which_index = index;
      return (event.datetime > now);
    });
    this.refs.listview.scrollTo({ y: which_index*59, animated: true });
  }

  renderSectionHeader(sectionData, sectionID) {
    return (
      <View style={ styles.section }>
        <Text style={ styles.sectionText }>
          { sectionData.format('dddd, MMMM D').toUpperCase() }
        </Text>
      </View>
    );
  }

  renderRow(rowData) {
    return <EventItem key={ rowData.event_id } event_id={ rowData.event_id } />;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        { this.state.searchResults.length ? (
          <View>
            <View style={[styles.section, { marginTop: 39 }]}><Text style={ styles.sectionText }>SEARCH RESULTS</Text></View>
            <ScrollView style={ styles.searchResults }>
              { this.state.searchResults.map(sr => (
                <EventItem key={ sr.event_id } event_id={ sr.event_id } />
              ) ) }
            </ScrollView>
          </View>
        ) : (
          <ListView
            ref='listview'
            style={ styles.scroll }
            dataSource={ this.state.dataSource }
            renderRow={ this.renderRow }
            renderSectionHeader={ this.renderSectionHeader }
          />
        ) }
        <View style={ styles.filterContainer }>
          <TextInput placeholder="Search for an event" style={ styles.filterInput } value={ this.state.filterText } onChangeText={ this.handleFilterInput.bind(this) } />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  filterContainer: {
    backgroundColor: 'white',
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    height: 40,
    paddingHorizontal: 10,
    position: 'absolute',
      top: 0,
      left: 0,
    width: window.width
  },
  filterInput: {
    fontSize: 15,
    height: 40
  },
  scroll: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    marginTop: 39
  },
  searchResults: {
    backgroundColor: '#F8F8F8',
    height: window.height - 40,
    position: 'absolute',
      left: 0,
    width: window.width
  },
  searchResultsHeader: {
    backgroundColor: globalStyles.COLORS.highlight,
    marginTop: 39,
    paddingHorizontal: 10,
    paddingVertical: 15
  },
  section: {
    backgroundColor: globalStyles.COLORS.sectionHeader,
    paddingHorizontal: 10,
    paddingVertical: 15,
    shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowRadius: 10
  },
  sectionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    opacity: 0.85
  }
});