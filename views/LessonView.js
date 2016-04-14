import React, {
  Component,
  StyleSheet,
  View,
  Text
} from 'react-native';

class LessonView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.number}>
          {this.props.lesson.number}
        </Text>
        <View style={styles.rightContainer}>
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
  },
  number: {
    fontSize: 20,
    fontWeight: '500'
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'red'
  }
});

module.exports = LessonView;
