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
    return (
      <View style={styles.container}>
        <Text>
          {this.props.day.date}
        </Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    );
  }

  renderRow(lesson) {
    return (
      <LessonView lesson={lesson}/>
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
