import React, {
  Component,
  StyleSheet,
  View,
  Alert,
  NetInfo
} from 'react-native';

import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav'

var CriteriaScreen = require('./CriteriaScreen');
var Icon = require('react-native-vector-icons/Ionicons');
var ControlledRefreshableListView = require('react-native-refreshable-listview/lib/ControlledRefreshableListView');
var DayView = require('../views/DayView');
var DataProvider = require('../providers/DataProvider');

const emptyDataSource = new ControlledRefreshableListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

class TimetableScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: emptyDataSource,
      loading: false
    }
  }

  componentDidMount() {
    NetInfo.isConnected.fetch().then((isConnected) => {
      if (isConnected) {
        this.loadTimetable();
      }
    });
  }

  getDataSource(data) {
    return data && data.length > 0 ? this.state.dataSource.cloneWithRows(data) : emptyDataSource;
  }

  loadTimetable() {
    this.setState({loading: true});
    return DataProvider.getTimetable(0, '473', '02.04.2016', '10.04.2016')
      .then((days) => this.setState({
        dataSource: this.getDataSource(days),
        loading: false
      }))
      .catch(() => {
        if (this.state.loading) {
          Alert.alert('Не удалось загрузить данные');
          this.setState({loading: false});
        }
      });
  }

  toCriteriaScreen() {
    this.props.navigator.push({
      title: 'Выбор критерия',
      component: CriteriaScreen
    });
  }

  toCalendarScreen() {

  }

  render() {
    return (
      <View style={styles.container}>
        <ControlledRefreshableListView
          isRefreshing={this.state.loading}
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          onRefresh={this.loadTimetable.bind(this)}
          refreshDescription="Загружаем расписание..."
        />
        <View style={styles.toolbar}>
          <NavButton onPress={this.toCriteriaScreen.bind(this)}>
            <Icon
              name="ios-people-outline"
              size={30}
              color="#2a83df"/>
          </NavButton>
          <View style={styles.spacer}>
          </View>
          <NavButton onPress={this.toCalendarScreen.bind(this)}>
            <Icon
              name="ios-calendar-outline"
              size={30}
              color="#2a83df"/>
          </NavButton>
        </View>
      </View>
    );
  }

  renderRow(day) {
    return (
      <DayView day={day} />
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  list: {
    flex: 1
  },
  toolbar: {
    height: 44,
    backgroundColor: '#f8f8f8',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20
  },
  spacer: {
    flex: 1
  }
});

module.exports = TimetableScreen;
