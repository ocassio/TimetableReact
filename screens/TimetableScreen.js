import React, {
  Component,
  StyleSheet,
  View,
  Text,
  Alert,
  NetInfo
} from 'react-native';

import {NavButton} from 'react-native-nav'

var Subscribable = require('Subscribable');
var CriteriaScreen = require('./CriteriaScreen');
var DateScreen = require('./DateScreen');
var Icon = require('react-native-vector-icons/Ionicons');
var ControlledRefreshableListView = require('react-native-refreshable-listview/lib/ControlledRefreshableListView');
var DayView = require('../views/DayView');
var DataProvider = require('../providers/DataProvider');
var StorageProvider = require('../providers/StorageProvider');

const emptyDataSource = new ControlledRefreshableListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

var TimetableScreen = React.createClass({

  mixins: [Subscribable.Mixin],

  getInitialState: function() {
    return {
      dataSource: emptyDataSource,
      loading: false
    };
  },

  componentDidMount: function() {
    this.addListenerOn(this.props.events, 'refreshTimetable', this.onRefresh);
    StorageProvider.getTimetable().then((timetable) => {
      if (!this.timetableHasBeenLoaded) {
        this.setState({dataSource: this.getDataSource(timetable)});
      }
    });
    NetInfo.isConnected.fetch().then((isConnected) => {
      if (isConnected) {
        this.loadTimetable();
      }
    });
  },

  getDataSource: function(data) {
    return data && data.length > 0 ? emptyDataSource.cloneWithRows(data) : emptyDataSource;
  },

  loadTimetable: function() {
    this.setState({loading: true});
    StorageProvider.getCriteriaType().then((criteriaType) => {
      StorageProvider.getCriterion().then((criterion) => {
        if (criterion) {
          StorageProvider.getDateRange().then((dateRange) => {
            DataProvider.getTimetable(criteriaType, criterion.id, dateRange)
              .then(this.onTimetableLoaded)
              .catch(this.onNetworkError);
          });
        } else {
          this.toCriteriaScreen();
        }
      });
    });
  },

  onTimetableLoaded: function(days) {
    this.timetableHasBeenLoaded = true;
    StorageProvider.setTimetable(days);
    this.setState({
      dataSource: this.getDataSource(days),
      loading: false
    });
  },

  onNetworkError: function() {
    if (!this.alertsLocked &&
        this.props.navigator.navigationContext.currentRoute.title == this.props.route.title) {
      this.alertsLocked = true;
      Alert.alert('Не удалось загрузить данные', null, [{
        text: 'OK',
        onPress: () => this.alertsLocked = false
      }]);
    }
    this.setState({loading: false});
  },

  onRefresh: function() {
    this.listView.getScrollResponder().scrollResponderScrollTo({x: 0, y: -64});
    this.loadTimetable();
  },

  toCriteriaScreen: function() {
    this.props.navigator.push({
      title: 'Выбор критерия',
      component: CriteriaScreen,
      passProps: {
        events: this.props.events
      }
    });
  },

  toCalendarScreen: function() {
    this.props.navigator.push({
      title: 'Выбор даты',
      component: DateScreen,
      passProps: {
        events: this.props.events
      }
    });
  },

  render: function() {
    return (
      <View style={styles.container}>
        <ControlledRefreshableListView
          ref={(c) => this.listView = c}
          isRefreshing={this.state.loading}
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          onRefresh={this.loadTimetable}
          refreshDescription="Загружаем расписание..."
        />
        {this.renderNoLessonsMessage()}
        <View style={styles.toolbar}>
          <NavButton onPress={this.toCriteriaScreen}>
            <Icon
              name="ios-people-outline"
              size={30}
              color="#2a83df"/>
          </NavButton>
          <View style={styles.spacer}>
          </View>
          <NavButton onPress={this.toCalendarScreen}>
            <Icon
              name="ios-calendar-outline"
              size={30}
              color="#2a83df"/>
          </NavButton>
        </View>
      </View>
    );
  },

  renderRow: function(day) {
    return (
      <DayView day={day} />
    );
  },

  renderNoLessonsMessage: function() {
    if (this.state.dataSource.getRowCount() > 0) return;
    return (
      <View style={styles.messageContainer}>
        <Text style={styles.message}>Пары отсутствуют</Text>
      </View>
    );
  }

});

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
  },
  messageContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    bottom: 44,
    left: 0,
    right: 0,
    // opacity: 0.5,
    alignItems: 'center',
    justifyContent: 'center'

  },
  message: {
    // marginTop: 100,
    // alignSelf: 'center',
    // textAlign: 'center',
    // backgroundColor: '#ff0000'
    opacity: 0.7,
    fontSize: 16,
    fontWeight: '300'
  }
});

module.exports = TimetableScreen;
