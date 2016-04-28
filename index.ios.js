import React, {
  AppRegistry,
  Component,
  StyleSheet,
  View,
  NavigatorIOS,
  StatusBar
} from 'react-native';

import TimetableScreen from './screens/TimetableScreen';

var EventEmitter = require('EventEmitter');

class TimetableReact extends Component {

  componentWillMount() {
    this.eventEmitter = new EventEmitter();
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        <NavigatorIOS
          style={styles.nav}
          initialRoute={{
            title: 'Расписание',
            component: TimetableScreen,
            passProps: {
              events: this.eventEmitter
            }
          }}
          barTintColor='#303F9F'
          tintColor='#fff'
          titleTextColor="#fff"
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  nav: {
    flex: 1
  }
});

AppRegistry.registerComponent('TimetableReact', () => TimetableReact);
