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
var StorageProvider = require('../providers/StorageProvider');

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
      customDateRange: DateUtils.getTodayRange(),
      datePickerValue: new Date(),
      fromSelected: false,
      toSelected: false
    }
  }

  componentDidMount() {
    StorageProvider.getDateRangeOption().then((option) => {
      this.setState({
        selectedOption: dateOptions[option]
      });
    });
    StorageProvider.getCustomDateRange().then((dateRange) => {
      this.setState({
        customDateRange: dateRange
      });
    });
  }

  onSelectedOptionChanged(option) {
    StorageProvider.setDateRangeOption(dateOptions.indexOf(option))
      .then(() => this.props.events.emit('refreshTimetable'));
    this.setState({selectedOption: option});
  }

  onFromSelected() {
    this.setState({
      fromSelected: true,
      datePickerValue: DateUtils.toDate(this.state.customDateRange.from)
    });
  }

  onToSelected() {
    this.setState({
      toSelected: true,
      datePickerValue: DateUtils.toDate(this.state.customDateRange.to)
    });
  }

  onCustomDateChanged(date) {
    var state = {
      fromSelected: false,
      toSelected: false
    };
    if (this.state.fromSelected) {
      state.customDateRange = {
        from: DateUtils.toString(date),
        to: DateUtils.isBefore(date, this.state.customDateRange.to) ?
              this.state.customDateRange.to : DateUtils.toString(date)
      }
    }
    else if (this.state.toSelected) {
      state.customDateRange = {
        from: DateUtils.isAfter(date, this.state.customDateRange.from) ?
              this.state.customDateRange.from : DateUtils.toString(date),
        to: DateUtils.toString(date)
      }
    }
    StorageProvider.setCustomDateRange(state.customDateRange)
      .then(() => this.props.events.emit('refreshTimetable'));
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
          defaultDate={this.state.datePickerValue}
          date={this.state.datePickerValue}
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

    return (
      <View>
        <Text style={styles.header}>Выберите дату</Text>
        <TouchableHighlight
          onPress={this.onFromSelected.bind(this)}
          underlayColor='#eeeeee'
        >
          <View style={styles.customDateContainer}>
            <Text style={styles.customDateLabel}>От</Text>
            <Text style={styles.customDateValue}>
              {this.state.customDateRange.from}
            </Text>
          </View>
        </TouchableHighlight>
        <View style={styles.separator}/>
        <TouchableHighlight
          onPress={this.onToSelected.bind(this)}
          underlayColor='#eeeeee'
        >
          <View style={styles.customDateContainer}>
            <Text style={styles.customDateLabel}>До</Text>
            <Text style={styles.customDateValue}>
              {this.state.customDateRange.to}
            </Text>
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
    backgroundColor: '#eeeeee',
    fontWeight: '300'
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
    fontWeight: '400'
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
