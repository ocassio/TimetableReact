import React, {
  Component,
  StyleSheet,
  View,
  ListView,
  Text
} from 'react-native';

var STUB_DATA = [
  {
    date: '02.04.2016',
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
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(day) => <Text>{day.date}</Text>}
      />
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
});

module.exports = TimetableScreen;
