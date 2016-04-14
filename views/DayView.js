import React, {
  Component,
  StyleSheet,
  View,
  Text
} from 'react-native';

class DayView extends Component {

  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Расписание',
          component: TimetableScreen
        }}
      />
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
});

module.exports = DayView;
