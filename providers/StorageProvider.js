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

  static getDateRangeOption() {
    return getObject(DATE_RANGE_OPTION_KEY);
  }

  static setDateRangeOption(option) {
    return setObject(DATE_RANGE_OPTION_KEY, option);
  }

  static getCustomDateRange() {
    return getObject(CUSTOM_DATE_RANGE_KEY);
  }

  static setCustomDateRange(dateRange) {
    return setObject(CUSTOM_DATE_RANGE_KEY, dateRange);
  }

}

module.exports = StorageProvider;
