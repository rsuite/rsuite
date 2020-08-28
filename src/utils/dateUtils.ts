import addDaysFns from 'date-fns/addDays';
import addMonthsFns from 'date-fns/addMonths';
import compareAscFns from 'date-fns/compareAsc';
import endOfDayFns from 'date-fns/endOfDay';
import endOfISOWeekFns from 'date-fns/endOfISOWeek';
import endOfMonthFns from 'date-fns/endOfMonth';
import endOfWeekFns from 'date-fns/endOfWeek';
import formatFns from 'date-fns/format';
import getDateFns from 'date-fns/getDate';
import getDayFns from 'date-fns/getDay';
import getDaysInMonthFns from 'date-fns/getDaysInMonth';
import getHoursFns from 'date-fns/getHours';
import getMinutesFns from 'date-fns/getMinutes';
import getMonthFns from 'date-fns/getMonth';
import getSecondsFns from 'date-fns/getSeconds';
import getYearFns from 'date-fns/getYear';
import isAfterFns from 'date-fns/isAfter';
import isBeforeFns from 'date-fns/isBefore';
import isEqualFns from 'date-fns/isEqual';
import isSameDayFns from 'date-fns/isSameDay';
import isSameMonthFns from 'date-fns/isSameMonth';
import parseFns from 'date-fns/parse';
import parseISOFns from 'date-fns/parseISO';
import setDateFns from 'date-fns/setDate';
import setHoursFns from 'date-fns/setHours';
import setMinutesFns from 'date-fns/setMinutes';
import setMonthFns from 'date-fns/setMonth';
import setSecondsFns from 'date-fns/setSeconds';
import setYearFns from 'date-fns/setYear';
import startOfDayFns from 'date-fns/startOfDay';
import startOfISOWeekFns from 'date-fns/startOfISOWeek';
import startOfMonthFns from 'date-fns/startOfMonth';
import startOfWeekFns from 'date-fns/startOfWeek';
import subDaysFns from 'date-fns/subDays';
import _ from 'lodash';

/*
 * Getter
 * */
export const getYear = getYearFns;
export const getMonth = getMonthFns;
export const getDaysInMonth = getDaysInMonthFns;
export const getHours = getHoursFns;
export const getMinutes = getMinutesFns;
export const getSeconds = getSecondsFns;
export const startOfMonth = startOfMonthFns;
export const endOfMonth = endOfMonthFns;
export const startOfISOWeek = startOfISOWeekFns;
export const endOfISOWeek = endOfISOWeekFns;
export const startOfWeek = startOfWeekFns;
export const endOfWeek = endOfWeekFns;
export const startOfDay = startOfDayFns;
export const endOfDay = endOfDayFns;
export const getDate = getDateFns;
export const getDay = getDayFns;

/*
 * Setter
 * */
export const setYear = setYearFns;
export const setMonth = setMonthFns;
export const setDate = setDateFns;
export const setHours = setHoursFns;
export const setMinutes = setMinutesFns;
export const setSeconds = setSecondsFns;

/*
 * Judge
 * */
export const isAfter = isAfterFns;
export const isBefore = isBeforeFns;
export const isSameDay = isSameDayFns;
export const isSameMonth = isSameMonthFns;
export const isEqual = isEqualFns;

/*
 * Compute
 * */
export const addMonths = addMonthsFns;
export const addDays = addDaysFns;
export const subDays = subDaysFns;

/*
 * convert
 * */
export const parse = parseFns;
export const parseISO = parseISOFns;
export const format = formatFns;

/*
 * Functions
 * */
export const compareAsc = compareAscFns;

const disabledTimeProps = ['disabledHours', 'disabledMinutes', 'disabledSeconds'];
const hideTimeProps = ['hideHours', 'hideMinutes', 'hideSeconds'];
export type CalendarOnlyPropsType =
  | 'disabledHours'
  | 'disabledMinutes'
  | 'disabledSeconds'
  | 'hideHours'
  | 'hideMinutes'
  | 'hideSeconds';
export const calendarOnlyProps = disabledTimeProps.concat(hideTimeProps) as CalendarOnlyPropsType[];

function validTime(calendarProps: any, date: Date) {
  if (!date) {
    return false;
  }

  return Object.keys(calendarProps).some(key => {
    if (/(Hours)/.test(key)) {
      return calendarProps[key](getHours(date), date);
    }
    if (/(Minutes)/.test(key)) {
      return calendarProps[key](getMinutes(date), date);
    }
    if (/(Seconds)/.test(key)) {
      return calendarProps[key](getSeconds(date), date);
    }
    return false;
  });
}

/**
 * Verify that the time is valid.
 * @param props
 * @param date
 */
export function disabledTime(props: any, date: Date) {
  const calendarProps = _.pick(props, disabledTimeProps);
  return validTime(calendarProps, date);
}
