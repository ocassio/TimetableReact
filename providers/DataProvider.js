var cheerio = require('cheerio-without-node-native');
var DateUtils = require('../utils/DateUtils');

const TIMETABLE_URL = "http://www.tolgas.ru/services/raspisanie/";
const COL_COUNT = 7;

const TIME_RANGES = [
  {from: '9:00',  to: '10:35'},
  {from: '10:45', to: '12:20'},
  {from: '13:00', to: '14:35'},
  {from: '14:45', to: '16:20'},
  {from: '16:30', to: '18:05'},
  {from: '18:15', to: '19:50'},
  {from: '20:00', to: '21:35'}
];

const TIME_RANGES_SATURADAY = [
  {from: '8:30',  to: '10:05'},
  {from: '10:15', to: '11:50'},
  {from: '12:35', to: '14:10'},
  {from: '14:20', to: '15:55'},
  {from: '16:05', to: '17:35'}
];

var parseTimetable = (html) => {
  var $ = cheerio.load(html);
  var elements = $('#send td.hours');

  var days = [];

  //No lessons have been found
  if (elements.length == 1) {
    return days;
  }

  var i = 0;
  while (i < elements.length) {
    var date = elements[i].firstChild.data;
    if (DateUtils.isDate(date)) {

      var day = {
        date: date,
        dayOfWeek: DateUtils.getDayOfWeek(date),
        lessons: []
      };

      i++;
      do {

        var params = [];
        for (var j = 0; j < COL_COUNT; j++) {
          var child = elements[i].firstChild;
          if (child) {
            params.push(child.data);
          }
          i++;
        }

        var lesson = {
          room: params[0],
          number: params[1],
          teacher: params[2],
          type: params[3],
          name: params[4],
          group: params[5],
          note: params[6],
        };
        lesson.time = DateUtils.getDayOfWeekNumber(day.date) == 6 ?
          TIME_RANGES_SATURADAY[lesson.number - 1] : TIME_RANGES[lesson.number - 1];

        day.lessons.push(lesson);

      } while (i < elements.length && !DateUtils.isDate(elements[i].firstChild.data));

      days.push(day);

    }
  }

  return days;
}

var parseCriteria = (html) => {
  var $ = cheerio.load(html);
  var options = $('#vr option');

  var criteria = [];
  options.each((index, option) => {
    criteria.push({
      id: option.attribs.value,
      name: option.firstChild.data
    });
  });

  return criteria;
}

class DataProvider {

  static getTimetable(criteriaType, criterion, from, to) {
    var params = new FormData();
    params.append('rel', criteriaType);
    params.append('vr', criterion);
    params.append('from', from);
    params.append('to', to);
    params.append('submit_button', 'ПОКАЗАТЬ');

    return fetch(TIMETABLE_URL, {
      method: 'POST',
      body: params
    }).then((response) => response.text())
      .then(parseTimetable.bind(this));
  }

  static getCriteria(criteriaType) {
    var url = TIMETABLE_URL + "?id=" + criteriaType;
    return fetch(url)
      .then((response) => response.text())
      .then(parseCriteria.bind(this));
  }

}

module.exports = DataProvider;
