import moment from 'moment';

export const getRange = (_start, _end) => {
  let start = moment(_start);
  let end = moment(_end);

  let duration = moment.duration(end.diff(start));

  let yearParse =
    duration._data.years > 1
      ? `${duration._data.years} years`
      : `${duration._data.years} year`;
  let monthParse =
    duration._data.months > 1
      ? `${duration._data.months} months`
      : `${duration._data.months} month`;

  if (duration._data.years > 0) {
    return duration._data.months > 0
      ? `${yearParse} and ${monthParse}`
      : `${yearParse}`;
  } else if (duration._data.months > 0) {
    return monthParse;
  }

  // return start.from(end, true);
};
