'use strict';

import React, {
  Component,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import globalStyles from '../globalStyles';

import GuestItem from '../components/GuestItem';
import { H1, H2, H3, H4 } from '../components/Headings';


export default class FeedbackView extends Component {

  constructor() {
    super();
    this.state = {
      text: null
    }
  }

  handleInput(text) {
    this.state.text = text;
  }

  handlePress() {
    let url = 'http://con-nexus.bgun.me/api/feedback';
    if (!this.state.text) {
      global.makeToast("You haven't entered any text yet!");
      return;
    }
    Actions.pop();
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        con_id: 'jcon2016',
        subject: this.props.subject,
        text: this.state.text
      })
    }).then(() => {
      global.makeToast("Feedback submitted. Thank you!");
    }).catch(() => {
      global.makeToast("Error submitting feedback");
    });
  }

  render() {
    return (
      <ScrollView style={ styles.view }>
        <H2>Feedback for { this.props.subject }</H2>
        <Text style={{ fontSize: 14, paddingVertical: 10 }}>
          Please enter your comments below. The feedback is anonymous. If you would like
          to be contacted with regard to your comment or question, please add contact details below.
          Thanks, we appreciate any and all feedback!
        </Text>
        <H4>How was { this.props.subject }?</H4>
        <View style={ styles.inputContainer }>
          <TextInput
            multiline={ true }
            placeholder="Type your feedback here."
            onChangeText={ this.handleInput.bind(this) }
            style={ styles.input }
            value={ this.state.text }
          />
        </View>
        <TouchableOpacity onPress={ () => this.handlePress() } style={ styles.button }>
          <Text style={ styles.buttonText }>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
FeedbackView.propTypes = {
  subject: React.PropTypes.string.isRequired
};
FeedbackView.defaultProps = {
  subject: "JordanCon 2016"
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#FAFAFA',
    padding: 20
  },
  inputContainer: {
    backgroundColor: '#FFF',
    borderColor: '#EEE',
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    height: 200,
    padding: 10
  },
  button: {
    alignItems: 'center',
    backgroundColor: globalStyles.COLORS.highlight,
    borderRadius: 10,
    marginBottom: 50,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  buttonText: {
    color: 'white'
  }
});