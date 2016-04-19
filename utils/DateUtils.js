import 'moment/locale/ru';

var moment = require('moment');
moment.locale('ru')

const DATE_FORMAT = 'DD.MM.YYYY';

class DateUtils {

  static isDate(string) {
    return this.toMoment(string).isValid();
  }

  static toString(date) {
    return moment(date).format(DATE_FORMAT);
  }

  static toMoment(string) {
    return moment(string, DATE_FORMAT, true);
  }

  static getDayOfWeek(string) {
    var dayOfWeek = this.toMoment(string).format('dddd');
    dayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);

    return dayOfWeek;
  }

  static getDayOfWeekNumber(string) {
    return this.toMoment(string).day();
  }

  static isToday(string) {
    return this.toMoment(string).isSame(new Date(), "day");
  }

}

module.exports = DateUtils;
