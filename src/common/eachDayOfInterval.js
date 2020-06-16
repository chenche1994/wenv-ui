import dayjs from 'dayjs';

function eachDayOfInterval(start, end) {
  const days = [];
  let currentDay = dayjs(start);
  const endInn = dayjs(end);
  while (currentDay.isBefore(endInn, 'day')) {
    days.push(currentDay);
    currentDay = currentDay.add(1, 'day');
  }
  days.push(currentDay);
  return days;
}

export default eachDayOfInterval;
