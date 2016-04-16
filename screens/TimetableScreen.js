import React, {
  Component,
  StyleSheet,
  View,
  ListView,
  TabBarIOS
} from 'react-native';

import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav'

var DayView = require('../views/DayView');

var STUB_DATA = [
  {
    date: '02.04.2016',
    dayOfWeek: 'Понедельник',
    lessons: [
      {
        number: 1,
        name: 'Технологии сети Internet',
        teacher: 'Попов А.А.',
        room: 'T407',
        type: 'лб',
        time: {
          from: '9:00',
          to: '10:35'
        },
        note: '1 подгруппа'
      },
      {
        number: 2,
        name: 'Конструирование программного обеспечения',
        teacher: 'Яницкая Т.С.',
        room: 'T412',
        type: 'л',
        time: {
          from: '10:45',
          to: '12:20'
        }
      }
    ]
  },
  {
    date: '03.04.2016',
    dayOfWeek: 'Вторник',
    lessons: [
      {
        number: 1,
        name: 'Технологии сети Internet',
        teacher: 'Попов А.А.',
        room: 'T407',
        type: 'лб',
        time: {
          from: '9:00',
          to: '10:35'
        },
        note: '2 подгруппа'
      },
      {
        number: 2,
        name: 'Конструирование программного обеспечения',
        teacher: 'Яницкая Т.С.',
        room: 'T412',
        type: 'л',
        time: {
          from: '10:45',
          to: '12:20'
        }
      }
    ]
  },
  {
    date: '04.04.2016',
    dayOfWeek: 'Среда',
    lessons: [
      {
        number: 1,
        name: 'Технологии сети Internet',
        teacher: 'Попов А.А.',
        room: 'T407',
        type: 'лб',
        time: {
          from: '9:00',
          to: '10:35'
        },
        note: '2 подгруппа'
      },
      {
        number: 2,
        name: 'Конструирование программного обеспечения',
        teacher: 'Яницкая Т.С.',
        room: 'T412',
        type: 'л',
        time: {
          from: '10:45',
          to: '12:20'
        }
      }
    ]
  }
];

class TimetableScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
  }

  componentDidMount() {
    this.setState({dataSource: this.getDataSource()});
  }

  getDataSource() {
    return this.state.dataSource.cloneWithRows(STUB_DATA);
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
