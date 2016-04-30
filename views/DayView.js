import React, {
  Component,
  StyleSheet,
  View,
  ListView,
  Text
} from 'react-native';

var LessonView = require('./LessonView');
var DateUtils = require('../utils/DateUtils');

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
    this.state.dataSource = this.state.dataSource.cloneWithRows(day.lessons);

    var headerStyles = [styles.header];
    var dayOfWeekStyles = [styles.dayOfWeek];
    var dateStyles = [styles.date];
    if (DateUtils.isToday(day.date)) {
      headerStyles.push(styles.todayBackground);
      dayOfWeekStyles.push(styles.today);
      dateStyles.push(styles.today);
    }

    return (
      <View style={styles.container}>
        <View style={headerStyles}>
          <Text style={dayOfWeekStyles}>
            {day.dayOfWeek}
          </Text>
          <Text style={dateStyles}>
            {day.date}
          </Text>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          contentContainerStyle={styles.list}
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
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#eeeeee'
  },
  header: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#efeff4'
  },
  dayOfWeek: {
    flex: 1,
    fontSize: 16,
    textAlign: 'left',
    fontWeight: '300'
  },
  date: {
    fontSize: 16,
    textAlign: 'right',
    marginLeft: 10,
    fontWeight: '300'
  },
  today: {
    color: '#ffffff',
    fontWeight: '400'
  },
  todayBackground: {
    backgroundColor: '#EC407A'
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start'
  }
});

module.exports = DayView;
