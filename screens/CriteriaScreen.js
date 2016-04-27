import React, {
  Component,
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  TabBarIOS,
  Alert
} from 'react-native';

import Search from 'react-native-search-bar';

var Subscribable = require('Subscribable');
var Icon = require('react-native-vector-icons/Ionicons');
var ControlledRefreshableListView = require('react-native-refreshable-listview/lib/ControlledRefreshableListView');
var DataProvider = require('../providers/DataProvider');
var StorageProvider = require('../providers/StorageProvider');

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
      query: '',
      loading: false
    }
  }

  componentDidMount() {
    StorageProvider.getCriteriaType().then((type) => {
      this.setType(type ? type : this.state.type);
    });
  }

  getDataSource(data) {
    if (!data) return emptyDataSource;

    var filteredData = data.filter((criterion) => {
      return criterion.name.toLowerCase().includes(this.state.query);
    });

    return filteredData.length > 0 ? emptyDataSource.cloneWithRows(filteredData) : emptyDataSource;
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
      .then(this.onCriteriaLoaded.bind(this))
      .catch(this.onNetworkError.bind(this));
  }

  onCriteriaLoaded(criteria) {
    this.setState({
      dataSource: this.getDataSource(criteria),
      loading: false
    });
    criteriaCache[this.state.type] = criteria;
  }

  onNetworkError(e) {
    console.error(e);
    if (!this.alertsLocked) {
      this.alertsLocked = true;
      Alert.alert('Не удалось загрузить данные', null, [{
        text: 'OK',
        onPress: () => this.alertsLocked = false
      }]);
    }
    this.setState({loading: false});
  }

  selectCriterion(criterion) {
    Promise.all([
      StorageProvider.setCriteriaType(this.state.type),
      StorageProvider.setCriterion(criterion)
    ]).then(() => {
      this.props.navigator.pop();
      this.props.events.emit('refreshTimetable');
    });
  }

  onSearchQueryChange(query) {
    this.state.query = query.toLowerCase();
    this.setType(this.state.type);
  }

  render() {
    return (
      <View style={styles.container}>
        <Search
          style={styles.search}
          placeholder='Поиск'
          searchBarStyle='minimal'
          onChangeText={this.onSearchQueryChange.bind(this)}
        />
        <TabBarIOS style={styles.tabBar}>
          <Icon.TabBarItem
            title="Группы"
            iconName="ios-people-outline"
            selectedIconName="ios-people"
            onPress={this.setType.bind(this, 0)}
            selected={this.state.type == 0}>
            <ControlledRefreshableListView
              isRefreshing={this.state.loading}
              dataSource={this.state.dataSource}
              renderRow={this.renderRow.bind(this)}
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
              renderRow={this.renderRow.bind(this)}
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
              renderRow={this.renderRow.bind(this)}
              renderSeparator={this.renderSeparator}
              onRefresh={this.loadCriteria.bind(this)}
              refreshDescription="Загружаем аудитории..."
            />
          </Icon.TabBarItem>
        </TabBarIOS>
      </View>
    );
  }

  renderRow(criterion) {
    return (
      <TouchableHighlight
        onPress={this.selectCriterion.bind(this, criterion)}
        underlayColor='#eeeeee'
      >
        <Text style={styles.criterion}>{criterion.name}</Text>
      </TouchableHighlight>
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
  container: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor: '#eeeeee'
  },
  search: {
    marginTop: 64,
    height: 40,
    // backgroundColor: '#eeeeee'
  },
  tabBar: {
    flex: 1
  },
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
