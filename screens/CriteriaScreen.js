import React, {
  Component,
  StyleSheet,
  View,
  Text,
  TabBarIOS
} from 'react-native';

import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav'

var Icon = require('react-native-vector-icons/Ionicons');
var ControlledRefreshableListView = require('react-native-refreshable-listview/lib/ControlledRefreshableListView');
var DataProvider = require('../providers/DataProvider');

class CriteriaScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      type: 0,
      dataSource: new ControlledRefreshableListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      loading: true
    }
  }

  componentDidMount() {
    this.loadCriteria();
  }

  getDataSource(data) {
    return this.state.dataSource.cloneWithRows(data);
  }

  loadCriteria() {
    this.setState({loading: true});
    return DataProvider.getCriteria(this.state.type)
      .then((criteria) => this.setState({
        dataSource: this.getDataSource(criteria),
        loading: false
      }));
  }

  render() {
    return (
      <View style={styles.container}>
        <ControlledRefreshableListView
          isRefreshing={this.state.loading}
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          onRefresh={this.loadCriteria.bind(this)}
          refreshDescription="Загружаем критерии..."
        />
        <TabBarIOS style={styles.tabBar}>
          <Icon.TabBarItem
            title="Группы"
            iconName="ios-people-outline"
            selectedIconName="ios-people"
          />
          <Icon.TabBarItem
            title="Преподаватели"
            iconName="ios-person-outline"
            selectedIconName="ios-person"
          />
          <Icon.TabBarItem
            title="Аудитории"
            iconName="ios-home-outline"
            selectedIconName="ios-home"
          />
        </TabBarIOS>
      </View>
    );
  }

  renderRow(criterion) {
    return (
      <Text>{criterion.name}</Text>
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
  tabBar: {
    flex: 0,
    height: 50
  }
});

module.exports = CriteriaScreen;
