import 'moment/locale/ru';

var moment = require('moment');
moment.locale('ru')

const DATE_FORMAT = 'DD.MM.YYYY';

class DateUtils {

  static isDate(string) {
    return moment(string, DATE_FORMAT, true).isValid();
  }

  static getDayOfWeek(string) {
    var dayOfWeek = moment(string, DATE_FORMAT, true).format('dddd');
    dayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);

    return dayOfWeek;
  }

  static getDayOfWeekNumber(string) {
    return moment(string, DATE_FORMAT, true).day();
  }

}

module.exports = DateUtils;
