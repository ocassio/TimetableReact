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
        <Text style={styles.header}>Диапазон</Text>
        <View style={styles.dateOptionsContainer}>
          <SegmentedControls
            selectedOption={dateOptions[0]}
            options={dateOptions}
            direction='column'
          />
        </View>
        <Text style={styles.header}>Выберите дату</Text>
        <View style={styles.customDateContainer}>
          <Text style={styles.customDateLabel}>От</Text>
          <Text style={styles.customDateValue}>25.04.2016</Text>
        </View>
        <View style={styles.separator}/>
        <View style={styles.customDateContainer}>
          <Text style={styles.customDateLabel}>До</Text>
          <Text style={styles.customDateValue}>30.04.2016</Text>
        </View>
        <View style={styles.separator}/>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    marginTop: 64
  },
  header: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#eeeeee'
  },
  dateOptionsContainer: {
    margin: 10
  },
  customDateContainer: {
    flexDirection: 'row',
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  customDateLabel: {
    marginRight: 10,
    fontWeight: '500'
  },
  customDateValue: {
    flex: 1,
    textAlign: 'right',
    fontWeight: '300'
  },
  separator: {
    height: 1,
    backgroundColor: '#eeeeee'
  }
});

module.exports = DateScreen;
