import {AsyncStorage} from 'react-native'

const TIMETABLE_KEY = 'timetable';
const CRITERIA_TYPE_KEY = 'criteriaType';
const CRITERION_KEY = 'criterion';
const DATE_RANGE_OPTION_KEY = 'dateRangeOption';
const CUSTOM_DATE_RANGE_KEY = 'customDateRange';

function getObject(key) {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(key, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(result));
    });
  });
}

function setObject(key, value) {
  AsyncStorage.setItem(key, JSON.stringify(value));
};

class StorageProvider {

  static getTimetable() {
    return getObject(TIMETABLE_KEY);
  }

  static setTimetable(timetable) {
    setObject(TIMETABLE_KEY, timetable);
  }

  static getCriteriaType() {
    return getObject(CRITERIA_TYPE_KEY);
  }

  static setCriteriaType(type) {
    setObject(CRITERIA_TYPE_KEY, type);
  }

  static getCriterion() {
    return getObject(CRITERION_KEY);
  }

  static setCriterion(criterion) {
    setObject(CRITERION_KEY, criterion);
  }

  static getDateRangeOption() {
    return getObject(DATE_RANGE_OPTION_KEY);
  }

  static setDateRangeOption(option) {
    setObject(DATE_RANGE_OPTION_KEY, option);
  }

  static getCustomDateRange() {
    return getObject(CUSTOM_DATE_RANGE_KEY);
  }

  static setCustomDateRange(dateRange) {
    setObject(CUSTOM_DATE_RANGE_KEY, dateRange);
  }

}

module.exports = StorageProvider;
