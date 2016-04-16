import React, {
  Component,
  StyleSheet,
  View,
  ListView,
  TabBarIOS
} from 'react-native';

import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav'

var DayView = require('../views/DayView');
var DataProvider = require('../providers/DataProvider');

class TimetableScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
  }

  componentDidMount() {
    DataProvider.getTimetable(0, '473', '02.04.2016', '10.04.2016')
      .then((days) => this.setState({dataSource: this.getDataSource(days)}));
  }

  getDataSource(data) {
    return this.state.dataSource.cloneWithRows(data);
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
        <View style={styles.toolbar}>
          <NavButton>
            <NavButtonText>
              Критерий
            </NavButtonText>
          </NavButton>
          <View style={styles.spacer}>
          </View>
          <NavButton>
            <NavButtonText>
              Дата
            </NavButtonText>
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
    padding: 10
  },
  spacer: {
    flex: 1
  }
});

module.exports = TimetableScreen;
