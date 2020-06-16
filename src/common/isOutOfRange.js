import dayjs from 'dayjs';

function isBefore(date, start, unit) {
  if (!start) {
    return false;
  }

  return dayjs(date).isBefore(dayjs(start), unit);
}

function isAfter(date, end, unit) {
  if (!end) {
    return false;
  }

  return dayjs(date).isAfter(dayjs(end), unit);
}

function isOutOfRange(date, range) {
  return isBefore(date, range.start, range.unit) || isAfter(date, range.end, range.unit);
}

export default isOutOfRange;
