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

import HtmlView from 'react-native-htmlview';

import { H1, H2, H3, H4 } from '../components/Headings';

import globalStyles from '../globalStyles';


let aboutText = `
<p>JordanCon is a fantasy literature convention founded in honor of the late author, Robert Jordan. Jordan was the author of the best-selling The Wheel of Time series. JordanCon features eight tracks of simultaneous programming, a Dealers' Hall, gaming, an Art Show featuring original art by a variety of artists, and charity events benefiting the Mayo Clinic and other charities. Past guests have included Harriet McDougal, Brandon Sanderson, Mary Robinette Kowal, Sam Weber, David Wong, Jana G. Oliver, Emilie Bush, David B. Coe, Eugie Foster, Seanan McGuire, Michael Whelan, Larry Elmore, Saladin Ahmed, Todd Lockwood, and Patrick Rothfuss.</p>
<p>We are a <em>501(c)4<em></em></e> tax-exempt organization.</p>
<p>In 2013, we hosted the fifty-first DeepSouthCon, the Southeast's premiere regional convention for fans of genre literature, and we will be hosting DeepSouthCon 54 in 2016. Our 2016 Guests of Honor are Catherine Asaro and John Picacio.</p>
`;

let appText = `
<p><strong>Con-Nexus</strong> is a lightweight, open-source convention app framework created by Ben Gundersen, and currently built with React Native. You can find more information on <a href="https://github.com/bgun">GitHub</a>, or email me: <a href="mailto:ben@bengundersen.com">ben@bengundersen.com</a>.</p>
<p><em>Made with &hearts; in New York City</em></p>
`;

export default class AboutView extends Component {

  render() {
    return (
      <ScrollView style={ styles.view }>
        <H1>About JordanCon</H1>
        <HtmlView value={ aboutText } />

        <View style={{ borderTopColor: globalStyles.COLORS.border, borderTopWidth: 1, paddingTop: 30 }} />

        <H3>About This App</H3>

        <HtmlView value={ appText } />
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#FAFAFA',
    padding: 20
  }
});