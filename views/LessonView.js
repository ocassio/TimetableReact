import React, {
  Component,
  StyleSheet,
  View,
  Text
} from 'react-native';

class LessonView extends Component {
  render() {
    var lesson = this.props.lesson;
    var note = lesson.note ? (<Text style={styles.note}>{lesson.note}</Text>) : null;

    return (
      <View style={styles.container}>
        <Text style={styles.number}>
          {lesson.number}
        </Text>
        <View style={styles.rightContainer}>
          <View style={styles.doubleTextContainer}>
            <Text style={styles.leftText}>
              {lesson.time.from} - {lesson.time.to}
            </Text>
            <Text style={styles.rightText}>
              {lesson.room}
            </Text>
          </View>
          <Text style={styles.name}>
            {lesson.name}
          </Text>
          {note}
          <View style={styles.doubleTextContainer}>
            <Text style={styles.leftText}>
              {lesson.teacher}
            </Text>
            <Text style={styles.rightText}>
              {lesson.type}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20
  },
  number: {
    width: 20,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '500'
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 20
  },
  doubleTextContainer: {
    flexDirection: 'row'
  },
  leftText: {
    flex: 1,
    fontSize: 14,
    textAlign: 'left'
  },
  rightText: {
    fontSize: 14,
    textAlign: 'right',
    marginLeft: 10
  },
  name: {
    fontSize: 17,
    fontWeight: '500',
    marginTop: 5,
    marginBottom: 5
  },
  note: {
    fontSize: 14,
    marginBottom: 5
  }
});

module.exports = LessonView;
