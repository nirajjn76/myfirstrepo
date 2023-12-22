import AuthService from '../services/auth.service';
import { PORT_NAME_PREFIX } from './appConstants';

export const getDateInMediumFormat = (date: string | Date) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

export const getTimeInMediumFormat = (date: string | Date) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleString('en-US', { timeStyle: 'medium', hour12: false });
};

const changeTextForMultipleValues = (unit: string, value: number | string) => {
  if ((typeof value !== 'number' ? parseInt(value) : value) > 1) {
    return `${unit}s`;
  }
  return unit;
};

export const elapsedTimeLogic = (date: string | Date): any => {
  const current = new Date().getTime();
  const prev = new Date(date).getTime();
  let diffrence; let
    differenceUnit;

  const msMin = 60 * 1000; // milliseconds in Minute
  const msHour = msMin * 60; // milliseconds in Hour
  const msDay = msHour * 24; // milliseconds in day
  const msMon = msDay * 30; // milliseconds in Month
  const msYr = msDay * 365; // milliseconds in Year
  const diff = current - prev; // difference between dates.

  if (diff < msHour) {
    diffrence = Math.round(diff / msMin).toString().padStart(2, '0');
    differenceUnit = changeTextForMultipleValues('Min', diffrence);
  } else if (diff < msDay) {
    diffrence = Math.round(diff / msHour).toString().padStart(2, '0');
    differenceUnit = changeTextForMultipleValues('Hour', diffrence);
  } else if (diff < msMon) {
    diffrence = Math.round(diff / msDay).toString().padStart(2, '0');
    differenceUnit = changeTextForMultipleValues('Day', diffrence);
  } else if (diff < msYr) {
    diffrence = Math.round(diff / msMon).toString().padStart(2, '0');
    differenceUnit = changeTextForMultipleValues('Month', diffrence);
  } else {
    diffrence = Math.round(diff / msYr).toString().padStart(2, '0');
    differenceUnit = changeTextForMultipleValues('Year', diffrence);
  }

  return { diffrence, differenceUnit };
};

export const getPortName = (portId?: string, purchasePortId?: string) => {
  return portId ? PORT_NAME_PREFIX.PORT_ID + portId : PORT_NAME_PREFIX.PURCHASE_PORT_ID + purchasePortId;
};

export const getPortIdFromName = (name: string) => {
  if (name.includes(PORT_NAME_PREFIX.PURCHASE_PORT_ID)) {
    return name.replace(PORT_NAME_PREFIX.PURCHASE_PORT_ID, '');
  }
  return name.replace(PORT_NAME_PREFIX.PORT_ID, '');
};

export const getGroupPortName = (groupId?: string) => {
  return PORT_NAME_PREFIX.GROUP_ID + groupId;
};

export const getAuthHeader = () => {
  const token = AuthService.getToken();
  return { Authorization: token || '' };
};
