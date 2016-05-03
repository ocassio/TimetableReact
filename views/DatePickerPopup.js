import React, {
  PropTypes,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  DatePickerIOS,
  Dimensions
} from 'react-native';

import Overlay from 'react-native-overlay';
import Orientation from 'react-native-orientation';

function noop () {}

var counter = 0;

class DatePickerPopup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date: this.props.date
    };
  }

  componentDidMount() {
    this.id = 'DatePickerPopup:' + counter;
    Orientation.addOrientationListener(this.onRotate.bind(this), this.id);
  }

  componentWillUnmount() {
    Orientation.removeOrientationListener(this.id);
  }

  onRotate() {
    this.forceUpdate();
  }

  onSubmit() {
    this.props.onSubmit(this.state.date);
  }

  onPickerChange(date) {
    this.setState({
      date: date
    });
  }

  render() {
    const date = this.prevVisible == this.props.visible ? this.state.date : this.props.date;
    this.prevVisible = this.props.visible;

    if (!this.props.visible) return (<View/>);

    const containerStyle = {
      height: Dimensions.get('window').height
    }

    return (
      <Overlay isVisible={true}>
        <View style={[styles.container, containerStyle]}>
          <View style={styles.overlay}></View>
          <View style={styles.popup}>
            <View style={styles.actionBar}>
              <TouchableOpacity
                style={styles.button}
                activeOpacity={.5}
                onPress={this.props.onDismiss}
              >
                <Text style={styles.buttonText}>Отмена</Text>
              </TouchableOpacity>
              <View style={styles.spacer}></View>
              <TouchableOpacity
                style={styles.button}
                activeOpacity={.5}
                onPress={this.onSubmit.bind(this)}
              >
                <Text style={styles.buttonText}>ОК</Text>
              </TouchableOpacity>
            </View>
            <DatePickerIOS
              mode={this.props.mode}
              date={date}
              onDateChange={this.onPickerChange.bind(this)}
            />
          </View>
        </View>
      </Overlay>
    );
  }

}

DatePickerPopup.propTypes = {
  visible: PropTypes.bool,
  mode: PropTypes.oneOf(['date', 'time', 'datetime']),
  onSubmit: PropTypes.func,
  onDismiss: PropTypes.func
}

DatePickerPopup.defaultProps = {
  visible: false,
  mode: 'date',
  date: new Date(),
  onSumbit: noop,
  onDismiss: noop
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000',
    opacity: .5
  },
  popup: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
  },
  actionBar: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
    paddingHorizontal: 20
  },
  button: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 16,
    color: '#0ae'
  },
  spacer: {
    flex: 1
  }
});

export default DatePickerPopup;
