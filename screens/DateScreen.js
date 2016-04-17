import React, {
  Component,
  StyleSheet,
  View,
  Text
} from 'react-native';

import {SegmentedControls} from 'react-native-radio-buttons'

const dateOptions = [
  '7 дней',
  'Текущая неделя',
  'Следующая неделя',
  'Текущий месяц',
  'Свой вариант'
];

class DateScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <View style={styles.container}>
        <SegmentedControls
          selectedOption={dateOptions[0]}
          options={dateOptions}
          direction='column'
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    marginTop: 80,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15
  }
});

module.exports = DateScreen;
