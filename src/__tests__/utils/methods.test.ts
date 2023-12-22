import {
  expect, test, describe,
} from '@jest/globals';
import { getDateInMediumFormat, getTimeInMediumFormat, elapsedTimeLogic } from '../../utils/methods';

describe('UtilMethods', () => {
  test('Should return date in medium format', () => {
    expect.assertions(1);

    const comparatorDate = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const date = getDateInMediumFormat(new Date());

    expect(date).toEqual(comparatorDate);
  });

  test('Should return time in medium format', () => {
    expect.assertions(1);

    const comparatorTime = new Date().toLocaleString('en-US', { timeStyle: 'medium', hour12: false });
    const time = getTimeInMediumFormat(new Date());

    expect(time.includes(comparatorTime)).toBeTruthy();
  });

  test('Should return elapsed time in minute', () => {
    expect.assertions(1);

    const { differenceUnit } = elapsedTimeLogic(new Date(new Date().setMinutes(new Date().getMinutes() - 5)));

    expect(differenceUnit).toEqual('Mins');
  });

  test('Should return elapsed time in hours', () => {
    expect.assertions(1);

    const { differenceUnit } = elapsedTimeLogic(new Date(new Date().setHours(new Date().getHours() - 5)));

    expect(differenceUnit).toEqual('Hours');
  });

  test('Should return elapsed time in days', () => {
    expect.assertions(1);

    const { differenceUnit } = elapsedTimeLogic(new Date(new Date().setDate(new Date().getDate() - 2)));

    expect(differenceUnit).toEqual('Days');
  });

  test('Should return elapsed time in months', () => {
    expect.assertions(1);

    const { differenceUnit } = elapsedTimeLogic(new Date(new Date().setMonth(new Date().getMonth() - 5)));

    expect(differenceUnit).toEqual('Months');
  });

  test('Should return elapsed time in years', () => {
    expect.assertions(1);

    const { differenceUnit } = elapsedTimeLogic(new Date(new Date().setFullYear(new Date().getFullYear() - 2)));

    expect(differenceUnit).toEqual('Years');
  });
});
