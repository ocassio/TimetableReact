import {AsyncStorage} from 'react-native'

var DateUtils = require('../utils/DateUtils');

const TIMETABLE_KEY = 'timetable';
const CRITERIA_TYPE_KEY = 'criteriaType';
const CRITERION_KEY = 'criterion';
const RECENT_CRITERIA_KEY = 'recentCriteria';
const DATE_RANGE_OPTION_KEY = 'dateRangeOption';
const CUSTOM_DATE_RANGE_KEY = 'customDateRange';

const DATE_RANGES_MAPPING = [
  DateUtils.getSevenDays,
  DateUtils.getCurrentWeek,
  DateUtils.getNextWeek,
  DateUtils.getCurrentMonth
];

function getObject(key) {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(key, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(result));
      }
    });
  });
}

function setObject(key, value) {
  return new Promise((resolve, reject) => {
    AsyncStorage.setItem(key, JSON.stringify(value), (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(value);
      }
    });
  });
};

class StorageProvider {

  static getTimetable() {
    return getObject(TIMETABLE_KEY);
  }

  static setTimetable(timetable) {
    return setObject(TIMETABLE_KEY, timetable);
  }

  static getCriteriaType() {
    return getObject(CRITERIA_TYPE_KEY)
      .then((type) => {
        return type ? type : 0
      });
  }

  static setCriteriaType(type) {
    return setObject(CRITERIA_TYPE_KEY, type);
  }

  static getCriterion() {
    return getObject(CRITERION_KEY);
  }

  static setCriterion(criterion) {
    return setObject(CRITERION_KEY, criterion);
  }

  static getRecentCriteria() {
    return getObject(RECENT_CRITERIA_KEY)
      .then((criteria) => {
        return criteria ? criteria : [[], [], []];
      });
  }

  static setRecentCriteria(criteria) {
    return setObject(RECENT_CRITERIA_KEY, criteria);
  }

  static getDateRangeOption() {
    return getObject(DATE_RANGE_OPTION_KEY)
      .then((option) => {
        return option ? option : 0;
      });
  }

  static setDateRangeOption(option) {
    return setObject(DATE_RANGE_OPTION_KEY, option);
  }

  static getCustomDateRange() {
    return getObject(CUSTOM_DATE_RANGE_KEY)
      .then((dateRange) => {
        return dateRange ? dateRange : DateUtils.getTodayRange();
      });
  }

  static setCustomDateRange(dateRange) {
    return setObject(CUSTOM_DATE_RANGE_KEY, dateRange);
  }

  static getDateRange() {
    return new Promise((resolve, reject) => {
      this.getDateRangeOption().then((option) => {
        if (option < DATE_RANGES_MAPPING.length) {
          resolve(DATE_RANGES_MAPPING[option]());
        } else {
          this.getCustomDateRange().then((dateRange) => {
            resolve(dateRange);
          });
        }
      });
    });
  }

}

module.exports = StorageProvider;
