import React, {
  Component,
  StyleSheet,
  View,
  Text,
  TabBarIOS,
  Alert
} from 'react-native';

import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav'

var Icon = require('react-native-vector-icons/Ionicons');
var ControlledRefreshableListView = require('react-native-refreshable-listview/lib/ControlledRefreshableListView');
var DataProvider = require('../providers/DataProvider');

const emptyDataSource = new ControlledRefreshableListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

var criteriaCache = [];

class CriteriaScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      type: 0,
      dataSource: emptyDataSource,
      loading: false
    }
  }

  componentDidMount() {
    this.setType(this.state.type);
  }

  getDataSource(data) {
    return data && data.length > 0 ? this.state.dataSource.cloneWithRows(data) : emptyDataSource;
  }

  setType(type) {
    var criteria = criteriaCache[type];
    this.setState({
      type: type,
      dataSource: this.getDataSource(criteria)
    });
    if (!criteria) {
      this.loadCriteria();
    }
  }

  loadCriteria() {
    this.setState({loading: true});
    return DataProvider.getCriteria(this.state.type)
      .then(this.onCriteriaLoad.bind(this))
      .catch(this.onNetworkError.bind(this));
  }

  onCriteriaLoad(criteria) {
    this.setState({
      dataSource: this.getDataSource(criteria),
      loading: false
    });
    criteriaCache[this.state.type] = criteria;
  }

  onNetworkError() {
    this.setState({loading: false});
    Alert.alert('Не удалось загрузить данные');
  }

  render() {
    return (
      <TabBarIOS>
        <Icon.TabBarItem
          title="Группы"
          iconName="ios-people-outline"
          selectedIconName="ios-people"
          onPress={this.setType.bind(this, 0)}
          selected={this.state.type == 0}>
          <ControlledRefreshableListView
            isRefreshing={this.state.loading}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            renderSeparator={this.renderSeparator}
            onRefresh={this.loadCriteria.bind(this)}
            refreshDescription="Загружаем группы..."
          />
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="Преподаватели"
          iconName="ios-person-outline"
          selectedIconName="ios-person"
          onPress={this.setType.bind(this, 1)}
          selected={this.state.type == 1}>
          <ControlledRefreshableListView
            isRefreshing={this.state.loading}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            renderSeparator={this.renderSeparator}
            onRefresh={this.loadCriteria.bind(this)}
            refreshDescription="Загружаем преподавателей..."
          />
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="Аудитории"
          iconName="ios-home-outline"
          selectedIconName="ios-home"
          onPress={this.setType.bind(this, 2)}
          selected={this.state.type == 2}>
          <ControlledRefreshableListView
            isRefreshing={this.state.loading}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            renderSeparator={this.renderSeparator}
            onRefresh={this.loadCriteria.bind(this)}
            refreshDescription="Загружаем аудитории..."
          />
        </Icon.TabBarItem>
      </TabBarIOS>
    );
  }

  renderRow(criterion) {
    return (
      <Text style={styles.criterion}>{criterion.name}</Text>
    );
  }

  renderSeparator(sectionID, rowID) {
    return (
      <View
        key={'SEP_' + sectionID + '_' + rowID}
        style={styles.separator}
      />
    );
  }

}

const styles = StyleSheet.create({
  criterion: {
    fontSize: 16,
    padding: 15
  },
  separator: {
    height: 1,
    backgroundColor: '#eeeeee'
  }
});

module.exports = CriteriaScreen;
