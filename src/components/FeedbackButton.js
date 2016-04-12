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


export default class FeedbackButton extends Component {

  render() {
    return (
      <TouchableOpacity style={ styles.button } onPress={ () => Actions.feedback({ subject: this.props.subject }) }>
        <Text style={ styles.buttonText }>Submit feedback for { this.props.subject }</Text>
      </TouchableOpacity>
    );
  }

}
FeedbackButton.propTypes = {
  subject: React.PropTypes.string.isRequired
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#779',
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center'
  }
});