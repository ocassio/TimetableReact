import React, {
  Component,
  StyleSheet,
  View,
  ListView,
  Text
} from 'react-native';

var LessonView = require('./LessonView');

class DayView extends Component {

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(props.day.lessons)
    };
  }

  render() {
    var day = this.props.day;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.dayOfWeek}>
            {day.dayOfWeek}
          </Text>
          <Text style={styles.date}>
            {day.date}
          </Text>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator}
        />
      </View>
    );
  }

  renderRow(lesson) {
    return (
      <LessonView lesson={lesson}/>
    );
  }

  renderSeparator(sectionID, rowID) {
    return (
      <View
        key={'SEP_' + sectionID + '_' + rowID}
        style={styles.separator}
      />
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  separator: {
    height: 1,
    backgroundColor: '#eeeeee'
  },
  header: {
    flexDirection: 'row',
    padding: 10
  },
  dayOfWeek: {
    flex: 1,
    fontSize: 16,
    textAlign: 'left'
  },
  date: {
    fontSize: 16,
    textAlign: 'right',
    marginLeft: 10
  },
});

module.exports = DayView;
