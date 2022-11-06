import { ServerTimestampForClient, ServerTimestampForServer } from 'src/types/timestamp';

export const getNowTime = (): number => {
  return Math.floor(Date.now() / 1000);
};

export const convertServerTimeToClientTimestamp = (time: ServerTimestampForClient): number => {
  const { seconds, nanoseconds } = time;
  const nano =
    nanoseconds.toString().length >= 3
      ? nanoseconds.toString().slice(0, 3)
      : `${nanoseconds}00`.slice(0, 3);
  return Number(`${seconds.toString()}${nano}`);
};

export const convertServerTimeToServerTimestamp = (time: ServerTimestampForServer): number => {
  const { _seconds, _nanoseconds } = time as ServerTimestampForServer;
  const nano =
    _nanoseconds.toString().length >= 3
      ? _nanoseconds.toString().slice(0, 3)
      : `${_nanoseconds}00`.slice(0, 3);
  return Number(`${_seconds.toString()}${nano}`);
};

export const convertUnixToDateTimestamp = (unixTimestamp: number): number => {
  return unixTimestamp * 1000;
};

export const convertDateToUnixTimestamp = (dateTimestamp: number): number => {
  return dateTimestamp / 1000;
};

export const convertDaysToSeconds = (day: number): number => {
  return day * 86400;
};

export const getYearMonthDayHourMin = (lang: 'en' | 'ja', timestamp: number): string => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();
  if (lang === 'en')
    return `${month}/${day}/${year} ${hour}:${min.toString().length === 1 ? `0${min}` : min}`;
  return `${year}/${month}/${day} ${hour}:${min.toString().length === 1 ? `0${min}` : min}`;
};

export const getAgoTime = (lang: 'en' | 'ja', timestamp: number) => {
  const from = new Date(timestamp);
  const diff = new Date().getTime() - from.getTime();
  const d = new Date(diff);

  if (d.getUTCFullYear() - 1970) {
    const agoTime = d.getUTCFullYear() - 1970;
    if (lang === 'en') return `${agoTime} years ago`;
    return `${agoTime} 年前`;
  } else if (d.getUTCMonth()) {
    const agoTime = d.getUTCMonth();
    if (lang === 'en') return `${agoTime} months ago`;
    return `${agoTime} ヶ月前`;
  } else if (d.getUTCDate() - 1) {
    const agoTime = d.getUTCDate() - 1;
    if (lang === 'en') return `${agoTime} days ago`;
    return `${agoTime} 日前`;
  } else if (d.getUTCHours()) {
    const agoTime = d.getUTCHours();
    if (lang === 'en') return `${agoTime} hours ago`;
    return `${agoTime} 時間前`;
  } else if (d.getUTCMinutes()) {
    const agoTime = d.getUTCMinutes();
    if (lang === 'en') return `${agoTime} min ago`;
    return `${agoTime} 分前`;
  } else {
    const agoTime = d.getUTCSeconds();
    if (lang === 'en') return `${agoTime} seconds ago`;
    return `${agoTime} 秒前`;
  }
};
