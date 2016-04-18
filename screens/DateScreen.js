import React, {
  Component,
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} from 'react-native';

import {SegmentedControls} from 'react-native-radio-buttons'
import PopupDatePicker from 'rn-date-picker/src/Popup';

var moment = require('moment');
var DateUtils = require('../utils/DateUtils');

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
      selectedOption: dateOptions[0],
      fromDate: new Date(),
      toDate: new Date(),
      fromSelected: false,
      toSelected: false
    }
  }

  componentDidMount() {

  }

  onSelectedOptionChanged(option) {
    this.setState({selectedOption: option});
  }

  onCustomDateChanged(date) {
    var state = {
      fromSelected: false,
      toSelected: false
    };
    if (this.state.fromSelected) {
      state.fromDate = date;
    }
    else if (this.state.toSelected) {
      state.toDate = date;
    }
    this.setState(state);
  }

  onCustomDateDismissed() {
    this.setState({
      fromSelected: false,
      toSelected: false
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Диапазон</Text>
        <View style={styles.dateOptionsContainer}>
          <SegmentedControls
            selectedOption={this.state.selectedOption}
            onSelection={this.onSelectedOptionChanged.bind(this)}
            options={dateOptions}
            direction='column'
            tint='#3F51B5'
          />
        </View>
        {this.renderCustomSection()}
        <PopupDatePicker
          visible={this.state.fromSelected || this.state.toSelected}
          mode='date'
          date={new Date()}
          onChange={this.onCustomDateChanged.bind(this)}
          onDismiss={this.onCustomDateDismissed.bind(this)}
          okText='ОК'
          dismissText='Отмена'
        />
      </View>
    );
  }

  renderCustomSection() {
    if (this.state.selectedOption != dateOptions[4]) return;

    var fromDate = DateUtils.toString(this.state.fromDate);
    var toDate = DateUtils.toString(this.state.toDate);

    return (
      <View>
        <Text style={styles.header}>Выберите дату</Text>
        <TouchableHighlight
          onPress={() => this.setState({fromSelected: true})}
        >
          <View style={styles.customDateContainer}>
            <Text style={styles.customDateLabel}>От</Text>
            <Text style={styles.customDateValue}>{fromDate}</Text>
          </View>
        </TouchableHighlight>
        <View style={styles.separator}/>
        <TouchableHighlight
          onPress={() => this.setState({toSelected: true})}
        >
          <View style={styles.customDateContainer}>
            <Text style={styles.customDateLabel}>До</Text>
            <Text style={styles.customDateValue}>{toDate}</Text>
          </View>
        </TouchableHighlight>
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
    margin: 10,
    marginLeft: 20,
    marginRight: 20
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
  },
  datePicker: {
    alignSelf: 'center'
  }
});

module.exports = DateScreen;
