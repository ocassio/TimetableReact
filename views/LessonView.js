import React, {
  Component,
  StyleSheet,
  View,
  Text
} from 'react-native';

var Icon = require('react-native-vector-icons/Ionicons');

class LessonView extends Component {
  render() {
    var lesson = this.props.lesson;

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.number}>{lesson.number}</Text>
          <Text style={styles.time}>{lesson.time.from}</Text>
          <Text style={styles.time}>{lesson.time.to}</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.name}>
            {lesson.name}
          </Text>
          <View style={styles.row}>
            {this.renderText('ios-location', lesson.room, styles.stretched)}
            {this.renderText('ios-flask', lesson.type, styles.stretched)}
          </View>
          {this.renderText('ios-person', lesson.teacher)}
          {this.renderText('ios-people', lesson.group)}
          {this.renderText('document-text', lesson.note)}
        </View>
      </View>
    );
  }

  renderText(icon, value, style) {
    if (!value) return;

    return (
      <View style={[styles.row, style]}>
        <Icon
          style={styles.icon}
          name={icon}
          size={15}
         />
        <Text style={styles.text}>{value}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 20
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  number: {
    width: 35,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '300',
    marginBottom: 7
  },
  time: {
    width: 35,
    fontSize: 12,
    fontWeight: '300',
    textAlign: 'center'
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 20
  },
  row: {
    flexDirection: 'row'
  },
  name: {
    fontSize: 17,
    marginBottom: 10
  },
  text: {
    flex: 1,
    fontSize: 13,
    marginBottom: 5,
    fontWeight: '300'
  },
  icon: {
    marginRight: 10,
    width: 15,
    textAlign: 'center'
  },
  stretched: {
    flex: 1
  },

});

module.exports = LessonView;
