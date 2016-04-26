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

  static toDate(string) {
    return this.toMoment(string).toDate();
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

  static isBefore(first, second) {
    var f = typeof first == 'string' ? this.toMoment(first) : moment(first);
    var s = typeof second == 'string' ? this.toMoment(second) : moment(second);

    return f.isBefore(s);
  }

  static isAfter(first, second) {
    var f = typeof first == 'string' ? this.toMoment(first) : moment(first);
    var s = typeof second == 'string' ? this.toMoment(second) : moment(second);

    return f.isAfter(s);
  }

  static getTodayRange() {
    var now = moment().format(DATE_FORMAT);
    return {
      from: now,
      to: now
    };
  }

  static getSevenDays() {
    var now = moment();
    return {
      from: now.format(DATE_FORMAT),
      to: now.add(6, 'days').format(DATE_FORMAT)
    };
  }

  static getCurrentWeek() {
    var now = moment();
    return {
      from: now.startOf('week').format(DATE_FORMAT),
      to: now.endOf('week').format(DATE_FORMAT)
    };
  }

  static getNextWeek() {
    var next = moment().add(1, 'week');
    return {
      from: next.startOf('week').format(DATE_FORMAT),
      to: next.endOf('week').format(DATE_FORMAT)
    };
  }

  static getCurrentMonth() {
    var now = moment();
    return {
      from: now.startOf('month').format(DATE_FORMAT),
      to: now.endOf('month').format(DATE_FORMAT)
    };
  }

}

module.exports = DateUtils;
