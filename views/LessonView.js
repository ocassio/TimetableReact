import React, {
  Component,
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native';

import Device from 'react-native-device';
import Orientation from 'react-native-orientation';
import Icon from 'react-native-vector-icons/Ionicons';

var counter = 0;

class LessonView extends Component {

  componentDidMount() {
    this.id = 'LessonView:' + ++counter;
    Orientation.addOrientationListener(this.onRotate.bind(this), this.id);
  }

  componentWillUnmount() {
    Orientation.removeOrientationListener(this.id);
  }

  onRotate() {
    this.forceUpdate();
  }

  render() {
    const lesson = this.props.lesson;
    const windowWidth = Dimensions.get('window').width;
    const width = Device.isIpad() ? 0.5 * windowWidth : windowWidth;
    const widthStyle = {width: width};

    return (
      <View style={[styles.container, widthStyle]}>
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
  }
});

module.exports = LessonView;
